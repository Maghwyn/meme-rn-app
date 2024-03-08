import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type UserProfileActivityButtonProps = {
	name: string;
	active: boolean;
	onPress: () => void;
};

type UserProfileActivityButton = {
	(props: UserProfileActivityButtonProps): React.JSX.Element;
};

const UserProfileActivityButton: UserProfileActivityButton = ({ name, active, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				...styles.tabButton,
				backgroundColor: active ? '#9c080b' : 'rgba(240,240,240,1)',
			}}
			onPress={onPress}
		>
			<Text
				style={{
					...styles.tabText,
					color: active ? 'white' : 'gray',
				}}
			>
				{name}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	tabButton: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 2,
	},
	tabText: {
		textAlign: 'center',
		color: 'gray',
	},
});

export default UserProfileActivityButton;
