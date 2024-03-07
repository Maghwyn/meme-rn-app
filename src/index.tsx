// App.tsx
import { client } from '@api/network/client';
import { useAppSelector } from '@hooks/redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken, isAuth } from '@store/reducers/authSlice';
import { setupStore } from '@store/store';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import VerificationScreen from './screens/auth/VerificationScreen';
import FeedScreen from './screens/feed/feedScreen';

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

	useEffect(() => {
		const checkLoginStatus = async () => {
			if (token) {
				client.defaults.headers.post.Authorization = `Bearer ${token}`;
			}
		};
		checkLoginStatus();
	});

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isLoggedIn ? 'Feed' : 'Login'}
				screenOptions={{ headerShown: false }}
			>
				{isLoggedIn ? (
					<Stack.Screen
						name="Feed"
						component={FeedScreen}
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
