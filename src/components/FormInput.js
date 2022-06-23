import  React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

const TodoCreator = ({theme, todo, onChangeSetTodo, isInputEmpty, preventSubmit}) => {
    return (
        <ThemeProvider theme = {theme}>
            <Stack
                spacing = {2}
                direction = "row"
            >
                <FormControl fullWidth>
                    <TextField
                        variant = "outlined"
                        label = "Add new task"
                        value = {todo}
                        onChange = {(e) => {onChangeSetTodo(e.target.value)}}
                        onKeyPress = {preventSubmit}
                    />

                    {!isInputEmpty ?
                        <></>
                        :
                        <>
                            <FormHelperText>
                                Task can't be empty
                            </FormHelperText>
                        </>
                    }
                </FormControl>

                <Button
                    variant = "contained"
                    type = "submit"
                    onKeyPress = {preventSubmit}
                >
                    Add
                </Button>
            </Stack>
        </ThemeProvider>
    );
}

export default TodoCreator;