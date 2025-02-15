import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Task } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialState: AppState = {
  currentRouteName: '',
  previousRouteName: '',
  currentTasks: [],
};

export const appSlice = createSlice({
  name: 'todoListSlice',
  initialState,
  reducers: {
    setCurrentRouteName(state, action: PayloadAction<string>) {
      state.previousRouteName = state.currentRouteName;
      state.currentRouteName = action.payload;
    },
    addNewTask(state, action: PayloadAction<Task>) {
      state.currentTasks.push(action.payload);
    },
    cleanAllTasks(state) {
      state.currentTasks = [];
    },
    toggleCheck(state, action: PayloadAction<string>) {
      const task = state.currentTasks.find(
        (item) => item.id === action.payload
      );
      console.log('task', task);
      if (task) {
        task.isChecked = !task.isChecked;
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      state.currentTasks = state.currentTasks.filter(
        (item) => item.id !== action.payload
      );
    },
    updateTask(state, action: PayloadAction<Task>) {
      const task = state.currentTasks.find(
        (item) => item.id === action.payload.id
      );
      if (task) {
        task.taskTitle = action.payload.taskTitle;
        task.category = action.payload.category;
        task.date = action.payload.date;
        task.time = action.payload.time;
        task.notes = action.payload.notes;
      }
    },
    resetState: () => initialState,
  },
});

export const { reducer: todoListSliceReducer, actions: appActions } = appSlice;
