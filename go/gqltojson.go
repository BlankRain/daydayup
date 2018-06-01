package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/dgraph-io/dgraph/gql"
)

type Ret struct {
	Source string
	Result gql.Result
}

func main() {
	if len(os.Args) <= 1 {
		return
	}
	r, err := gql.Parse(gql.Request{Str: os.Args[1]})

	if err != nil {
		fmt.Println(err)
		return
	}
	s, err := json.MarshalIndent(Ret{Source: os.Args[1], Result: r}, "", "    ")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(s))
}
