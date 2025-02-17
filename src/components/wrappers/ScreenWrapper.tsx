import { View } from 'react-native';
import Ellipse1 from '@assets/ellipse1.svg';
import Ellipse2 from '@assets/ellipse2.svg';

interface ScreenWrapperProps extends React.PropsWithChildren<{}> {
  whiteFlex: number;
  purpleFlex: number;
  topElipse1?: number;
}

const ScreenWrapper = ({
  children,
  purpleFlex,
  whiteFlex,
  topElipse1 = 0,
}: ScreenWrapperProps) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        position: 'relative',
      }}
    >
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <View
          style={{
            flex: purpleFlex,
            backgroundColor: '#4A3780',
          }}
        />
        <View
          style={{
            flex: whiteFlex,
            backgroundColor: '#F1F5F9',
          }}
        />
        <View style={{ position: 'absolute', top: topElipse1, left: 0 }}>
          <Ellipse1 />
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <Ellipse2 />
        </View>
      </View>
      {children}
    </View>
  );
};

export default ScreenWrapper;
