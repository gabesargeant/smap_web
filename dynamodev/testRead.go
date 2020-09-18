package main

import (
	"encoding/json"
	"fmt"
	"smap/record"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

// Args CMD Line ARgs
type Args struct {
	DynamoDBTableName *string
	InputFile         *string
	BuildTable        *bool
	LoadData          *bool
	Purge             *bool
	ConfirmPurge      *bool
}

// Main - Entry point for writing files into a DynamoDB
func main() {

	var tableName string = "testtable01"

	sess := establishAWSSession()

	getManyItems(tableName, sess)

}

func getManyItems(tableName string, sess *session.Session) {

	regionIds := []string{"1100701", "1100702"}

	mapOfKeys := []map[string]*dynamodb.AttributeValue{}

	for _, region := range regionIds {

		mapOfKeys = append(mapOfKeys, map[string]*dynamodb.AttributeValue{
			"RegionID": &dynamodb.AttributeValue{
				S: aws.String(region),
			},
			"TableID": &dynamodb.AttributeValue{
				S: aws.String("G02"),
			},
		})

	}

	ddb := dynamodb.New(sess)

	input := &dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			"testtable01": &dynamodb.KeysAndAttributes{
				Keys: mapOfKeys,
			},
		},
	}

	//fmt.Println(input)

	batch, err := ddb.BatchGetItem(input)

	if err != nil {
		panic(fmt.Errorf("Batch get item failed, err: %w", err))
	}

	for _, response := range batch.Responses {
		for _, item := range response {

			var record record.Record
			err = dynamodbattribute.UnmarshalMap(item, &record)

			fmt.Println(err)

			b, _ := json.Marshal(record)

			//fmt.Println(item)
			fmt.Printf("%s", b)
			fmt.Println(record.KVPairs)

		}
	}

}

func establishAWSSession() *session.Session {

	sess := session.Must(session.NewSessionWithOptions(session.Options{
		//SharedConfigState: session.SharedConfigEnable,
		Config: aws.Config{Region: aws.String("ap-southeast-2")},
	}))

	return sess
}

func check(err error) {
	if err != nil {
		panic(err)
	}

}
