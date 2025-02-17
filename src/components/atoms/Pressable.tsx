import React from 'react';
import {
  GestureResponderEvent,
  PressableProps,
  Pressable as PressableRaw,
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

export interface CustomPressableProps extends PressableProps {
  disabled?: boolean;
  changeOpacityOnPress?: boolean;
  onPress?:
    | (() => void)
    | (() => Promise<void>)
    | ((event: GestureResponderEvent) => void)
    | undefined;
}

const Pressable = ({
  onPress,
  disabled,
  changeOpacityOnPress = true,
  ...props
}: CustomPressableProps & React.RefAttributes<View>) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && onPress) {
      onPress?.(event);
    }
  };

  const styleCallback = ({ pressed }: { pressed: boolean }) => [
    props.style || {},
    changeOpacityOnPress
      ? { opacity: pressed && !disabled ? 0.5 : disabled ? 0.5 : 1 }
      : {},
  ];

  return (
    <PressableRaw
      onPress={handlePress}
      hitSlop={props.hitSlop}
      style={
        styleCallback as (
          state: PressableStateCallbackType
        ) => StyleProp<ViewStyle>
      }
      disabled={disabled}
    >
      {props.children}
    </PressableRaw>
  );
};

export default Pressable;
