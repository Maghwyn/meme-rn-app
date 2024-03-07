import React from "react";
import Svg, { Path } from "react-native-svg";

const ProfileSvg = ({ size = 48, fill = "#26e07f", ...props }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        {...props}
    >
        <Path d="M24.5 4C14.794 4 9 9.421 9 18.5v3.521c-1.253.928-2 2.38-2 3.979a5.009 5.009 0 0 0 3.838 4.863C12.833 38.767 18.026 44 24 44c5.974 0 11.167-5.233 13.162-13.137A5.009 5.009 0 0 0 41 26a4.9 4.9 0 0 0-2-3.963V20.5c0-1.452-.294-2.747-.586-3.682a3.088 3.088 0 0 0 1.324-1.45 3.03 3.03 0 0 0-.035-2.536C37.02 7.22 31.478 4 24.5 4zm-5.04 11.645C21.21 16.655 24.554 18 30 18c2.128 0 4.024-.184 5.506-.424.232.706.494 1.751.494 2.924v2.379c0 .579.332 1.105.855 1.353C37.561 24.567 38 25.245 38 26a2 2 0 0 1-1.941 1.998 1.5 1.5 0 0 0-1.588 1.188C33.01 36.142 28.706 41 24 41s-9.012-4.858-10.47-11.813A1.502 1.502 0 0 0 11.942 28 2.003 2.003 0 0 1 10 26a1.96 1.96 0 0 1 1.143-1.781c.523-.248.857-.777.857-1.356v-2.63c3.17-.776 5.332-2.479 5.414-2.546a11.198 11.198 0 0 0 1.736-1.652c.111-.134.215-.264.309-.389l.002-.001zM19 24a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4z" fill={fill} />
    </Svg>
);

export default ProfileSvg;
