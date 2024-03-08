import CreateSvg from '@assets/create';
import HomeSvg from '@assets/home';
import ProfileSvg from '@assets/profile';
import NavigatorIcon from '@navigations/app/NavigatorIcon';
import TouchButton from '@navigations/app/TouchButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateMemeScreen from '@screens/app/CreateMemeScreen';
import FeedHomeScreen from '@screens/app/FeedHomeScreen';
import UserProfileScreen from '@screens/app/UserProfileScreen';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

const App = createBottomTabNavigator();

const AppNavigator = () => {
	const [keyboardStatus, setKeyboardStatus] = useState<boolean>();

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setTimeout(() => {
				setKeyboardStatus(true);
			}, 125);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardStatus(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	const getColor = (cnd: boolean) => {
		return cnd ? '#9c080b' : 'gray';
	};

	return (
		<App.Navigator
			screenOptions={({ route }) => {
				const shadow = route.name !== 'Feed' ? { ...styles.shadow } : {};

				return {
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarShowLabel: false,
					tabBarVisibilityAnimationConfig: {
						show: {
							animation: 'spring',
							config: {
								speed: 500,
							},
						},
					},
					tabBarStyle: {
						...styles.float,
						...shadow,
						display: keyboardStatus ? 'none' : 'flex',
						backgroundColor: route.name === 'HomeFeed' ? 'rgba(0,0,0,0.8)' : '#ffffff',
					},
				};
			}}
		>
			<App.Screen
				name="HomeFeed"
				// @ts-ignore Lib has shit types, unless we can extend in a .d.ts
				component={FeedHomeScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size }) => (
						<NavigatorIcon name={'Feed'} textColor={getColor(focused)}>
							<HomeSvg size={size} fill={getColor(focused)} />
						</NavigatorIcon>
					),
				}}
			/>
			<App.Screen
				name="CreateMeme"
				// @ts-ignore Lib has shit types, unless we can extend in a .d.ts
				component={CreateMemeScreen}
				options={({ navigation }) => ({
					headerShown: false,
					tabBarIcon: () => (
						<View style={{ backgroundColor: '#ffffff', borderRadius: 50 }}>
							<CreateSvg size={60} fill={getColor(true)} />
						</View>
					),
					tabBarButton: (props) => (
						<TouchButton {...props} onPress={() => navigation.navigate('CreateMeme')} />
					),
				})}
			/>
			<App.Screen
				name="UserProfile"
				// @ts-ignore Lib has shit types, unless we can extend in a .d.ts
				component={UserProfileScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size }) => (
						<NavigatorIcon name={'Profile'} textColor={getColor(focused)}>
							<ProfileSvg size={size} fill={getColor(focused)} />
						</NavigatorIcon>
					),
				}}
			/>
		</App.Navigator>
	);
};

const styles = StyleSheet.create({
	float: {
		position: 'absolute',
		bottom: 10,
		left: 10,
		right: 10,
		borderTopWidth: 0,
		elevation: 0,
		borderRadius: 15,
		height: 70,
	},
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});

export default AppNavigator;
