import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CreateScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Create Screen</Text>
			{/* Ajoutez ici le contenu de votre page de création */}
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

export default CreateScreen;
