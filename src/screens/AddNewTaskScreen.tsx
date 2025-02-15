import { View } from 'react-native';
import Ellipse1 from '@assets/ellipse1.svg';
import Ellipse2 from '@assets/ellipse2.svg';
import Cross from '@assets/icons/cross.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input, Pressable, Text } from '@components/atoms';
import { colors } from '@utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { AddNewTaskScreenProps } from '@navigation/TodoListNavigator/TodoListNavigator.types';
import { CATEGOGIES, CATEGORY_STYLES } from '@utils/contants';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@redux/types';
import { useAppDispatch } from '@redux/hooks';
import { appActions } from '@redux/slice';
import { NavigationButton } from '@components/molecules';

const AddNewTaskScreen = ({ navigation }: AddNewTaskScreenProps) => {
  const dispatch = useAppDispatch();
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();

  const [task, setTask] = useState<Task>({
    id: '',
    taskTitle: '',
    category: '',
    date: '',
    time: '',
    notes: '',
    isChecked: false,
  });
  const [category, setCategory] = useState('');

  const handleCross = () => {
    navigation.goBack();
  };

  const handleCategoryPress = (cat: string) => {
    if (cat === category) {
      setCategory('');
      return;
    }
    setCategory(cat);

    // Update task category
    setTask((prev) => ({
      ...prev,
      category: cat,
    }));
  };

  const handlePressSave = () => {
    if (!task.taskTitle || !task.category) return;

    dispatch(appActions.addNewTask({ ...task, id: uuidv4() }));
    navigation.goBack();
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
        <View style={{ flex: 0.15, backgroundColor: '#4A3780' }} />
        <View style={{ flex: 0.75, backgroundColor: '#F1F5F9' }} />
        <View style={{ position: 'absolute', top: 0, left: 0 }}>
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
            paddingTop: 12,
            marginBottom: 24,
          }}
        >
          <NavigationButton onPress={handleCross} icon={Cross} />
          <Text style={{ fontWeight: 600, color: colors.white, fontSize: 16 }}>
            Add New Task
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Task Title block */}
          <View style={{ marginTop: 32 }}>
            <Input
              title="Task Title"
              placeholder="Task Title"
              onChangeText={(text) =>
                setTask((prev) => ({
                  ...prev,
                  taskTitle: text,
                }))
              }
            />
          </View>

          {/* Category block */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 24,
              marginVertical: 24,
            }}
          >
            <Text variant="newTaskTitle">Category</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 16,
              }}
            >
              {CATEGOGIES.map((item) => {
                const { icon: Icon, backgroundColor } = CATEGORY_STYLES[item];

                return (
                  <Pressable
                    key={item}
                    onPress={() => handleCategoryPress(item)}
                    style={{
                      borderWidth: 2,
                      borderColor:
                        category === item
                          ? colors.checkBoxBorder
                          : colors.white,
                      backgroundColor,
                      borderRadius: 50,
                      width: 48,
                      height: 48,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Icon />
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Date & Time block */}
          <View
            style={{
              marginBottom: 24,
              flexDirection: 'row',
              gap: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Input
                type="date"
                title="Date"
                placeholder="Date"
                onChange={(date) =>
                  setTask((prev) => ({
                    ...prev,
                    date: date.toDateString(),
                  }))
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                type="time"
                title="Time"
                placeholder="Time"
                onChange={(time) =>
                  setTask((prev) => ({
                    ...prev,
                    time: new Intl.DateTimeFormat('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                      .format(time)
                      .replace(' ', '')
                      .toLowerCase(),
                  }))
                }
              />
            </View>
          </View>

          {/* Notes block */}
          <View style={{ marginBottom: 24 }}>
            <Input
              title="Notes"
              placeholder="Notes"
              textarea
              onChangeText={(text) =>
                setTask((prev) => ({
                  ...prev,
                  notes: text,
                }))
              }
            />
          </View>
        </ScrollView>
      </View>

      {/* Button Save */}
      <View
        style={{
          position: 'absolute',
          paddingHorizontal: 16,
          right: 0,
          bottom: bottomInset,
          left: 0,
        }}
      >
        <Button title="Save" onPress={handlePressSave} />
      </View>
    </View>
  );
};

export default AddNewTaskScreen;
