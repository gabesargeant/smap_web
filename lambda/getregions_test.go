package main

import (
	"context"
	"fmt"
	"testing"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"

	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type mockGetItems struct {
	dynamodbiface.DynamoDBAPI
	GetItemResponse      dynamodb.GetItemOutput
	GetBatchItemResponse dynamodb.BatchGetItemOutput
}

func (d mockGetItems) GetItem(in *dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error) {
	fmt.Print("Mock!")
	return &d.GetItemResponse, nil
}

func (d mockGetItems) BatchGetItem(in *dynamodb.BatchGetItemInput) (*dynamodb.BatchGetItemOutput, error) {
	fmt.Print("Mock! batch Item response")

	return &d.GetBatchItemResponse, nil

}

// TODO implement this
// func (d mockGetItems) BatchGetItem(input *dynamodb.BatchGetItemInput) (*dynamodb.BatchGetItemOutput, error) {
// 	return &d.GetBatchItemResponse, nil
// }

// TestHandleRequest is tests the happy path test of the dynamo db getitem call for lambda getregions.go
func TestHandleRequest(t *testing.T) {

	m := mockGetItems{
		GetItemResponse: dynamodb.GetItemOutput{},
	}

	d := deps{
		ddb:     m,
		tableID: "testTable",
	}

	mr0 := MapRequest{
		RegionID:    "123456",
		PartitionID: "G02",
	}

	mr1 := MapRequest{
		RegionID:    "123456",
		PartitionID: "G02",
	}

	mr := []MapRequest{}

	mr = append(mr, mr0, mr1)

	//fmt.Print(mr)

	d.HandleRequest(context.TODO(), mr)

}
