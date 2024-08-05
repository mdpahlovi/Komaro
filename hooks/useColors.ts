import { useTheme } from '@react-navigation/native';
import Color from 'color';

export function useColors() {
    const { colors } = useTheme();

    return { ...colors, textLight: Color(colors?.text).alpha(0.75).toString(), textLighter: Color(colors?.text).alpha(0.5).toString() };
}
