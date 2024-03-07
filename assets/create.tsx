import React from "react";
import Svg, { Path } from "react-native-svg";

const CreateSvg = ({
    size = 50,
    fill = "black",
    stroke = "none",
    strokeWidth = 0,
    ...props
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        {...props}
    >
        <Path d="M25 2C12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23S37.683 2 25 2zm12 24H26v11h-2V26H13v-2h11V13h2v11h11v2z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </Svg>
);

export default CreateSvg;
