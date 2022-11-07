import { configureStore } from '@reduxjs/toolkit'
import empReducer from './reducers/employee'

const store = configureStore({
  reducer : {
    employee : empReducer
  }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch