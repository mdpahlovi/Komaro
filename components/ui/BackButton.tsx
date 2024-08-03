import { useTheme } from '@react-navigation/native';
import { ArrowLeft } from 'components/icons';
import { useRouter } from 'expo-router';

import Button from './Button';

export default function BackButton() {
    const { back } = useRouter();
    const { colors } = useTheme();

    return (
        <Button iconButton onPress={back}>
            <ArrowLeft color={colors.text} />
        </Button>
    );
}
