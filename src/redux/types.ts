import { store } from './store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppState = {
  currentRouteName: string;
  previousRouteName: string;
  currentTasks: Task[];
};

export type Task = {
  id: string;
  taskTitle: string;
  category: string;
  date: Date | string;
  time: string | undefined;
  notes: string;
  isChecked: boolean;
};
