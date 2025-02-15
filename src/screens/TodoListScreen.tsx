import { View } from 'react-native';
import Ellipse1 from '@assets/ellipse1.svg';
import Ellipse2 from '@assets/ellipse2.svg';
import ArrowLeft from '@assets/icons/arrow-left.svg';
import ArrowRight from '@assets/icons/arrow-right.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Button, Text } from '@components/atoms';
import { CATEGORY_STYLES } from '@utils/contants';
import { colors } from '@utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { TodoListScreenProps } from '@navigation/TodoListNavigator/TodoListNavigator.types';
import { selectCurrentDate, selectAllTasks } from '@redux/selectors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { appActions } from '@redux/slice';
import {
  AnimatedInput,
  NavigationButton,
  TaskItem,
} from '@components/molecules';
import { useSearchTasks } from '@hooks/index';
import SearchIcon from '@assets/icons/search.svg';

const TodoListScreen = ({ navigation, route }: TodoListScreenProps) => {
  const dispatch = useAppDispatch();
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();

  const currentDate = route.params?.date;
  const allTasks = useAppSelector(selectAllTasks);
  const dayTasks = allTasks[currentDate] || [];
  const [todoList, setTodoList] = useState(
    dayTasks.filter((task) => !task.isChecked)
  );
  const [completedList, setCompletedTasks] = useState(
    dayTasks.filter((task) => task.isChecked)
  );

  useEffect(() => {
    setTodoList(dayTasks.filter((task) => !task.isChecked));
    setCompletedTasks(dayTasks.filter((task) => task.isChecked));
  }, [dayTasks]);

  const handleBackPress = () => {
    navigation.navigate('AllTasksScreen');
  };

  const navigateToAddNewTask = () => {
    navigation.navigate('AddNewTaskScreen');
  };

  const handleToggleCheck = (id: string) => {
    dispatch(appActions.toggleCheck({ date: currentDate, taskId: id }));
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        position: 'relative',
      }}
    >
      {/* Background */}
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <View style={{ flex: 0.3, backgroundColor: colors.deepIndigo }} />
        <View style={{ flex: 0.7, backgroundColor: colors.softMist }} />
        <View style={{ position: 'absolute', top: 60, left: 0 }}>
          <Ellipse1 />
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <Ellipse2 />
        </View>
      </View>

      {/* Content */}
      <View
        style={{
          flex: 1,
          top: topInset,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: 'column', paddingBottom: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 12,
              marginBottom: 15,
            }}
          >
            <NavigationButton onPress={handleBackPress} icon={ArrowLeft} />
            <Text
              style={{ fontWeight: 600, color: colors.white, fontSize: 16 }}
            >
              {currentDate}
            </Text>
          </View>
          <Text
            variant="title"
            style={{
              color: colors.border,
              textAlign: 'center',
            }}
          >
            My Todo List
          </Text>
        </View>

        {/* Task Lists */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Todo List */}
          <View
            style={{
              marginTop: 32,
              backgroundColor: colors.white,
              borderRadius: 16,
            }}
          >
            {todoList.map((item, index) => {
              const { icon: Icon, backgroundColor } =
                CATEGORY_STYLES[item.category];
              return (
                <TaskItem
                  key={item.id}
                  time={item.time}
                  title={item.taskTitle}
                  icon={Icon}
                  isLast={index === todoList.length - 1}
                  isChecked={item.isChecked}
                  toggleCheck={() => handleToggleCheck(item.id)}
                  backgroundColor={backgroundColor}
                />
              );
            })}
          </View>

          {/* Completed List */}
          {completedList.length > 0 && (
            <Text
              style={{
                marginVertical: 24,
                fontWeight: 600,
                color: colors.black,
                fontSize: 16,
              }}
            >
              Completed
            </Text>
          )}

          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 16,
              marginBottom: 200,
            }}
          >
            {completedList.map((item, index) => {
              const { icon: Icon, backgroundColor } =
                CATEGORY_STYLES[item.category];
              return (
                <TaskItem
                  key={item.id}
                  time={item.time}
                  title={item.taskTitle}
                  icon={Icon}
                  isLast={index === completedList.length - 1}
                  isChecked={item.isChecked}
                  toggleCheck={() => handleToggleCheck(item.id)}
                  backgroundColor={backgroundColor}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Add Task Button */}
      <View
        style={{
          position: 'absolute',
          paddingHorizontal: 16,
          right: 0,
          bottom: bottomInset,
          left: 0,
        }}
      >
        <Button title="Add New Task" onPress={navigateToAddNewTask} />
      </View>
    </View>
  );
};

export default TodoListScreen;
