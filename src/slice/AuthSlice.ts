import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useState } from 'react'

const initialState = {
    token : null
}

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers:{
    AuthUser : (state, action) =>{
        state.token = action.payload

    }, 
  }
})

export const {AuthUser} = AuthSlice.actions
export default AuthSlice.reducer