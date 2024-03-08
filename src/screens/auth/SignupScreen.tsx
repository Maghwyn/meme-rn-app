import { signupUser } from '@api/auth.req';
import { AxiosError } from 'axios';
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
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign in as a new user</Text>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Your username</Text>
				<TextInput
					placeholder="jhon.doe"
					placeholderTextColor="gray"
					style={styles.input}
					value={username}
					autoCapitalize="none"
					onChangeText={setUsername}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Your email</Text>
				<TextInput
					placeholder="jhon.doe@gmail.com"
					placeholderTextColor="gray"
					style={styles.input}
					value={email}
					autoCapitalize="none"
					onChangeText={setEmail}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Your password</Text>
				<TextInput
					placeholder="**********"
					placeholderTextColor="gray"
					style={styles.input}
					value={password}
					secureTextEntry
					autoCapitalize="none"
					onChangeText={setPassword}
				/>
			</View>
			<TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
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
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 8,
		color: 'gray',
		alignSelf: 'flex-start',
	},
	inputContainer: {
		display: 'flex',
		alignSelf: 'stretch',
		flexDirection: 'column',
		paddingBottom: 10,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		color: 'lightgray',
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		marginRight: 8,
		width: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
		color: 'lightgray',
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
	signupButton: {
		marginTop: 30,
		backgroundColor: '#9c080b',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 12,
	},
	back: {
		textAlign: 'center',
		color: 'white',
		margin: 20,
	},
});

export default SignupScreen;
