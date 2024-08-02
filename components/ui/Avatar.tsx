import { Image } from 'react-native';

export default function Avatar({ size }: { size: number }) {
    return (
        <Image
            style={{ width: size, height: size, borderRadius: size / 2, aspectRatio: 1 }}
            source={{ uri: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3' }}
        />
    );
}
