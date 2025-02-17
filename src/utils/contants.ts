import Calendar from '@assets/icons/calendar.svg';
import File from '@assets/icons/file.svg';
import Trophy from '@assets/icons/trophy.svg';
import { Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const BOTTOM_INSET = 22;
export const TOP_INSET = 28;

export const CATEGORY_STYLES: Record<
  string,
  { icon: any; backgroundColor: string }
> = {
  file: {
    icon: File,
    backgroundColor: '#DBECF6',
  },
  sport: {
    icon: Trophy,
    backgroundColor: '#FEF5D3',
  },
  event: {
    icon: Calendar,
    backgroundColor: '#E7E2F3',
  },
};

export const CATEGOGIES = ['file', 'sport', 'event'];
