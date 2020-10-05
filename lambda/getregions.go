package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

// MapDataRequest  details TODO Eventually replace this with an
// interface type for the APIGateway Request
type MapDataRequest struct {
	RegionID    string `json:"RegionID"`
	PartitionID string `json:"PartitionID"`
}

// MapData a struct used to create a json object representing a region ID and then a set of key value pairs of data.
type MapData struct {
	RegionID    string             `json:"RegionID"`
	PartitionID string             `json:"PartitionID"`
	GeoLevel    string             `json:"GeoLevel"`
	KVPairs     map[string]float64 `json:"KVPairs"`
}

// MapDataResponse is the container for both any app errors and the data
type MapDataResponse struct {
	Errors   []string          `json:"Errors,omitempty"`
	MapData  []MapData         `json:"MapData"`
	Metadata map[string]string `json:"Metadata"`
}

// Dependencies - Pointer Receiver based dependency injection
type Dependencies struct {
	ddb     dynamodbiface.DynamoDBAPI
	tableID string
}

// HandleRequest Main entry point for the Lambda
func (d *Dependencies) HandleRequest(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	var response events.APIGatewayProxyResponse
	var mapDataResponse MapDataResponse

	var request []MapDataRequest
	fmt.Println(request)
	err := json.Unmarshal([]byte(req.Body), &request)

	if err != nil {
		fmt.Println("Error with unmarshalling request")
		fmt.Println(req.Body)

		response.StatusCode = 500
		s := []string{fmt.Sprint(err)}
		mapDataResponse.Errors = s

		b, _ := json.Marshal(mapDataResponse)
		response.Body = string(b)

		return response, errors.New("error with unmarshalling request")
	}

	//Validate Requests and trim long requests
	if len(request) >= 100 {
		fmt.Println("Trim request to 100 objects max")
		request = request[:99]

	}

	// Request items from DB.
	db := d.ddb
	table := d.tableID

	mapDataResponse = getBatchData(request, db, table)

	//getMetadata
	//This could be a slow point.
	//Most likely slow on startup / cold start
	fmt.Println("get the index that doesn't exists thingy")

	if len(request) == 0 {
		response.StatusCode = 500
		s := []string{fmt.Sprint("Empty Request Array")}
		mapDataResponse.Errors = s
		return response, errors.New("error with empty request array")
	}

	mapDataResponse.Metadata = MetadataMapMap[request[0].PartitionID]

	b, err := json.Marshal(mapDataResponse)

	if err != nil {
		fmt.Println("error with marshalling request")
		response.StatusCode = 500
		s := []string{fmt.Sprint(err)}
		mapDataResponse.Errors = s

	} else {
		response.Body = string(b)
		response.StatusCode = 200
	}

	//fmt.Print(response)
	//fmt.Print(response.Body)

	return response, nil
}

// main Establish Go session and call lambda start with pointer receiver.
func main() {

	d := Dependencies{
		ddb:     dynamodb.New(session.New()),
		tableID: os.Getenv("DYNAMOTABLE"),
	}

	lambda.Start(d.HandleRequest)
}

// getBrachData - Makes requests on dynamodb with a batch interface.
func getBatchData(requests []MapDataRequest, ddb dynamodbiface.DynamoDBAPI, dbTable string) MapDataResponse {

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

	var errors []string

	if err != nil {
		errors = append(errors, processErrors(err))
	}

	var fullResults []MapData

	for _, response := range batch.Responses {
		for _, item := range response {

			var result MapData
			err := dynamodbattribute.UnmarshalMap(item, &result)

			if err != nil {

				errorMsg := fmt.Sprint(err)
				errors = append(errors, errorMsg)

			}
			fullResults = append(fullResults, result)
		}
	}

	mapDataResponse := MapDataResponse{
		MapData: fullResults,
		Errors:  errors,
	}

	return mapDataResponse
}

func processErrors(err error) string {
	var errorMessage string
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				errorMessage = fmt.Sprint(dynamodb.ErrCodeProvisionedThroughputExceededException, aerr.Error())
			case dynamodb.ErrCodeResourceNotFoundException:
				errorMessage = fmt.Sprint(dynamodb.ErrCodeResourceNotFoundException, aerr.Error())
			case dynamodb.ErrCodeRequestLimitExceeded:
				errorMessage = fmt.Sprint(dynamodb.ErrCodeRequestLimitExceeded, aerr.Error())
			case dynamodb.ErrCodeInternalServerError:
				errorMessage = fmt.Sprint(dynamodb.ErrCodeInternalServerError, aerr.Error())
			default:
				errorMessage = fmt.Sprint(aerr.Error())
			}
		} else {
			errorMessage = fmt.Sprint(err.Error())
		}
	}
	return errorMessage
}
