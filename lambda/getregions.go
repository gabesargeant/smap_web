package main

import (
	"context"
	"fmt"
	"os"

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

//Collection Array of Records
type Collection struct {
	ArrRecord []Record
}

// MapRequest  details TODO Eventually replace this with an
// interface type for the APIGateway Request
type MapRequest struct {
	RegionID string `json:"RegionID"`
	TableID  string `json:"TableID"`
}

// Pointer Receiver based dependency injection
type deps struct {
	ddb     dynamodbiface.DynamoDBAPI
	tableID string
}

// HandleRequest Main entry point
//This will eventually take a API Gateway Proxy Request
//Eventually replace the response type with an API Gateway response type.
func (d *deps) HandleRequest(ctx context.Context, request MapRequest) (string, error) {

	db := d.ddb
	t := d.tableID
	result := getData(request, db, t)

	return fmt.Sprintf("%s", result.Item), nil
}

func main() {

	d := deps{
		ddb:     dynamodb.New(session.New()),
		tableID: os.Getenv("DYNAMOTABLE"),
	}

	lambda.Start(d.HandleRequest)
}

func getData(request MapRequest, ddb dynamodbiface.DynamoDBAPI, dbTable string) (result *dynamodb.GetItemOutput) {

	regionID := request.RegionID
	tableID := request.TableID

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
