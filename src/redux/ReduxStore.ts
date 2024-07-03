import { configureStore } from "@reduxjs/toolkit";
import CompletedTodosSlice from "./CompletedTodosSlice";
import PendingTodosSlice from "./PendingTodosSlice";


const store = configureStore({
    reducer:{
        pendingTodos:PendingTodosSlice,
        completedTodos:CompletedTodosSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
    
});


export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;