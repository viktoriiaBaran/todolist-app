import { Pressable } from '@components/atoms';
import { colors } from '@utils/colors';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

type CategoryButtonProps = {
  icon: FC<SvgProps>;
  backgroundColor: string;
  item: string;
  category: string | string[];
  onPress: (item: string) => void;
};
const CategoryButton = ({
  icon: Icon,
  backgroundColor,
  item,
  category,
  onPress,
}: CategoryButtonProps) => {
  return (
    <Pressable
      key={item}
      onPress={() => onPress(item)}
      style={{
        borderWidth: 2,
        borderColor:
          (category as string) === item || category.includes(item)
            ? colors.checkBoxBorder
            : colors.white,
        backgroundColor,
        borderRadius: 50,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon />
    </Pressable>
  );
};

export default CategoryButton;
