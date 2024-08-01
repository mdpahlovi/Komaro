import Svg, { Path, SvgProps } from 'react-native-svg';

function Plus({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
            <Path d="M5 1.327v7.327M8.667 4.99H1.333" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}

export default Plus;
