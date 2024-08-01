import Svg, { Path, SvgProps } from 'react-native-svg';

function Profile({ size = 20, color = 'black', ...props }: { size?: number } & SvgProps) {
    return (
        <Svg width={16} height={20} viewBox="0 0 16 20" fill="none" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.294 5.291A5.274 5.274 0 018 10.583a5.275 5.275 0 01-5.294-5.292A5.274 5.274 0 018 .001a5.273 5.273 0 015.294 5.29zM8 20.001c-4.338 0-8-.706-8-3.426s3.685-3.4 8-3.4c4.339 0 8 .704 8 3.424C16 19.32 12.315 20 8 20z"
                fill={color}
            />
        </Svg>
    );
}

export default Profile;
