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
	},
	containerThumbnail: {
		position: 'relative',
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		height: 142.5,
		marginBottom: 20,
	},
	logoutButton: {
		position: 'absolute',
		bottom: -60,
		right: 20,
	},
	backgroundImage: {
		width: '100%',
		alignSelf: 'stretch',
		borderBottomColor: 'lightgray',
		borderBottomWidth: 3,
	},
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 50,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3.5,
		elevation: 30,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 100,
		backgroundColor: 'grey',
		alignSelf: 'center',
		marginTop: 80,
		marginBottom: -40,
		borderColor: 'lightgray',
		borderWidth: 3,
	},
	userInfo: {
		marginTop: 30,
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 30,
	},
	username: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
		color: 'gray',
	},
	userBio: {
		marginBottom: 5,
		textAlign: 'center',
		color: 'gray',
	},
	userActivity: {
		flexDirection: 'column',
		alignSelf: 'stretch',
		paddingHorizontal: 20,
		backgroundColor: 'rgba(220,220,220,1)',
		flex: 1,
		gap: 5,
	},
	viewTabButtons: {
		marginTop: 10,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'flex-start',
		gap: 5,
	},
	tabButton: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 2,
	},
	tabText: {
		textAlign: 'center',
		color: 'gray',
	},
});

export default UserProfileScreen;
