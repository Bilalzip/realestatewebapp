import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '@/slice/AuthSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        Auth: AuthReducer

    }
  })
}