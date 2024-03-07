import { signupUser } from '@api/auth.req';
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
	const [username, setUsername] = useState('');

	const handleSignup = async () => {
		try {
			const res = await signupUser({ username, email, password });
			if (res.status === 201) {
				navigation.navigate('Verification');
			}
		} catch (error) {
			console.log(error.response.error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Pseudo"
				value={username}
				onChangeText={setUsername}
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
		borderRadius: 10,
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
