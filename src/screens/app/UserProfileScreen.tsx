import { getMe, getUserById } from '@api/user.req';
import UserProfilComments from '@components/user-profil/UserProfilComments';
import UserProfilLikedMemeLists from '@components/user-profil/UserProfilLikedMemeLists';
import UserProfilMemeLists from '@components/user-profil/UserProfilMemeLists';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import type { AuthNavigation, AuthRoute } from '@navigations/types/navigation.type';
import { setAuthentication, setToken } from '@store/reducers/authSlice';
import { retrieveUser, retrieveUserProfileId, setUserData } from '@store/reducers/userSlice';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Image, ImageBackground, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type UserProfileScreenProps = {
	navigation: AuthNavigation;
	route: AuthRoute;
};

type UserProfileScreen = {
	(props: UserProfileScreenProps): React.JSX.Element;
};

enum ProfileTabFilter {
	MEMES,
	LIKES,
	COMMENTS,
}

const UserProfileScreen: UserProfileScreen = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(retrieveUser);
	const anotherUserId = useAppSelector(retrieveUserProfileId);
	const [filter, setFilter] = useState<ProfileTabFilter>(ProfileTabFilter.MEMES);

	const logoutUser = () => {
		dispatch(setToken(undefined));
		dispatch(setAuthentication(false));
	};

	useEffect(() => {
		const getUserByIdRequest = async (userIdParam: string) => {
			try {
				const res = await getUserById(userIdParam);
				if (res.status === 200) {
					dispatch(setUserData(res.data));
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					console.log(error.response?.data);
				}
			}
		};
		if (anotherUserId !== undefined) {
			getUserByIdRequest(anotherUserId);
		} else {
			const getLoggedUserData = async () => {
				const res = await getMe();
				if (res.status === 200) {
					dispatch(setUserData(res.data));
				}
			};
			getLoggedUserData();
			console.log(`c'est moi ${userData.value.username}`);
		}
	}, [anotherUserId, dispatch, userData.value.id, userData.value.username]);

	return (
		<View style={styles.container}>
			<View style={{ ...styles.containerThumbnail, ...styles.shadow }}>
				<ImageBackground
					source={{ uri: userData.value.backgroundUrl }}
					style={styles.backgroundImage}
				>
					<Image
						source={{
							uri: userData.value.pictureUrl,
						}}
						style={styles.avatar}
					/>
				</ImageBackground>
				<View style={styles.logoutButton}>
					<Button title="Logout" onPress={logoutUser} />
				</View>
			</View>
			<View style={styles.userInfo}>
				<Text style={styles.username}>{`@${userData.value.username}`}</Text>
				<Text style={styles.userBio}>{userData.value.bio}</Text>
			</View>
			<View style={styles.userActivity}>
				<View style={styles.viewTabButtons}>
					<TouchableOpacity
						style={{
							...styles.tabButton,
							backgroundColor:
								filter === ProfileTabFilter.MEMES
									? '#9c080b'
									: 'rgba(240,240,240,1)',
						}}
						onPress={() => setFilter(ProfileTabFilter.MEMES)}
					>
						<Text
							style={{
								...styles.tabText,
								color: filter === ProfileTabFilter.MEMES ? 'white' : 'gray',
							}}
						>
							Memes
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							...styles.tabButton,
							backgroundColor:
								filter === ProfileTabFilter.LIKES
									? '#9c080b'
									: 'rgba(240,240,240,1)',
						}}
						onPress={() => setFilter(ProfileTabFilter.LIKES)}
					>
						<Text
							style={{
								...styles.tabText,
								color: filter === ProfileTabFilter.LIKES ? 'white' : 'gray',
							}}
						>
							Likes
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							...styles.tabButton,
							backgroundColor:
								filter === ProfileTabFilter.COMMENTS
									? '#9c080b'
									: 'rgba(240,240,240,1)',
						}}
						onPress={() => setFilter(ProfileTabFilter.COMMENTS)}
					>
						<Text
							style={{
								...styles.tabText,
								color: filter === ProfileTabFilter.COMMENTS ? 'white' : 'gray',
							}}
						>
							Comments
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					{filter === ProfileTabFilter.MEMES && <UserProfilMemeLists />}
					{filter === ProfileTabFilter.LIKES && <UserProfilLikedMemeLists />}
					{filter === ProfileTabFilter.COMMENTS && <UserProfilComments />}
				</View>
			</View>
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
