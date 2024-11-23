package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"
)

func main() {
	cmd := exec.Command("node", "src/server.js")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Start()
	if err != nil {
		log.Fatalf("Error starting Retendo Network Website server: %v", err)
	}
	log.Println("Retendo Network Website server started.")

	time.Sleep(2 * time.Second)

	proxy := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		resp, err := http.Get("http://127.0.0.1" + r.URL.Path)
		if err != nil {
			http.Error(w, "Failed to connect to the Retendo Network Website server", http.StatusInternalServerError)
			log.Println("Error:", err)
			return
		}
		defer resp.Body.Close()

		for k, v := range resp.Header {
			w.Header()[k] = v
		}
		w.WriteHeader(resp.StatusCode)
		_, err = io.Copy(w, resp.Body)
		if err != nil {
			log.Println("Error copying response body:", err)
		}
	})

	http.Handle("/", proxy)

	log.Print("Listening on :3000")
	err = http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
