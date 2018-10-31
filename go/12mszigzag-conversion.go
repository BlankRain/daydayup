package main

import (
	"fmt"
)

func main() {
	x := convert("PAYPALISHIRING", 4)
	fmt.Println(x)
}
func convert(s string, numRows int) string {
	if numRows <= 1 {
		return s
	}
	l := len(s)
	m := 2 * (numRows - 1)

	var p [][]byte = make([][]byte, numRows)
	for i := 0; i < l; i++ {
		x := i % m
		if x > numRows-1 {
			x = m - x
		}
		p[x] = append(p[x], s[i])
	}
	var ret []byte
	for i := 0; i < numRows; i++ {
		for j := 0; j < len(p[i]); j++ {
			ret = append(ret, p[i][j])
		}
	}
	return string(ret)
}
