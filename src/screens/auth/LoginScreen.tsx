import { loginUser } from '@api/auth.req';
import { client } from '@api/network/client';
import { useAppDispatch } from '@hooks/redux';
import useToast from '@hooks/toast';
import { setAuthentication, setToken } from '@store/reducers/authSlice';
import { AxiosError } from 'axios';
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
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useAppDispatch();

	const { showToast } = useToast();

	const handleLogin = async () => {
		try {
			const res = await loginUser({ email, password });
			if (res.status === 200) {
				dispatch(setToken(res.data));
				dispatch(setAuthentication(true));
				client.defaults.headers.common.Authorization = `Bearer ${res.data}`;
				showToast({
					type: 'success',
					text1: 'Login Success !',
				});
				navigation.navigate('TabBar');
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<View style={styles.logoWrapper}>
					<Image
						source={require('./../../../assets/logo-remove.png')}
						style={styles.logo}
					/>
				</View>
			</View>
			<Text style={styles.title}>Login</Text>
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
			<TouchableOpacity style={{ margin: 5 }} onPress={() => setShowPassword(!showPassword)}>
				<Text style={{ fontWeight: 'bold' }}>
					{showPassword ? 'Hide the password' : 'Show the password'}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
				<Text style={styles.loginButtonText}>Connect</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
				<Text style={styles.signupText}>I want to create an account</Text>
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
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	logoContainer: {
		marginBottom: 20,
	},
	inputContainer: {
		display: 'flex',
		alignSelf: 'stretch',
		flexDirection: 'column',
		paddingBottom: 10,
	},
	logoWrapper: {
		width: 150,
		height: 150,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 250,
		height: 250,
		borderRadius: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
		color: 'lightgray',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 8,
		color: 'gray',
		alignSelf: 'flex-start',
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
	loginButton: {
		marginTop: 30,
		backgroundColor: '#9c080b',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 12,
	},
	loginButtonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
	signupText: {
		marginTop: 16,
		color: 'lightgray',
		textAlign: 'center',
	},
});

export default LoginScreen;
