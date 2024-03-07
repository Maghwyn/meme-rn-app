// App.tsx
import { client } from '@api/network/client';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken, isAuth, setAuthentication } from '@store/reducers/authSlice';
import { setupStore } from '@store/store';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import TabBar from './components/tabBar/TabBar';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import VerificationScreen from './screens/auth/VerificationScreen';

const { store, persistor } = setupStore();

const Stack = createStackNavigator();
/*

// TODO: To initialize the store, you need to call :
const { store, persistor } = setupStore();
<Provider store={store}>
	<PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
		<View></View>
	</PersistGate>
</Provider>

// TODO: To retrieve the data :
import { useAppSelector } from '@hooks/redux';
import { retrieveUsername } from '@store/reducers/userSlice';
const username = useAppSelector(retrieveUsername);

// TODO: To dispatch the data :
import { useAppDispatch } from '@hooks/redux';
import { setUsername } from '@store/reducers/userSlice';
const dispatch = useAppDispatch();
dispatch(serUsername("bob"));
*/

const App = () => {
	const token = useAppSelector(getToken);
	const isLoggedIn = useAppSelector(isAuth);
	const dispatch = useAppDispatch();

	console.log('token', token);
	if (token) {
		client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	useEffect(() => {
		const checkLoginStatus = async () => {
			if (token) {
				client.defaults.headers.common.Authorization = `Bearer ${token}`;
			} else {
				dispatch(setAuthentication(false));
			}
		};
		checkLoginStatus();
	});

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isLoggedIn ? 'TabBar' : 'Login'}
				screenOptions={{ headerShown: false }}
			>
				{isLoggedIn ? (
					<Stack.Screen
						name="TabBar"
						component={TabBar}
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
			<PersistGate loading={<Text>Loading ....</Text>} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
};

export default AppProvider;
