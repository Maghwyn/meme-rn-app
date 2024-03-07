import { useAppDispatch } from '@hooks/redux';
import { setAuthentication, setToken } from '@store/reducers/authSlice';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
	const dispatch = useAppDispatch();

	const logoutUser = () => {
		dispatch(setToken(undefined));
		dispatch(setAuthentication(false));
	};

	return (
		<View style={styles.container}>
			<Text>Profile Screen</Text>
			<Button title="Logout" onPress={logoutUser} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ProfileScreen;
