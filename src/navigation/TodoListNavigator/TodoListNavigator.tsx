import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoListNavigatorParamsList } from './TodoListNavigator.types';
import defaultOptions from '../defaultOptions';
import {
  AddNewTaskScreen,
  AllTasksScreen,
  TodoListScreen,
} from '@screens/index';

const Stack = createNativeStackNavigator<TodoListNavigatorParamsList>();

const TodoListNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllTasksScreen"
      screenOptions={{ ...defaultOptions, animation: 'none' }}
    >
      <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
      <Stack.Screen name="AddNewTaskScreen" component={AddNewTaskScreen} />
      <Stack.Screen name="AllTasksScreen" component={AllTasksScreen} />
    </Stack.Navigator>
  );
};

export default TodoListNavigator;
