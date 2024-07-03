import { createSlice } from "@reduxjs/toolkit";
import TodoDatabaseService from "../services/databaseService/TodoDatabaseService";
import { Todo } from "../types/todo";

type TodosState = {
    todos:Todo[]
};

const initialState:TodosState = {
    todos:[]
};

const PendingTodoSlice = createSlice({
    name:'PendingTodo',
    initialState,
    reducers:{
        loadPendingTodos:(state)=>{
            state.todos = TodoDatabaseService.getAllPendingTodos();
        },
        markComplete:(state,actions)=>{
            let todo = TodoDatabaseService.getTodo(actions.payload.id);
            if(!todo){
                return;
            }
            todo!.isComplete = true;
            TodoDatabaseService.updateTodo(actions.payload.id,todo);
        }
    }
});


export const { loadPendingTodos,markComplete } = PendingTodoSlice.actions;

export default PendingTodoSlice.reducer;