import { colors } from '@utils/colors';
import Pressable from './Pressable';
import Check from '@assets/icons/check.svg';
import CheckPurple from '@assets/icons/checkPurple.svg';

type CheckboxProps = {
  isChecked: boolean;
  isWhiteCheckbox?: boolean;
  onChange: () => void;
};

const Checkbox = ({
  isChecked,
  isWhiteCheckbox = false,
  onChange,
}: CheckboxProps) => {
  return (
    <Pressable
      style={{
        borderWidth: 1,
        width: 24,
        height: 24,
        borderRadius: 3,
        borderColor: colors.checkBoxBorder,
        backgroundColor: isChecked
          ? isWhiteCheckbox
            ? colors.white
            : colors.checkBoxBorder
          : colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onChange}
    >
      {isChecked && (isWhiteCheckbox ? <CheckPurple /> : <Check />)}
    </Pressable>
  );
};

export default Checkbox;
