import { activateUserAccount } from '@api/auth.req';
import { client } from '@api/network/client';
import { useAppDispatch } from '@hooks/redux';
import { setAuthentication, setToken } from '@store/reducers/authSlice';
import { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface VerificationScreenProps {
	navigation: {
		navigate: (screen: string) => void;
	};
}

export type VerificationScreen = {
	(props: VerificationScreenProps): React.JSX.Element;
};

const VerificationScreen: VerificationScreen = ({ navigation }) => {
	const dispatch = useAppDispatch();

	const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
	const codeInputs = useRef<Array<TextInput>>(Array(verificationCode.length).fill(null));

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackspace);
		return () => backHandler.remove();
	}, [verificationCode]);

	const handleVerification = async () => {
		try {
			const res = await activateUserAccount({ token: verificationCode.join('') });
			if (res.status === 200) {
				dispatch(setToken(res.data));
				dispatch(setAuthentication(true));
				client.defaults.headers.common.Authorization = `Bearer ${res.data}`;
				navigation.navigate('TabBar');
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	};

	const handleChangeText = (text: string, index: number) => {
		setVerificationCode((prevCode) => {
			const newCode = [...prevCode];
			handleEmptyInput(text, index, newCode, codeInputs);
			handleFilledInput(text, index, newCode, codeInputs);
			return newCode;
		});
	};

	const handleBackspace = () => {
		setVerificationCode((prevCode) => {
			const newCode = [...prevCode];
			handleBackspacePress(newCode, codeInputs);
			return newCode;
		});
		return true;
	};

	return (
		<View style={styles.container}>
			<View style={styles.codeInputContainer}>
				{verificationCode.map((digit, index) => (
					<TextInput
						key={index}
						ref={(input) => {
							if (input) {
								codeInputs.current[index] = input;
							}
						}}
						style={styles.codeInput}
						placeholder="0"
						value={digit}
						onChangeText={(text) => handleChangeText(text, index)}
						maxLength={1}
						placeholderTextColor="#B0B0B0"
					/>
				))}
			</View>
			<TouchableOpacity style={styles.verifyButton} onPress={handleVerification}>
				<Text style={styles.verifyText}>Verify code</Text>
			</TouchableOpacity>
			<Text style={styles.reSend} onPress={() => navigation.navigate('Signup')}>
				Renvoyer le code ?
			</Text>
		</View>
	);
};

const handleEmptyInput = (
	text: string,
	index: number,
	newCode: string[],
	codeInputs: React.MutableRefObject<TextInput[] | null[]>,
) => {
	if (text.length === 0 && index > 0) {
		newCode[index] = '';
		codeInputs.current[index - 1]?.focus();
	}
};

const handleFilledInput = (
	text: string,
	index: number,
	newCode: string[],
	codeInputs: React.MutableRefObject<TextInput[] | null[]>,
) => {
	if (text.length === 1 && index < 5) {
		newCode[index] = text;
		codeInputs.current[index + 1]?.focus();
	} else {
		newCode[index] = text;
	}
};

const handleBackspacePress = (
	newCode: string[],
	codeInputs: React.MutableRefObject<TextInput[] | null[]>,
) => {
	const lastIndex = newCode.length - 1;
	if (newCode[lastIndex] === '') {
		codeInputs.current[lastIndex - 1]?.focus();
	} else {
		newCode[lastIndex] = '';
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 16,
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	codeInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	codeInput: {
		height: 40,
		width: 40,
		borderColor: 'gray',
		borderWidth: 1,
		textAlign: 'center',
		color: 'lightgray',
		backgroundColor: 'black',
		borderRadius: 10,
	},
	verifyText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
	verifyButton: {
		marginTop: 30,
		backgroundColor: '#9c080b',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 12,
	},
	reSend: {
		textAlign: 'center',
		color: 'lightgray',
		margin: 20,
	},
});

export default VerificationScreen;
