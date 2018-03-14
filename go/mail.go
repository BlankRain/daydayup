package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

var wg sync.WaitGroup
var logwg sync.WaitGroup

func main() {
	fmt.Println(gen_ip())
	fmt.Println(get_mail(586876519480))
	leader(4)
	read_task()
}

func gen_ip() string {
	a := rand_int()
	b := rand_int()
	c := rand_int()
	d := rand_int()
	return fmt.Sprintf("%d.%d.%d.%d", a, b, c, d)
}
func rand_int() int {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return r.Intn(100)
}

func get_mail(n int64) Result {
	client := &http.Client{}
	req, err := http.NewRequest("GET", fmt.Sprintf("http://www.kuaidi100.com/query?type=shunfeng&postid=%d&id=1&valicode=&temp=0.9510655129234886", n), strings.NewReader(""))
	if err != nil {
		panic(err)
	}
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
	if _, err := os.Stat("cookie.txt"); os.IsNotExist(err) {
		req.Header.Set("Cookie", "WWWID=WWWD8342CF264ECF89F5D3B8E7BCC836FB6; Hm_lvt_22ea01af58ba2be0fec7c11b25e88e6c=1520818432; Hm_lpvt_22ea01af58ba2be0fec7c11b25e88e6c=1520818432; sortStatus=0")
	} else {
		cookie, _ := ioutil.ReadFile("cookie.txt")
		req.Header.Set("Cookie", string(cookie))
	}

	req.Header.Set("User-Agent", fmt.Sprintf("%s%d", "Mozilla / 5.0(X21; Windows x86_64) AppleWebKit/ 537.36(KHTML, like Gecko) Chrome/ 62.0.3202.94 Safari/ 537.36", rand_int()))
	req.Header.Set("X-Forwarded-For", gen_ip())
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		// handle error
	}
	result := string(body)
	var r Result
	json.Unmarshal([]byte(result), &r)
	return r
}

func leader(worker_numbers int) {
	start, end := read_task()
	task_number := end - start
	tasks := make(chan int64, task_number)
	log := make(chan string, task_number)
	wg.Add(worker_numbers)
	logwg.Add(1)

	for gr := 1; gr <= worker_numbers; gr++ {
		go worker(tasks, log, gr)
	}

	for post := start; post <= end; post++ {
		tasks <- post
	}
	go logger(log, start, end)
	close(tasks)
	wg.Wait()
	close(log)
	logwg.Wait()
	fmt.Println("Existing..")
}
func read_task() (int64, int64) {
	data, err := ioutil.ReadFile("task.txt")
	if err != nil {
		panic(err)
	}
	t := string(data)
	ts := strings.Split(t, ",")
	start, _ := strconv.ParseInt(ts[0], 10, 64)
	end, _ := strconv.ParseInt(ts[1], 10, 64)
	return start, end
}
func worker(tasks chan int64, record chan string, worker int) {
	defer wg.Done()
	for {
		task, ok := <-tasks
		if !ok {
			fmt.Printf("Worker: %d Shutting Down\n", worker)
			return
		}
		fmt.Printf("Worker %d :Started %d\n", worker, task)
		r := get_mail(task)
		if r.Status == "200" {
			fmt.Printf("Find one %d\n", task)
			record <- fmt.Sprintf("%d", task)
		} else {
			fmt.Printf("%d with result: %s\n", task, r.Message)
		}
		time.Sleep(time.Duration(1) * time.Second)
	}
}
func logger(record chan string, start int64, end int64) {
	defer logwg.Done()
	name := fmt.Sprintf("%d_%d-%d.txt", start, end, time.Now().Nanosecond())
	f, err := os.OpenFile(name, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	defer f.Close()
	if err != nil {
		log.Fatal(err)
	}

	for {
		txt, ok := <-record
		if !ok {
			fmt.Printf("Now ,Stop record to %s.\n", name)
			return
		}
		fmt.Printf("now record it %s \n", txt)
		if _, err := f.Write([]byte(txt + "\n")); err != nil {
			log.Fatal(err)
		}
	}
}

type Result struct {
	Message string
	Status  string
}
