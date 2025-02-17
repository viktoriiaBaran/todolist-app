import { View, KeyboardAvoidingView, Platform } from 'react-native';
import Cross from '@assets/icons/cross.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input, Text } from '@components/atoms';
import { colors } from '@utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { AddNewTaskScreenProps } from '@navigation/TodoListNavigator/TodoListNavigator.types';
import {
  BOTTOM_INSET,
  CATEGOGIES,
  CATEGORY_STYLES,
  TOP_INSET,
} from '@utils/contants';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@redux/types';
import { useAppDispatch } from '@redux/hooks';
import { appActions } from '@redux/slice';
import { CategoryButton, NavigationButton } from '@components/molecules';
import ScreenWrapper from '@components/wrappers/ScreenWrapper';

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

    setTask((prev) => ({
      ...prev,
      category: cat,
    }));
  };

  const handlePressSave = () => {
    if (!task.taskTitle || !task.category || !task.date) return;

    dispatch(appActions.addNewTask({ ...task, id: uuidv4() }));
    navigation.goBack();
  };

  return (
    <ScreenWrapper whiteFlex={85} purpleFlex={15}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View
          style={{
            flex: 1,
            top: topInset || TOP_INSET,
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
            <Text
              style={{ fontWeight: 600, color: colors.white, fontSize: 16 }}
            >
              Add New Task
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
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
                    <CategoryButton
                      key={item}
                      icon={Icon}
                      backgroundColor={backgroundColor}
                      item={item}
                      category={category}
                      onPress={handleCategoryPress}
                    />
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
            bottom: bottomInset || BOTTOM_INSET,
            left: 0,
          }}
        >
          <Button title="Save" onPress={handlePressSave} />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default AddNewTaskScreen;
