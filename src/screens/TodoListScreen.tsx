import { Text, View } from 'react-native';
import Ellipse1 from '@assets/ellipse1.svg';
import Ellipse2 from '@assets/ellipse2.svg';
import ArrowLeft from '@assets/icons/arrow-left.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Button, NavigationButton, TodoItem } from '@components/atoms';
import { CATEGORY_STYLES } from '@utils/contants';
import { colors } from '@utils/colors';
import { ScrollView } from 'react-native-gesture-handler';

const list = [
  {
    key: '1',
    category: 'file',
    title: 'Study lesson',
    time: '1:00pm',
    isChecked: false,
  },
  {
    key: '2',
    category: 'sport',
    title: 'Run 5k',
    time: '4:00pm',
    isChecked: false,
  },
  {
    key: '3',
    category: 'event',
    title: 'Go to party',
    time: '10:00pm',
    isChecked: false,
  },
  {
    key: '4',
    category: 'file',
    title: 'Take out trash',
    isChecked: true,
  },
  {
    key: '5',
    category: 'event',
    title: 'Game meetup',
    time: '1:00pm',
    isChecked: true,
  },
];

const TodoListScreen = () => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const [date, setDate] = useState(new Date());
  const [completedList, setCompletedList] = useState<
    {
      key: string;
      category: string;
      title: string;
      time: string | undefined;
      isChecked: boolean;
    }[]
  >([]);
  const [todoList, setTodoList] = useState<
    {
      key: string;
      category: string;
      title: string;
      time: string | undefined;
      isChecked: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (!list) return;
    const completed = list
      .filter((item) => item.isChecked)
      .map((item) => ({ ...item, time: item.time ?? undefined }));
    const todo = list
      .filter((item) => !item.isChecked)
      .map((item) => ({ ...item, time: item.time ?? undefined }));
    setCompletedList(completed);
    setTodoList(todo);
  }, []);

  const handlePress = () => {
    console.log('Pressed');
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        position: 'relative',
      }}
    >
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <View style={{ flex: 0.3, backgroundColor: '#4A3780' }} />
        <View style={{ flex: 0.7, backgroundColor: '#F1F5F9' }} />
        <View style={{ position: 'absolute', top: 60, left: 0 }}>
          <Ellipse1 />
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <Ellipse2 />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          top: topInset,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <NavigationButton onPress={handlePress} icon={ArrowLeft} />
          <Text style={{ fontWeight: 600, color: colors.white, fontSize: 16 }}>
            {date.toDateString()}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontWeight: 700,
              color: colors.border,
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            My Todo List
          </Text>

          <View
            style={{
              marginTop: 32,
              backgroundColor: colors.white,

              borderRadius: 16,
            }}
          >
            {/* Render List */}
            {todoList.map((item, index) => {
              const { icon: Icon, backgroundColor } =
                CATEGORY_STYLES[item.category];
              const isLast = index === todoList.length - 1;

              return (
                <TodoItem
                  key={item.key}
                  time={item.time}
                  title={item.title}
                  icon={Icon}
                  isLast={isLast}
                  isChecked={item.isChecked}
                  backgroundColor={backgroundColor}
                />
              );
            })}
          </View>

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

          <View
            style={{
              backgroundColor: colors.white,

              borderRadius: 16,
            }}
          >
            {/* Render Completed List */}
            {completedList.map((item, index) => {
              const { icon: Icon, backgroundColor } =
                CATEGORY_STYLES[item.category];
              const isLast = index === completedList.length - 1;

              return (
                <TodoItem
                  key={item.key}
                  time={item.time}
                  title={item.title}
                  icon={Icon}
                  isLast={isLast}
                  isChecked={item.isChecked}
                  backgroundColor={backgroundColor}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          paddingHorizontal: 16,
          right: 0,
          bottom: bottomInset,
          left: 0,
        }}
      >
        <Button title="Add New Task" onPress={() => false} />
      </View>
    </View>
  );
};

export default TodoListScreen;
