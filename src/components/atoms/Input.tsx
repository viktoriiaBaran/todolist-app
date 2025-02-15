import { colors } from '@utils/colors';
import { View, TextInput } from 'react-native';
import Text from './Text';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import Pressable from './Pressable';
import CalendarIcon from '@assets/icons/calendarInput.svg';
import TimeIcon from '@assets/icons/timeInput.svg';

type InputProps = {
  placeholder: string;
  title: string;
  type?: 'date' | 'time';
  textarea?: boolean;
  onChange?: (date: Date) => void;
  onChangeText?: (text: string) => void;
  value?: string;
};

const Input = ({
  placeholder,
  title,
  type,
  textarea,
  onChange,
  onChangeText,
  value,
}: InputProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
    setIsSelected(true);
    onChange?.(selectedDate);
  };

  const formatValue = () => {
    if (!isSelected) return placeholder;

    if (type === 'date') {
      return date.toLocaleDateString();
    }
    if (type === 'time') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return '';
  };

  if (!type) {
    return (
      <View>
        <Text variant="newTaskTitle" style={{ marginBottom: 8 }}>
          {title}
        </Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={textarea}
          numberOfLines={textarea ? 4 : 1}
          textAlignVertical={textarea ? 'top' : 'center'}
          style={{
            padding: 18,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 6,
            backgroundColor: colors.white,
            minHeight: textarea ? 120 : undefined,
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text variant="newTaskTitle" style={{ marginBottom: 8 }}>
        {title}
      </Text>

      <Pressable onPress={() => setOpen(true)}>
        <View
          style={{
            padding: 18,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 6,
            backgroundColor: colors.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: colors.timeText,
              opacity: isSelected ? 1 : 0.7,
            }}
          >
            {formatValue()}
          </Text>
          {type === 'date' ? <CalendarIcon /> : <TimeIcon />}
        </View>
      </Pressable>

      <DatePicker
        modal
        open={open}
        date={date}
        mode={type}
        minimumDate={type === 'date' ? new Date() : undefined}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default Input;
