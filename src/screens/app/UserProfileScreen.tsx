import { getUserById } from '@api/user.req';
import UserProfileActivities from '@components/UserProfileActivities';
import UserProfileHeader from '@components/UserProfileHeader';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import type { AuthNavigation, AuthRoute } from '@navigations/types/navigation.type';
import {
	resetUserProfile,
	retrieveUser,
	retrieveUserProfileId,
	setUserProfileData,
	willViewUserProfileOf,
} from '@store/reducers/userSlice';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

type UserProfileScreenProps = {
	navigation: AuthNavigation;
	route: AuthRoute;
};

type UserProfileScreen = {
	(props: UserProfileScreenProps): React.JSX.Element;
};

const UserProfileScreen: UserProfileScreen = ({ navigation }) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(retrieveUser);
	const profileUserId = useAppSelector(retrieveUserProfileId);

	useEffect(() => {
		const unsubscribeBlur = navigation.addListener('blur', () => {
			if (profileUserId === userData.id) return;
			dispatch(resetUserProfile());
		});

		const unsubscribeFocus = navigation.addListener('focus', () => {
			const getUserByIdRequest = async (userIdParam: string) => {
				try {
					const res = await getUserById(userIdParam);
					dispatch(setUserProfileData(res.data));
				} catch (error) {
					if (error instanceof AxiosError) {
						console.log(error.response?.data);
					}
				}
			};

			if (profileUserId && profileUserId !== userData.id) {
				getUserByIdRequest(profileUserId);
			} else if (profileUserId === '') {
				// Act as a clone to bind our own page data with the page of any user
				dispatch(setUserProfileData({ ...userData }));
				dispatch(willViewUserProfileOf(userData.id!));
			}
		});

		return () => {
			unsubscribeBlur();
			unsubscribeFocus();
		};
	}, [dispatch, navigation, userData, profileUserId]);

	return (
		<View style={styles.container}>
			<UserProfileHeader isOwner={profileUserId === userData.id} />
			<UserProfileActivities userId={profileUserId || (userData.id as string)} />
		</View>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
});

export default UserProfileScreen;
