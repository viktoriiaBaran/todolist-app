import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

const textStyles = {
  newTaskTitle: {
    fontSize: 14,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 15.4,
  },
  description: {
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 21,
  },
  title: {
    fontSize: 30,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  button: {
    fontSize: 17,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 22,
  },
} as const;

type TextVariant = keyof typeof textStyles;

interface CustomTextProps extends RNTextProps {
  variant?: TextVariant;
}

const Text: React.FC<CustomTextProps> = ({
  variant = 'description',
  style,
  children,
  ...props
}) => {
  return (
    <RNText style={[textStyles[variant], style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
