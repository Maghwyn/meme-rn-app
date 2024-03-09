import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
	HomeFeed: undefined;
	UserProfile: undefined;
};

export type AuthRoute = RouteProp<AuthStackParamList>;
export type AuthNavigation = StackNavigationProp<AuthStackParamList>;
