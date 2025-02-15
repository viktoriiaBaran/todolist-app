import { Pressable, Text } from '@components/atoms';
import { colors } from '@utils/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ANIMATION_DURATION = 200;
const CANCEL_BUTTON_WIDTH = 65;

const AnimatedInput = ({
  placeholder,
  value,
  onChangeText,
  onCancel,
  autoFocus,
  icon,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onCancel: () => void;
  autoFocus: boolean;
  icon: {
    component: React.ReactNode;
    size: number;
  };
}) => {
  const inputWidth = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonDisplay = useSharedValue<'none' | 'flex' | 'contents'>('none');
  const containerWidth = useRef(0);
  const inputRef = useRef<TextInput>(null);
  const [isWidthCalculated, setIsWidthCalculated] = useState(false);

  const calculateInputWidth = () => containerWidth.current;

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    inputWidth.value = withTiming(
      containerWidth.current - CANCEL_BUTTON_WIDTH,
      {
        duration: ANIMATION_DURATION,
      }
    );
    buttonOpacity.value = withTiming(1, { duration: ANIMATION_DURATION });
    buttonDisplay.value = 'flex';
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!value?.length) {
      inputWidth.value = withTiming(calculateInputWidth(), {
        duration: ANIMATION_DURATION,
      });
      buttonOpacity.value = withTiming(0, { duration: ANIMATION_DURATION });
      buttonDisplay.value = 'none';
    }
  };

  const handleCancel = () => {
    onChangeText?.('');
    onCancel?.();
    inputRef?.current?.blur();
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const onLayout = (event: LayoutChangeEvent) => {
    containerWidth.current = event.nativeEvent.layout.width;
    inputWidth.value = calculateInputWidth();
    setIsWidthCalculated(true);
  };

  const animatedInputStyle = useAnimatedStyle(() => ({
    width: isWidthCalculated ? inputWidth.value : '100%',
  }));

  const animatedCancelButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    display: buttonDisplay.value,
  }));

  return (
    <View
      onLayout={onLayout}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Animated.View style={[animatedInputStyle]}>
        <TextInput
          ref={inputRef}
          style={{
            height: 40,
            backgroundColor: colors.softMist,
            paddingHorizontal: 10,
            borderRadius: 15,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
      <Animated.View style={[animatedCancelButtonStyle]}>
        <Pressable onPress={handleCancel} style={{ marginLeft: 10 }}>
          <Text variant="button" style={{ color: colors.white }}>
            Cancel
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default AnimatedInput;
