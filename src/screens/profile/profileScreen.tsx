import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Profile Screen</Text>
			{/* Ajoutez ici le contenu de votre page de profil */}
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
