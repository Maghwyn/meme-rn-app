import { StyleSheet, Text, View } from 'react-native';

type NavigatorIconProps = {
	name: string;
	textColor: string;
	children: React.ReactNode;
};

type NavigatorIcon = {
	(props: NavigatorIconProps): React.JSX.Element;
};

const NavigatorIcon: NavigatorIcon = ({ name, textColor, children }) => {
	return (
		<View style={{ ...styles.container }}>
			{children}
			<Text
				style={{
					color: textColor,
					textTransform: 'uppercase',
					...styles.text,
				}}
			>
				{name}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 12,
	},
});

export default NavigatorIcon;
