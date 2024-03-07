import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateMemeScreen from '@screens/meme/CreateMemeScreen';
import UserProfileScreen from '@screens/profile/UserProfileScreen';
import ProfileSvg from 'assets/profile';
import React from 'react';

import CreateSvg from '../../../assets/create';
import HomeSvg from '../../../assets/home';
import FeedScreen from '../../screens/feed/feedScreen';

const Tab = createBottomTabNavigator();

const TabBar = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, size }) => {
					let iconComponent;

					if (route.name === 'Feed') {
						iconComponent = <HomeSvg size={size} fill={focused ? 'blue' : 'black'} />;
					} else if (route.name === 'CreateMeme') {
						iconComponent = <CreateSvg size={size} fill={focused ? 'blue' : 'black'} />;
					} else if (route.name === 'UserProfile') {
						iconComponent = (
							<ProfileSvg size={size} fill={focused ? 'blue' : 'black'} />
						);
					}

					return iconComponent;
				},
			})}
		>
			<Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
			<Tab.Screen
				name="CreateMeme"
				component={CreateMemeScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="UserProfile"
				component={UserProfileScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};

export default TabBar;
