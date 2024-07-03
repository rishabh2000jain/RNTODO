import { createSlice } from "@reduxjs/toolkit";
import TodoDatabaseService from "../services/databaseService/TodoDatabaseService";
import { Todo } from "../types/todo";

type CompletedTodosState = {
    todos:Todo[]
};

const initialState:CompletedTodosState = {
    todos:[]
};

const PendingTodoSlice = createSlice({
    name:'CompletedTodos',
    initialState,
    reducers:{
        loadCompletedTodos:(state)=>{
            state.todos = TodoDatabaseService.getAllCompletedTodos();
        }
    }
});

export const { loadCompletedTodos } = PendingTodoSlice.actions;

export default PendingTodoSlice.reducer;