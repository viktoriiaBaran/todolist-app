import { NavigationState } from '@react-navigation/native';
import { RootNavigatorParamsList } from './RootNavigator.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import defaultOptions from '@navigation/defaultOptions';
import TodoListNavigator from '@navigation/TodoListNavigator/TodoListNavigator';

const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TodoListNavigator"
      screenOptions={{ ...defaultOptions, animation: 'none' }}
    >
      <Stack.Screen name="TodoListNavigator" component={TodoListNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

// @ts-ignore
export function getActiveRouteName(
  navigationState: NavigationState | undefined
) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // Dive into nested navigators
  if (route.state) {
    return getActiveRouteName(route.state as NavigationState);
  }

  return route.name;
}
