package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"smap/record"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

// MapRequest  details TODO Eventually replace this with an
// interface type for the APIGateway Request
type MapRequest struct {
	RegionID    string `json:"RegionID"`
	PartitionID string `json:"PartitionID"`
}

// Pointer Receiver based dependency injection
type deps struct {
	ddb     dynamodbiface.DynamoDBAPI
	tableID string
}

// HandleRequest Main entry point for Lambda
func (d *deps) HandleRequest(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var response events.APIGatewayProxyResponse
	var request []MapRequest
	db := d.ddb
	table := d.tableID

	fmt.Print(req)
	fmt.Print("Req Body")
	fmt.Print(req.Body)

	// data, err := base64.StdEncoding.DecodeString(req.Body)

	// if err != nil {
	// 	fmt.Println("Error with base64 decode")
	// 	fmt.Println(req.Body)
	// 	fmt.Println(err)
	// }

	err := json.Unmarshal([]byte(req.Body), &request)

	if err != nil {
		fmt.Println("Error with unmarshalling request")
		fmt.Println(req.Body)
		fmt.Println(err)
		return response, errors.New("error with unmarshalling request")
	}
	//Validate Requests and trim long requests
	if len(request) >= 100 {
		request = request[:99]
		fmt.Println("Trim request to 100 objects max")
	}

	// Request items from DB
	result := getBatchData(request, db, table)

	//Todo do something with errors in response object
	//Potentially expand the response body to include an set of errors that can be shown by the UI.
	//maybe....

	b, _ := json.Marshal(result)
	response.Body = string(b)
	response.StatusCode = 200

	fmt.Print(response)
	fmt.Print(response.Body)

	return response, nil
}

// main Establish Go session and call lambda start with pointer receiver.
func main() {

	d := deps{
		ddb:     dynamodb.New(session.New()),
		tableID: os.Getenv("DYNAMOTABLE"),
	}

	lambda.Start(d.HandleRequest)
}

// getBrachData - Makes requests on dynamodb with a batch interface.
func getBatchData(requests []MapRequest, ddb dynamodbiface.DynamoDBAPI, dbTable string) []record.Record {

	mapOfKeys := []map[string]*dynamodb.AttributeValue{}

	for _, request := range requests {

		mapOfKeys = append(mapOfKeys, map[string]*dynamodb.AttributeValue{
			"RegionID": &dynamodb.AttributeValue{
				S: aws.String(request.RegionID),
			},
			"PartitionID": &dynamodb.AttributeValue{
				S: aws.String(request.PartitionID),
			},
		})

	}

	input := &dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			dbTable: &dynamodb.KeysAndAttributes{
				Keys: mapOfKeys,
			},
		},
	}

	batch, err := ddb.BatchGetItem(input)

	if err != nil {
		processErrors(err)
		panic(fmt.Errorf("Batch get item failed, err: %w", err))
	}

	var fullResults []record.Record

	for _, response := range batch.Responses {
		for _, item := range response {

			var record record.Record
			err := dynamodbattribute.UnmarshalMap(item, &record)
			if err != nil {

			}

			fullResults = append(fullResults, record)

		}
	}
	return fullResults
}

func processErrors(err error) {
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				fmt.Println(dynamodb.ErrCodeProvisionedThroughputExceededException, aerr.Error())
			case dynamodb.ErrCodeResourceNotFoundException:
				fmt.Println(dynamodb.ErrCodeResourceNotFoundException, aerr.Error())
			case dynamodb.ErrCodeRequestLimitExceeded:
				fmt.Println(dynamodb.ErrCodeRequestLimitExceeded, aerr.Error())
			case dynamodb.ErrCodeInternalServerError:
				fmt.Println(dynamodb.ErrCodeInternalServerError, aerr.Error())
			default:
				fmt.Println(aerr.Error())
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			fmt.Println(err.Error())
		}
	}
}
