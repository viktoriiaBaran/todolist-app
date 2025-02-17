import { Button, Pressable, Text } from '@components/atoms';
import {
  AnimatedInput,
  FilterModal,
  NavigationButton,
  TaskItem,
} from '@components/molecules';
import { AllTasksScreenProps } from '@navigation/TodoListNavigator/TodoListNavigator.types';
import { colors } from '@utils/colors';
import { View, TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchIcon from '@assets/icons/search.svg';
import Cross from '@assets/icons/cross.svg';
import FilterIcon from '@assets/icons/filter.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useSearchTasks from '@hooks/useSearchTasks';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectAllTasks } from '@redux/selectors';
import { Task } from '@redux/types';
import {
  BOTTOM_INSET,
  CATEGORY_STYLES,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TOP_INSET,
} from '@utils/contants';
import { appActions } from '@redux/slice';
import { useRef, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import Modal from 'react-native-modal';
import ScreenWrapper from '@components/wrappers/ScreenWrapper';

const AllTasksScreen = ({ navigation }: AllTasksScreenProps) => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const allTasks = useAppSelector(selectAllTasks);

  const flatListRef = useRef<FlatList>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [completeStatus, setCompleteStatus] = useState<string[]>([
    'done',
    'undone',
  ]);
  const [category, setCategory] = useState<string[]>([
    'file',
    'sport',
    'event',
  ]);

  // Search functionality
  const {
    searchValue,
    setSearchValue,
    isSearchVisible,
    setIsSearchVisible,
    filteredTasks,
  } = useSearchTasks({
    taskList: allTasks,
    completeStatus,
    category,
  });

  const navigateToAddNewTask = () => {
    navigation.navigate('AddNewTaskScreen');
  };
  const navigateToDayTasks = (date: string) => {
    navigation.navigate('TodoListScreen', { date, dayTasks: allTasks[date] });
  };

  const handleToggleCheck = (taskDate: string, id: string) => {
    dispatch(appActions.toggleCheck({ date: taskDate, taskId: id }));
  };

  const handleDelete = (date: string, taskId: string) => {
    dispatch(appActions.removeTask({ date, taskId }));
  };

  const renderTasksForDate = (date: string, tasks: Task[]) => (
    <View key={date}>
      <Pressable onPress={() => navigateToDayTasks(date)}>
        <Text
          style={{
            fontSize: 16,
            color: colors.checkBoxBorder,
            textDecorationLine: 'underline',
            fontWeight: 'bold',
            paddingHorizontal: 16,
            marginBottom: 24,
          }}
        >
          {date}
        </Text>
      </Pressable>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 16,
        }}
      >
        {tasks.map((task, index) => {
          const { icon: Icon, backgroundColor } =
            CATEGORY_STYLES[task.category];
          return (
            <TaskItem
              key={task.id}
              time={task.time}
              title={task.taskTitle}
              icon={Icon}
              isLast={index === tasks.length - 1}
              isChecked={task.isChecked}
              toggleCheck={() =>
                handleToggleCheck(task.date as string, task.id)
              }
              handleDelete={() => handleDelete(task.date as string, task.id)}
              backgroundColor={backgroundColor}
            />
          );
        })}
      </View>
    </View>
  );

  const renderBackdrop = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setIsFilterVisible(false)}>
        <View style={{ flex: 1 }}>
          <BlurView
            blurAmount={8}
            blurType="light"
            style={{
              flex: 1,
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ScreenWrapper whiteFlex={8} purpleFlex={2} topElipse1={60}>
      {/* Content */}
      <View
        style={{
          flex: 1,
          top: topInset || TOP_INSET,
        }}
      >
        {/* Header */}
        {isSearchVisible ? (
          <AnimatedInput
            icon={{
              component: <SearchIcon color="#000" />,
              size: 24,
            }}
            value={searchValue}
            autoFocus={true}
            placeholder="Search..."
            onChangeText={setSearchValue}
            onCancel={() => {
              setIsSearchVisible(false);
              setSearchValue('');
            }}
          />
        ) : (
          <View
            style={{
              paddingBottom: 13,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NavigationButton
                onPress={() => setIsFilterVisible(true)}
                icon={FilterIcon}
              />
              <NavigationButton
                isRight
                onPress={() => setIsSearchVisible(true)}
                icon={SearchIcon}
              />
            </View>
            <Text
              variant="title"
              style={{
                marginTop: 48,
                color: colors.border,
                textAlign: 'center',
              }}
            >
              My Todo List
            </Text>
          </View>
        )}

        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            left: -3,
          }}
          backdropOpacity={1}
          hideModalContentWhileAnimating
          useNativeDriver
          isVisible={isFilterVisible}
          onBackdropPress={() => setIsFilterVisible(false)}
          customBackdrop={renderBackdrop()}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              top: topInset || TOP_INSET - 3,
            }}
          >
            <NavigationButton
              onPress={() => setIsFilterVisible(false)}
              icon={Cross}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              top: topInset || TOP_INSET + 60,
            }}
          >
            <FilterModal
              completeStatus={completeStatus}
              setCompleteStatus={setCompleteStatus}
              category={category}
              setCategory={setCategory}
            />
          </View>
        </Modal>

        {/* Task Lists */}
        <FlatList
          data={Object.entries(filteredTasks)}
          renderItem={({ item: [date, tasks] }) =>
            renderTasksForDate(date, tasks)
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 24,
            paddingTop: 20,
            paddingBottom: bottomInset || BOTTOM_INSET + 100,
          }}
        />
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

export default AllTasksScreen;
