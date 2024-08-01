import { Text, Button } from 'components/ui';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <Text variant="heading">This screen doesn't exist.</Text>
            <Link href="/">
                <Button variant="primary">Go to home screen</Button>
            </Link>
        </SafeAreaView>
    );
}
