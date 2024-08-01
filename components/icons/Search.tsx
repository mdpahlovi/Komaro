import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export default function Search({ size = 20, color = 'black', ...props }: { size?: number; color?: string } & SvgProps) {
    return (
        <Svg width={20} height={20} viewBox="0 0 21 21" fill="none" font={{ fontSize: 40 }} {...props}>
            <Circle cx={9.76663} cy={9.76673} r={8.98856} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M16.018 16.485L19.542 20" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}
