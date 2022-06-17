package main

import (
	"crypto/md5"
	"encoding/json"
	"errors"
	"net/http"
	"net/mail"
)

var userIdCounter = 1
var globalTodos ToDo
var listsCounter = 1
var tasksCounter = 1

type User struct {
	Id             int
	Email          string
	PasswordDigest string
}

type ToDo struct {
	Todos map[int]UserToDo
}

type UserToDo struct {
	Lists map[int]ToDoList // Map listId -> List
}

type ToDoList struct {
	Id    int // List unique identifier
	Name  string
	Tasks map[int]Task // Map taskId -> Task
}

type Task struct {
	Id          int // Unique task id
	Name        string
	Description string
	Status      string
}

// Example
// POST /todo/*list_id*/task
// Parameters:
//{
// task_name: "Read article",
// description: "la la la la la la"
//}

type CreateListParameters struct {
	List_name string `json:"list_name"`
}

type UpdateTaskParameters struct {
	Task_name        string `json:"task_name"`
	Task_status      string `json:"task_status"`
	Task_description string `json:"task_description"`
}

type CreateTaskParameters struct {
	Task_name        string `json:"task_name"`
	Task_description string `json:"task_description"`
}

type UserRepository interface {
	Add(string, User) error
	Get(string) (User, error)
	Update(string, User) error
	Delete(string) (User, error)
}

type UserService struct {
	repository UserRepository
}

type UserRegisterParams struct {
	// If it looks strange, read about golang struct tags
	Email    string `json:"email"`
	Password string `json:"password"`
}

func validateEmail(p *UserRegisterParams) error {
	if p.Email == "" {
		return errors.New("the email field is required")
	}
	// 1. Email is valid
	_, err := mail.ParseAddress(p.Email)
	if err != nil {
		return errors.New("the email field have to be a valid email address")
	}
	return nil
}

func validatePassword(p *UserRegisterParams) error {
	// 2. Password at least 8 symbols
	if len(p.Password) < 8 {
		return errors.New("password at least 8 symbols")
	}
	return nil
}

func validateRegisterParams(p *UserRegisterParams) error {
	err := validateEmail(p)
	if err != nil {
		return err
	}
	err = validatePassword(p)
	if err != nil {
		return err
	}
	return nil
}

func handleError(err error, w http.ResponseWriter) {
	w.WriteHeader(http.StatusUnprocessableEntity)
	w.Write([]byte(err.Error()))
}

func (u *UserService) Register(w http.ResponseWriter, r *http.Request) {
	params := &UserRegisterParams{}
	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		handleError(errors.New("could not read params"), w)
		return
	}

	if err := validateRegisterParams(params); err != nil {
		handleError(err, w)
		return
	}
	passwordDigest := md5.New().Sum([]byte(params.Password))
	newUser := User{
		Id:             userIdCounter,
		Email:          params.Email,
		PasswordDigest: string(passwordDigest),
	}
	globalTodos.Todos[userIdCounter] = UserToDo{Lists: make(map[int]ToDoList)}
	userIdCounter++

	err = u.repository.Add(params.Email, newUser)
	if err != nil {
		handleError(err, w)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("registered"))
}
