import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Task } from './types';

const initialState: AppState = {
  currentRouteName: '',
  previousRouteName: '',
  allTasks: {} as Record<string, Task[]>,
  currentDate: '',
};

export const appSlice = createSlice({
  name: 'todoListSlice',
  initialState,
  reducers: {
    setCurrentRouteName(state, action: PayloadAction<string>) {
      state.previousRouteName = state.currentRouteName;
      state.currentRouteName = action.payload;
    },
    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },
    addNewTask(state, action: PayloadAction<Task>) {
      const date = action.payload.date as string;

      if (!state.allTasks[date]) {
        state.allTasks[date] = [];
      }

      state.allTasks[date].push(action.payload);
    },

    updateTaskList(
      state,
      action: PayloadAction<{ date: string; tasks: Task[] }>
    ) {
      state.allTasks[action.payload.date] = action.payload.tasks;
    },
    cleanAllTasks(state) {
      state.allTasks = {};
    },
    toggleCheck(
      state,
      action: PayloadAction<{ date: string; taskId: string }>
    ) {
      const { date, taskId } = action.payload;
      if (state.allTasks[date]) {
        const taskIndex = state.allTasks[date].findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          state.allTasks[date][taskIndex].isChecked =
            !state.allTasks[date][taskIndex].isChecked;
        }
      }
    },
    removeTask(state, action: PayloadAction<{ date: string; taskId: string }>) {
      const { date, taskId } = action.payload;
      if (state.allTasks[date]) {
        state.allTasks[date] = state.allTasks[date].filter(
          (task) => task.id !== taskId
        );
        if (state.allTasks[date].length === 0) {
          const { [date]: _, ...rest } = state.allTasks;
          state.allTasks = rest;
        }
      }
    },
    updateTask(state, action: PayloadAction<Task>) {
      const date = action.payload.date as string;
      if (state.allTasks[date]) {
        const taskIndex = state.allTasks[date].findIndex(
          (task) => task.id === action.payload.id
        );
        if (taskIndex !== -1) {
          state.allTasks[date][taskIndex] = action.payload;
        }
      }
    },
    resetState: () => initialState,
  },
});

export const { reducer: todoListSliceReducer, actions: appActions } = appSlice;
