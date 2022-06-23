import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const TodoList = ({theme, todoList, completeTodo, editTodo, deleteTodo, saveTodo, editRef, preventSubmit}) => {
    let uniqueKey = 123;

    return (
        <ThemeProvider theme = {theme}>
            <List>
                {todoList.map((todo, index) => {
                    const labelId = `todo-${todo.text}`;
                    
                    return (
                        <ListItem key = {`todo-key-${uniqueKey++}`}>
                            <ListItemIcon>
                                <Checkbox
                                    disableRipple
                                    color = "primary"
                                    edge = "start"
                                    checked = {todo.isChecked ? true : false}
                                    onClick = {() => {completeTodo(index)}}
                                    onKeyPress = {preventSubmit}
                                />
                            </ListItemIcon>

                            {!todo.isEditing ?
                                <>
                                    <ListItemText
                                        id = {labelId}
                                        primary = {`${todo.text}`}
                                        style = {{textDecoration: todo.isCompleted ? "line-through" : ""}}
                                    />
                                    <ListItemIcon>
                                        <IconButton
                                            edge = "end"
                                            onClick = {() => {editTodo(index)}}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </ListItemIcon>
                                </>
                                :
                                <>
                                    <label className = "hidden-list">
                                        {todo.text}
                                    </label>
                                    <input
                                        id = {labelId}
                                        className = "edit-form-input"
                                        defaultValue = {todo.text}
                                        ref = {(element) => {editRef.current[index] = element}}
                                        onKeyPress = {preventSubmit}
                                    />
                                    <ListItemIcon>
                                        <IconButton
                                            edge = "end"
                                            onClick = {() => {saveTodo(index)}}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                </>
                            }

                            <ListItemSecondaryAction>
                                <IconButton
                                    edge = "end"
                                    onClick = {() => {deleteTodo(index)}}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </ThemeProvider>
    );
}

export default TodoList;