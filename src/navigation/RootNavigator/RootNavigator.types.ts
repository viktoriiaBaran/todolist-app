import { TodoListNavigatorParamsList } from '@navigation/TodoListNavigator/TodoListNavigator.types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootNavigatorParamsList = {
  TodoListNavigator: NavigatorScreenParams<TodoListNavigatorParamsList>;
};

export type RootNavigatorParamProps =
  NativeStackScreenProps<RootNavigatorParamsList>;
