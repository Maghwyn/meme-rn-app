import { client } from '@api/network/client';
import { getMe } from '@api/user.req';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import AppNavigator from '@navigations/app/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/auth/LoginScreen';
import SignupScreen from '@screens/auth/SignupScreen';
import VerificationScreen from '@screens/auth/VerificationScreen';
import { getToken, isAuth, setAuthentication } from '@store/reducers/authSlice';
import { setUserData } from '@store/reducers/userSlice';
import { setupStore } from '@store/store';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = setupStore();

const Stack = createStackNavigator();

const App = () => {
	const token = useAppSelector(getToken);
	const isLoggedIn = useAppSelector(isAuth);
	const dispatch = useAppDispatch();

	if (token) {
		client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	useEffect(() => {
		const checkLoginStatus = async () => {
			if (!token) {
				dispatch(setAuthentication(false));
				return;
			}

			client.defaults.headers.common.Authorization = `Bearer ${token}`;
			try {
				const res = await getMe();
				dispatch(setUserData(res.data));
			} catch (error) {
				if (error instanceof AxiosError) {
					console.error(error.response?.data);
				}
				dispatch(setAuthentication(false));
			}
		};

		checkLoginStatus();
	}, [token, dispatch]);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isLoggedIn ? 'TabBar' : 'Login'}
				screenOptions={{ headerShown: false }}
			>
				{isLoggedIn ? (
					<Stack.Screen
						name="TabBar"
						component={AppNavigator}
						options={{
							gestureEnabled: false,
						}}
					/>
				) : (
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Signup" component={SignupScreen} />
						<Stack.Screen name="Verification" component={VerificationScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const AppProvider = () => {
	return (
		<Provider store={store}>
			<PersistGate
				loading={
					<View
						style={{
							flex: 1,
							alignSelf: 'stretch',
							height: '100%',
							backgroundColor: 'rgba(0,0,0,0.8)',
							justifyContent: 'center',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<LoaderKit
							style={{ width: '50%', height: '50%', alignSelf: 'center' }}
							name={'BallClipRotatePulse'}
							color={'#9c080b'}
						/>
					</View>
				}
				persistor={persistor}
			>
				<App />
			</PersistGate>
		</Provider>
	);
};

export default AppProvider;
