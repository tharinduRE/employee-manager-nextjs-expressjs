import { configureStore } from '@reduxjs/toolkit'
import empReducer from './reducers/employee'

export const store = configureStore({
  reducer: {
    employee: empReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch