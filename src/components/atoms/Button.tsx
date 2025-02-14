import { colors } from '@utils/colors';
import { Pressable, Text } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  title: string;
  bgColor?: string;
};

const Button = ({ onPress, title, bgColor }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: bgColor || colors.checkBoxBorder,
        padding: 16,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 700, color: colors.white }}>
        {title}
      </Text>
    </Pressable>
  );
};
export default Button;
