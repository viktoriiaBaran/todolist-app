import { CompositeScreenProps } from '@react-navigation/native';
import { RootNavigatorParamsList } from '../RootNavigator/RootNavigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TodoListNavigatorParamsList = {
  TodoListScreen: undefined;
  AddNewTaskScreen: undefined;
};

export type TodoListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TodoListNavigatorParamsList, 'TodoListScreen'>,
  NativeStackScreenProps<RootNavigatorParamsList>
>;
export type AddNewTaskScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TodoListNavigatorParamsList, 'AddNewTaskScreen'>,
  NativeStackScreenProps<RootNavigatorParamsList>
>;
