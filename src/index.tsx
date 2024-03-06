// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import VerificationScreen from './screens/auth/VerificationScreen';
import FeedScreen from './screens/feed/feedScreen';

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

// type SectionProps = PropsWithChildren<{
// 	title: string;
// }>;

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// const checkLoginStatus = async () => {
		// 	try {
		// 		const isLoggedInValue = await AsyncStorage.getItem('token');
		// 		setIsLoggedIn(Boolean(isLoggedInValue));
		// 	} catch (error) {
		// 		console.error("Erreur lors de la récupération de l'état de connexion : ", error);
		// 	}
		// };
		setIsLoggedIn(false);
		//checkLoginStatus();
	}, []);

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

export default App;
