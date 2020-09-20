package main

import (
	"context"
	"fmt"
	"os"
	"smap/record"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

// Record result type from dynamodb.
type Record struct {
	RegionID string             `json:"RegionID"`
	TableID  string             `json:"TableID"`
	KVPairs  map[string]float64 `json:"KVPairs"`
}

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

// HandleRequest Main entry point
//This will eventually take a API Gateway Proxy Request
//Eventually replace the response type with an API Gateway response type.
func (d *deps) HandleRequest(ctx context.Context, request []MapRequest) ([]record.Record, error) {

	db := d.ddb
	t := d.tableID
	//result := getData(request, db, t)

	result := getBatchData(request, db, t)

	//Todo do something with errors in response object

	//TODO method confirm requests are < 100

	return result, nil
}

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
		panic(fmt.Errorf("Batch get item failed, err: %w", err))
		processErrors(err)
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

// getData gets a single request. TODO remove this.
func getData(request MapRequest, ddb dynamodbiface.DynamoDBAPI, dbTable string) (result *dynamodb.GetItemOutput) {

	regionID := request.RegionID
	tableID := request.PartitionID

	input := &dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"RegionID": {
				S: aws.String(regionID),
			},
			"TableID": {
				S: aws.String(tableID),
			},
		},
		TableName: aws.String(dbTable),
	}

	result, err := ddb.GetItem(input)
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
		return
	}

	return result

}
