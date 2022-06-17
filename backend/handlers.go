package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func newTodoHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	params := &CreateListParameters{}
	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		handleError(errors.New("could not read params"), w)
		return
	}
	newList := ToDoList{
		Id:    listsCounter,
		Name:  params.List_name,
		Tasks: make(map[int]Task),
	}
	globalTodos.Todos[u.Id].Lists[listsCounter] = newList
	listsCounter++

	res, _ := json.Marshal(newList)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(string(res)))
}

func updateTodoListHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	params := &CreateListParameters{}
	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		handleError(errors.New("could not read params"), w)
		return
	}
	id, _ := strconv.Atoi(strings.Trim(r.URL.String(), "/todo/lists/"))
	list := globalTodos.Todos[u.Id].Lists[id]
	list.Name = params.List_name
	globalTodos.Todos[u.Id].Lists[id] = list

	res, _ := json.Marshal(list)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(string(res)))
}

func deleteTodoListHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	id, _ := strconv.Atoi(strings.Trim(r.URL.String(), "/todo/lists/"))
	delete(globalTodos.Todos[u.Id].Lists, id)

	w.WriteHeader(http.StatusNoContent)
	w.Write([]byte(""))
}

func getTodoListHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	res, _ := json.Marshal(globalTodos.Todos[u.Id].Lists)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(string(res)))
}

func newTaskHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	params := &CreateTaskParameters{}
	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		handleError(errors.New("could not read params"), w)
		return
	}
	newTask := Task{
		Id:          tasksCounter,
		Name:        params.Task_name,
		Description: params.Task_description,
		Status:      "open",
	}
	temp := strings.Trim(r.URL.String(), "/todo/lists/")
	id, _ := strconv.Atoi(strings.Trim(temp, "/tasks"))
	fmt.Println(id)
	globalTodos.Todos[u.Id].Lists[id].Tasks[tasksCounter] = newTask
	tasksCounter++

	res, _ := json.Marshal(newTask)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(res))
}

func updateTaskHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	params := &UpdateTaskParameters{}
	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		handleError(errors.New("could not read params"), w)
		return
	}
	temp := strings.Trim(r.URL.String(), "/todo/lists/")
	arr := strings.Split(temp, "/")
	list_id, _ := strconv.Atoi(arr[0])
	task_id, _ := strconv.Atoi(arr[2])

	task := globalTodos.Todos[u.Id].Lists[list_id].Tasks[task_id]
	task.Name = params.Task_name
	task.Description = params.Task_description
	task.Status = params.Task_status
	globalTodos.Todos[u.Id].Lists[list_id].Tasks[task_id] = task

	res, _ := json.Marshal(task)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(res))
}

func deleteTaskHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	temp := strings.Trim(r.URL.String(), "/todo/lists/")
	arr := strings.Split(temp, "/")
	list_id, _ := strconv.Atoi(arr[0])
	task_id, _ := strconv.Atoi(arr[2])
	delete(globalTodos.Todos[u.Id].Lists[list_id].Tasks, task_id)

	w.WriteHeader(http.StatusNoContent)
	w.Write([]byte(""))
}

func getTaskHandler(w http.ResponseWriter, r *http.Request, u User, users UserRepository) {
	temp := strings.Trim(r.URL.String(), "/todo/lists/")
	id, _ := strconv.Atoi(strings.Trim(temp, "/tasks"))
	res, _ := json.Marshal(globalTodos.Todos[u.Id].Lists[id])

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(string(res)))
}
