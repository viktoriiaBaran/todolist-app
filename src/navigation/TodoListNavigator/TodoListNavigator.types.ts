import { CompositeScreenProps } from '@react-navigation/native';
import { RootNavigatorParamsList } from '../RootNavigator/RootNavigator.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TodoListNavigatorParamsList = {
  TodoListScreen: undefined;
};

export type TodoListProps = CompositeScreenProps<
  NativeStackScreenProps<TodoListNavigatorParamsList, 'TodoListScreen'>,
  NativeStackScreenProps<RootNavigatorParamsList>
>;
