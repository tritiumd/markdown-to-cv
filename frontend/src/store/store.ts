import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './slice'

export const store = configureStore({
    reducer: {
        apiUrl: apiReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch