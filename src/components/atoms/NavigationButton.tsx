import { FC } from 'react';
import { Pressable } from 'react-native';
import { SvgProps } from 'react-native-svg';

type NavigationButtonProps = {
  icon: FC<SvgProps>;
  onPress: () => void;
};

const NavigationButton = ({ icon: Icon, onPress }: NavigationButtonProps) => {
  return (
    <Pressable
      style={{
        position: 'absolute',
        left: 0,
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
