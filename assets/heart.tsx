import React from "react";
import Svg, { Path } from "react-native-svg";

export const HeartSvg = ({ size = 48, fill = "#ff0000", ...props })  => (
	<Svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		{...props}
	>
		<Path fill={fill} stroke="#ff0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4c-3.2 0-5 2.667-5 4c0-1.333-1.8-4-5-4S3 6.667 3 8c0 7 9 12 9 12s9-5 9-12c0-1.333-.8-4-4-4" />
	</Svg>
)