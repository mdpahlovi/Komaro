import Svg, { Path, SvgProps } from 'react-native-svg';

function Profile({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={16} height={20} viewBox="0 0 16 20" fill="none" {...props}>
            <Path
                clipRule="evenodd"
                d="M7.985 13.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                clipRule="evenodd"
                d="M7.985 10.006A4.596 4.596 0 103.389 5.41a4.58 4.58 0 004.563 4.596h.033z"
                stroke={color}
                strokeWidth={1.42857}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default Profile;
