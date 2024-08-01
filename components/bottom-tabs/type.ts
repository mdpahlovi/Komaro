import { GestureResponderEvent } from 'react-native';

export type BottomTabBarItemProps = {
    label: string;
    focused: boolean;
    icon: (props: { focused: boolean; size: number; color: string }) => React.ReactNode;
    badge?: number | string;
    to?: string;
    onPress: (e: React.MouseEvent<HTMLElement, MouseEvent> | GestureResponderEvent) => void;
    onLongPress: (e: GestureResponderEvent) => void;
};
