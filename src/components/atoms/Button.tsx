import { colors } from '@utils/colors';
import { Text } from 'react-native';
import Pressable from './Pressable';

type ButtonProps = {
  onPress: () => void;
  title: string;
};

const Button = ({ onPress, title }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.checkBoxBorder,
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
