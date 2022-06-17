package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func wrapJwt(
	jwt *JWTService,
	f func(http.ResponseWriter, *http.Request, *JWTService),
) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		f(rw, r, jwt)
	}
}

var JwtService, jwt_err = NewJWTService("pubkey.rsa", "privkey.rsa")

func main() {
	if jwt_err != nil {
		panic(jwt_err)
	}

	r := mux.NewRouter()
	globalTodos = ToDo{Todos: make(map[int]UserToDo)}
	users := NewInMemoryUserStorage()
	userService := UserService{
		repository: users,
	}

	r.HandleFunc("/user/signup", logRequest(userService.Register)).Methods(http.MethodPost)
	r.HandleFunc("/user/signin", logRequest(wrapJwt(JwtService, userService.JWT))).Methods(http.MethodPost)

	r.HandleFunc("/todo/lists", logRequest(JwtService.jwtAuth(users, newTodoHandler))).Methods(http.MethodPost)                                // todo
	r.HandleFunc("/todo/lists/{list_id}", logRequest(JwtService.jwtAuth(users, updateTodoListHandler))).Methods(http.MethodPut)                // todo
	r.HandleFunc("/todo/lists/{list_id}", logRequest(JwtService.jwtAuth(users, deleteTodoListHandler))).Methods(http.MethodDelete)             // todo
	r.HandleFunc("/todo/lists", logRequest(JwtService.jwtAuth(users, getTodoListHandler))).Methods(http.MethodGet)                             // todo
	r.HandleFunc("/todo/lists/{list_id}/tasks", logRequest(JwtService.jwtAuth(users, newTaskHandler))).Methods(http.MethodPost)                // todo
	r.HandleFunc("/todo/lists/{list_id}/tasks/{task_id}", logRequest(JwtService.jwtAuth(users, updateTaskHandler))).Methods(http.MethodPut)    // todo
	r.HandleFunc("/todo/lists/{list_id}/tasks/{task_id}", logRequest(JwtService.jwtAuth(users, deleteTaskHandler))).Methods(http.MethodDelete) // todo
	r.HandleFunc("/todo/lists/{list_id}/tasks", logRequest(JwtService.jwtAuth(users, getTaskHandler))).Methods(http.MethodGet)                 // todo

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowedMethods: []string{
			http.MethodGet, //http methods for your app
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
			http.MethodHead,
		},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(r)

	srv := http.Server{
		Addr:    ":8085",
		Handler: handler,
	}

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)
	go func() {
		<-interrupt
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		srv.Shutdown(ctx)
	}()

	log.Printf("Server started, press cntrl + C to stop ")
	err := srv.ListenAndServe()
	if err != nil {
		log.Println("Server exited with error:", err)
	}
	log.Println("Good bye :)")
}
