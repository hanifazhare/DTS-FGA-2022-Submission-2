import React, { useState, useEffect, useRef } from 'react';
import { createTheme } from "@mui/material/styles";
import TodoCreator from "./FormInput";
import TodoList from "./TodoList";

const theme = createTheme({
    palette: {
        primary: {main: '#000000'},
    },
});

const Form = () => {
    const [todoList, setTodos] = useState(() => {
        const checkSavedTodoList = localStorage.getItem("todoList");
        const loadTodoList = JSON.parse(checkSavedTodoList);
    
        return checkSavedTodoList ? loadTodoList : [
            {
                text: "Learn about ReactJS",
                isCompleted: false,
                isChecked: false,
                isEditing: false
            }
        ]
    });
    const [newTodo, setNewTodo] = useState('');
    const [isInputEmpty, setInputEmpty] = useState(false);
    const editTodoRef = useRef({});

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
    };

    const preventSubmit = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const addTodo = (text) => {
        if(text !== '') {
            const todos = [...todoList, {text}];
            setNewTodo('');
            setTodos(todos);
        } else {
            setInputEmpty(true);
        }
    };

    const deleteTodo = (index) => {
        const todos = [...todoList];
        todos.splice(index, 1);
        setTodos(todos);
    };

    const completeTodo = (index) => {
        const todos = [...todoList];
        todos[index].isCompleted = !todos[index].isCompleted;
        todos[index].isChecked = !todos[index].isChecked;
        setTodos(todos);
    };

    const editTodo = (index) => {
        const todos = [...todoList];
        todos[index].isEditing = !todos[index].isEditing;
        setTodos(todos);
    };

    const saveTodo = (index) => {
        const todos = [...todoList];
        todos[index].isEditing = !todos[index].isEditing;
        todos[index].text = editTodoRef.current[index].value;
        setTodos(todos);
    };

    const clearInput = () => {
        setNewTodo('');
    };

    const onChangeSetTodo = (text) => {
        setInputEmpty(false);
        setNewTodo(text);
    };

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <form onSubmit = {handleSubmit} className = "form">
            <TodoCreator
                theme = {theme}
                todo = {newTodo}
                onChangeSetTodo = {onChangeSetTodo}
                isInputEmpty = {isInputEmpty}
                preventSubmit = {preventSubmit}
            />
            
            <TodoList
                theme = {theme}
                todoList = {todoList}
                completeTodo = {completeTodo}
                editTodo = {editTodo}
                deleteTodo = {deleteTodo}
                saveTodo = {saveTodo}
                editRef = {editTodoRef}
                preventSubmit = {preventSubmit}
            />
        </form>
    );
}

export default Form;