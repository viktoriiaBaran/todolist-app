import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoListNavigatorParamsList } from './TodoListNavigator.types';
import defaultOptions from '../defaultOptions';
import { TodoListScreen } from '@screens/index';

const Stack = createNativeStackNavigator<TodoListNavigatorParamsList>();

const TodoListNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TodoListScreen"
      screenOptions={{ ...defaultOptions, animation: 'none' }}
    >
      <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
    </Stack.Navigator>
  );
};

export default TodoListNavigator;
