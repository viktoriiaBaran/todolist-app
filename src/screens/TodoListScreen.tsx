import { View } from 'react-native';
import ArrowLeft from '@assets/icons/arrow-left.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Button, Text } from '@components/atoms';
import { BOTTOM_INSET, CATEGORY_STYLES, TOP_INSET } from '@utils/contants';
import { colors } from '@utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { TodoListScreenProps } from '@navigation/TodoListNavigator/TodoListNavigator.types';
import { selectAllTasks } from '@redux/selectors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { appActions } from '@redux/slice';
import { NavigationButton, TaskItem } from '@components/molecules';
import ScreenWrapper from '@components/wrappers/ScreenWrapper';

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

  const handleDelete = (date: string, taskId: string) => {
    dispatch(appActions.removeTask({ date, taskId }));
  };

  return (
    <ScreenWrapper whiteFlex={70} purpleFlex={30} topElipse1={60}>
      {/* Content */}
      <View
        style={{
          flex: 1,
          top: topInset || TOP_INSET,
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
                  handleDelete={() =>
                    handleDelete(item.date as string, item.id)
                  }
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
                  handleDelete={() =>
                    handleDelete(item.date as string, item.id)
                  }
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
          bottom: bottomInset || BOTTOM_INSET,
          left: 0,
        }}
      >
        <Button title="Add New Task" onPress={navigateToAddNewTask} />
      </View>
    </ScreenWrapper>
  );
};

export default TodoListScreen;
