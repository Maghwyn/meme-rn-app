import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TouchButton = {
	(props: BottomTabBarButtonProps): React.JSX.Element;
};

const TouchButton: TouchButton = ({ children, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				...styles.touchable,
				...styles.shadow,
			}}
			onPress={() => (onPress !== undefined ? onPress : () => {})}
		>
			<View style={{ ...styles.view }}>{children}</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	touchable: {
		top: -35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	view: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});

export default TouchButton;
