import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeSvg = ({ size = 24, fill = "#000", stroke = "#FFF", backgroundColor = "transparent" }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        style={{ backgroundColor }}
    >
        <Path d="M39.5 43h-9a2.5 2.5 0 0 1-2.5-2.5v-9a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 6 40.5V21.413a7.502 7.502 0 0 1 2.859-5.893L23.071 4.321a1.503 1.503 0 0 1 1.857 0L39.142 15.52A7.499 7.499 0 0 1 42 21.411V40.5a2.5 2.5 0 0 1-2.5 2.5z"
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
        />
    </Svg>
);

export default HomeSvg;
