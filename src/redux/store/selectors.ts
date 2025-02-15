import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

const selectApp = (state: RootState) => state.todoList;

export const selectCurrentRouteName = createSelector(
  selectApp,
  (state) => state.currentRouteName
);

export const selectPreviousRouteName = createSelector(
  selectApp,
  (state) => state.previousRouteName
);

export const selectCurrentTasks = createSelector(
  selectApp,
  (state) => state.currentTasks
);
