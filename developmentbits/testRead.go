package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
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
	args := defineFlags()
	flag.Parse()

	if *args.InputFile == "" {
		flag.Usage()
		os.Exit(-99)
	}

	rec := OpenRecordsAtPath(*args.InputFile)

	var tableName string = "testtable01"

	sess := establishAWSSession()

	results := getManyItems(tableName, rec, sess)

	marshalAndSaveOut(results)

}

func marshalAndSaveOut(resutls []record.Record) {

	outFile, err := os.Create("output.json")
	bw := bufio.NewWriter(outFile)

	check(err)

	b, _ := json.Marshal(resutls)
	bw.Write(b)
	bw.Flush()

}

func defineFlags() Args {
	var args = Args{}
	args.InputFile = flag.String("f", "input.json", "File to read, expected json format")

	return args
}

//MapRequest - the incoming request structure.
type MapRequest struct {
	RegionID    string `json:"RegionID"`
	PartitionID string `json:"PartitionID"`
}

//OpenRecordsAtPath open a json object and marshal it.
func OpenRecordsAtPath(path string) []MapRequest {

	file, err := ioutil.ReadFile(path)

	var requests = []MapRequest{}

	err = json.Unmarshal([]byte(file), &requests)

	check(err)

	return requests

}

func getManyItems(tableName string, requests []MapRequest, sess *session.Session) []record.Record {

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

	var fullResults []record.Record

	for _, response := range batch.Responses {
		for _, item := range response {

			var record record.Record
			err = dynamodbattribute.UnmarshalMap(item, &record)

			check(err)

			//b, _ := json.Marshal(record)

			fullResults = append(fullResults, record)

		}
	}

	return fullResults

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
