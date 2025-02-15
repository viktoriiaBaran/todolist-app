import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import Pressable from '../atoms/Pressable';

type NavigationButtonProps = {
  icon: FC<SvgProps>;
  onPress: () => void;
  isRight?: boolean;
};

const NavigationButton = ({
  icon: Icon,
  isRight,
  onPress,
}: NavigationButtonProps) => {
  return (
    <Pressable
      style={{
        position: 'absolute',
        left: isRight ? undefined : 0,
        right: isRight ? 0 : undefined,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
      }}
      onPress={onPress}
    >
      <Icon width={24} height={24} />
    </Pressable>
  );
};

export default NavigationButton;
