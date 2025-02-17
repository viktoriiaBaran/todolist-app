import { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { colors } from '@utils/colors';
import { Checkbox, Pressable } from '@components/atoms';
import TrashIcon from '@assets/icons/trash.svg';

type TodoItemProps = {
  icon: FC<SvgProps>;
  title: string;
  time: string | undefined;
  isChecked: boolean;
  isLast?: boolean;
  backgroundColor: string;
  toggleCheck: () => void;
  handleDelete: () => void;
};

const TaskItem = ({
  icon: Icon,
  time,
  title,
  isChecked,
  isLast,
  backgroundColor,
  toggleCheck,
  handleDelete,
}: TodoItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 17,
        borderBottomColor: isLast ? 'transparent' : colors.border,
        borderBottomWidth: isLast ? 0 : 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          opacity: isChecked ? 0.5 : 1,
          gap: 12,
        }}
      >
        <View
          style={{
            backgroundColor: backgroundColor,
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon />
        </View>
        <View style={{ flexDirection: 'column', gap: 2 }}>
          <Text
            style={{
              fontWeight: 600,
              fontSize: 16,
              textDecorationLine: isChecked ? 'line-through' : 'none',
            }}
          >
            {title}
          </Text>
          {time && (
            <Text
              style={{
                textDecorationLine: isChecked ? 'line-through' : 'none',
                fontWeight: 500,
                fontSize: 14,
                color: colors.timeText,
                opacity: 0.7,
              }}
            >
              {time}
            </Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Pressable onPress={handleDelete}>
          <TrashIcon />
        </Pressable>
        <Checkbox isChecked={isChecked} onChange={toggleCheck} />
      </View>
    </View>
  );
};

export default TaskItem;
