import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Filter({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={18} height={17} viewBox="0 0 18 17" fill="none" {...props}>
            <Path d="M7.33 13.593h-6.3M10.14 3.9h6.301" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <Path
                clipRule="evenodd"
                d="M5.726 3.846A2.355 2.355 0 003.363 1.5 2.355 2.355 0 001 3.846a2.355 2.355 0 002.363 2.347 2.355 2.355 0 002.363-2.347zM17 13.554a2.354 2.354 0 00-2.362-2.346 2.355 2.355 0 00-2.364 2.346 2.355 2.355 0 002.364 2.346A2.354 2.354 0 0017 13.554z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
