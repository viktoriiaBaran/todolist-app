import { CompositeScreenProps } from '@react-navigation/native';
import { RootNavigatorParamsList } from '../RootNavigator/RootNavigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Task } from '@redux/types';

export type TodoListNavigatorParamsList = {
  TodoListScreen: { date: string; dayTasks: Task[] };
  AddNewTaskScreen: undefined;
  AllTasksScreen: undefined;
};

export type TodoListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TodoListNavigatorParamsList, 'TodoListScreen'>,
  NativeStackScreenProps<RootNavigatorParamsList>
>;
export type AddNewTaskScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TodoListNavigatorParamsList, 'AddNewTaskScreen'>,
  NativeStackScreenProps<RootNavigatorParamsList>
>;
export type AllTasksScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TodoListNavigatorParamsList, 'AllTasksScreen'>,
  NativeStackScreenProps<RootNavigatorParamsList>
>;
