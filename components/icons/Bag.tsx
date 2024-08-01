import Svg, { Path, SvgProps } from 'react-native-svg';

function Bag({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={21} height={22} viewBox="0 0 21 22" fill="none" {...props}>
            <Path
                clipRule="evenodd"
                d="M14.514 20.5H6.166c-3.067 0-5.419-1.108-4.75-5.565l.777-6.041c.412-2.225 1.83-3.076 3.076-3.076h10.178c1.263 0 2.6.916 3.076 3.076l.778 6.04c.567 3.955-1.721 5.566-4.787 5.566z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.651 5.599a4.32 4.32 0 00-4.32-4.32v0a4.32 4.32 0 00-4.34 4.32h0M13.296 10.102h-.045M7.466 10.102H7.42"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default Bag;
