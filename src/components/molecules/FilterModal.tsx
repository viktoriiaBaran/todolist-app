import { View } from 'react-native';
import FilterIcon from '@assets/icons/filter.svg';
import { Checkbox, Text } from '@components/atoms';
import { colors } from '@utils/colors';
import { CATEGOGIES, CATEGORY_STYLES, SCREEN_WIDTH } from '@utils/contants';
import CategoryButton from './CategoryButton';

type FilterModalProps = {
  completeStatus: string[];
  setCompleteStatus: (status: string[]) => void;
  category: string[];
  setCategory: (category: string[]) => void;
};

const FilterModal = ({
  completeStatus,
  setCompleteStatus,
  category,
  setCategory,
}: FilterModalProps) => {
  const handleCategoryPress = (cat: string) => {
    if (category.includes(cat)) {
      setCategory(category.filter((item) => item !== cat));
      return;
    }
    setCategory([...category, cat]);
  };

  const handleCompleteStatusPress = (status: string) => {
    if (completeStatus.includes(status)) {
      setCompleteStatus(completeStatus.filter((item) => item !== status));
      return;
    }
    setCompleteStatus([...completeStatus, status]);
  };

  return (
    <View
      style={{
        borderRadius: 24,
        padding: 12,
        backgroundColor: colors.lavenderMist,
        width: SCREEN_WIDTH - 32,
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <FilterIcon />
        <Text variant="filterTitle" style={{ color: colors.checkBoxBorder }}>
          Filter
        </Text>
      </View>
      <View style={{ flexDirection: 'column', gap: 12 }}>
        <Text variant="filterTitle">Category</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {CATEGOGIES.map((item) => {
            const { icon: Icon, backgroundColor } = CATEGORY_STYLES[item];

            return (
              <CategoryButton
                key={item}
                icon={Icon}
                backgroundColor={backgroundColor}
                item={item}
                category={category}
                onPress={handleCategoryPress}
              />
            );
          })}
        </View>
      </View>
      <View style={{ flexDirection: 'column', gap: 12 }}>
        <Text variant="filterTitle">Complete status</Text>
        <View>
          <View
            style={{
              padding: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>Done</Text>
            <Checkbox
              isWhiteCheckbox
              isChecked={completeStatus.includes('done')}
              onChange={() => handleCompleteStatusPress('done')}
            />
          </View>
          <View
            style={{
              padding: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>Undone</Text>
            <Checkbox
              isWhiteCheckbox
              isChecked={completeStatus.includes('undone')}
              onChange={() => handleCompleteStatusPress('undone')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterModal;
