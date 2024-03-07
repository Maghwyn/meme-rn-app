import { loginUser } from '@api/auth.req';
import { client } from '@api/network/client';
import { useAppDispatch } from '@hooks/redux';
import { setAuthentication, setToken } from '@store/reducers/authSlice';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LoginScreenProps {
	navigation: any;
}

export type LoginScreen = {
	(props: LoginScreenProps): React.JSX.Element;
};

const LoginScreen: LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const handleLogin = async () => {
		try {
			const res = await loginUser({ email, password });
			if (res.status === 200) {
				dispatch(setToken(res.data));
				dispatch(setAuthentication(true));
				client.defaults.headers.post.Authorization = `Bearer ${res.data}`;
				navigation.navigate('Feed');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<View style={styles.logoWrapper}>
					<Image source={require('./../../../assets/icon.png')} style={styles.logo} />
				</View>
			</View>
			<Text style={styles.title}>Connectez-vous</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				placeholderTextColor="#B0B0B0"
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				placeholderTextColor="#B0B0B0"
			/>
			<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
				<Text style={styles.loginButtonText}>Connexion</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
				<Text style={styles.signupText}>Créer un compte</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		backgroundColor: 'black',
	},
	logoContainer: {
		marginBottom: 20,
	},
	logoWrapper: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'red',
	},
	logo: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 2,
		borderColor: 'red',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
		color: 'white',
	},
	input: {
		height: 40,
		width: '100%',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
		color: 'white',
	},
	loginButton: {
		backgroundColor: 'black',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 12,
		borderColor: 'white',
		borderWidth: 2,
	},
	loginButtonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
	signupText: {
		marginTop: 16,
		color: 'white',
		textAlign: 'center',
	},
});

export default LoginScreen;
