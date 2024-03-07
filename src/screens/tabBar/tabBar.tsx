import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateMemeScreen from '@screens/meme/CreateMemeScreen';
import React from 'react';

import CreateSvg from './../../../assets/create';
import HomeSvg from './../../../assets/home';
import ProfileSvg from './../../../assets/profile';
import FeedScreen from './../feed/feedScreen';
import ProfileScreen from './../profile/profileScreen';

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
					} else if (route.name === 'Profile') {
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
			<Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
		</Tab.Navigator>
	);
};

export default TabBar;
