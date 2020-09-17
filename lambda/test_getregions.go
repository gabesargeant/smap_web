package main

import (
	"context"
	"testing"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"

	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type mockGetItems struct {
	dynamodbiface.DynamoDBAPI
	GetItemResponse dynamodb.GetItemOutput
	// GetBatchItemResponse dynamodb.BatchGetItemOutput
}

func (d mockGetItems) GetItem(in *dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error) {
	return &d.GetItemResponse, nil
}

// func (d mockGetItems) BatchGetItem(input *dynamodb.BatchGetItemInput) (*dynamodb.BatchGetItemOutput, error) {
// 	return &d.GetBatchItemResponse, nil
// }

func TestHandleRequest(t *testing.T) {

	m := mockGetItems{
		GetItemResponse: dynamodb.GetItemOutput{},
	}

	d := deps{
		ddb:     m,
		tableID: "testTable",
	}

	mr := MapRequest{
		RegionID: "123456",
		TableID:  "G02",
	}

	d.HandleRequest(context.Background, mr)

}
