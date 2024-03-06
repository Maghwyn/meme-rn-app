import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SignupScreenProps {
	navigation: {
		navigate: (screen: string) => void;
	};
}

export type SignupScreen = {
	(props: SignupScreenProps): React.JSX.Element;
};

const SignupScreen: SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [pseudo, setPseudo] = useState('');

	const handleSignup = () => {
		navigation.navigate('Verification');
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Speudo"
				value={pseudo}
				onChangeText={setPseudo}
				placeholderTextColor="#B0B0B0"
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				placeholderTextColor="#B0B0B0"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				placeholderTextColor="#B0B0B0"
			/>
			<TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
				<Text style={styles.signupText}>Créer un compte</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 16,
		backgroundColor: 'black',
	},
	input: {
		height: 40,
		borderColor: 'white',
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
		color: 'white',
	},
	button: {
		backgroundColor: 'black',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 12,
		borderColor: 'white',
		borderWidth: 2,
	},
	signupText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
	loginButton: {
		backgroundColor: 'black',
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 2,
		margin: 20,
	},
	back: {
		textAlign: 'center',
		color: 'white',
		margin: 20,
	},
});

export default SignupScreen;
