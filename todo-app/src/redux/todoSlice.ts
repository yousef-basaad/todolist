import { createSlice } from '@reduxjs/toolkit'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

const initialState = {}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
})

export default todoSlice.reducer
