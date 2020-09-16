package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

// Record Reciever type for dynamo db.
type Record struct {
	RegionID string             `json:"RegionID"`
	TableID  string             `json:"TableID"`
	KVPairs  map[string]float64 `json:"KVPairs"`
}

// MapRequest  details
type MapRequest struct {
	RegionID string `json:"RegionID"`
	TableID  string `json:"TableID"`
}

// HandleRequest words etc
func HandleRequest(ctx context.Context, request MapRequest) (string, error) {

	result := getData(request)

	return fmt.Sprintf("%s", result.Item), nil
}

func main() {
	lambda.Start(HandleRequest)
}

func getData(request MapRequest) (result *dynamodb.GetItemOutput) {

	svc := dynamodb.New(session.New())

	dbTable := os.Getenv("DYNAMOTABLE")
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

	result, err := svc.GetItem(input)
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
