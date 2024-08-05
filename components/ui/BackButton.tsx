import { ArrowLeft } from 'components/icons';
import { useRouter } from 'expo-router';
import { useColors } from 'hooks/useColors';

import Button from './Button';

export default function BackButton() {
    const { back } = useRouter();
    const { text } = useColors();

    return (
        <Button iconButton onPress={back}>
            <ArrowLeft color={text} />
        </Button>
    );
}
