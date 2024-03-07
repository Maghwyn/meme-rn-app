import { getUserById } from '@api/user.req';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { setAuthentication, setToken } from '@store/reducers/authSlice';
import { getAnotherUserId, retrieveUser, setUserData } from '@store/reducers/userSlice';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Image, ImageBackground, Text, View } from 'react-native';
import UserProfilComments from 'src/components/user-profil/UserProfilComments';
import UserProfilLikedMemeLists from 'src/components/user-profil/UserProfilLikedMemeLists';
import UserProfilMemeLists from 'src/components/user-profil/UserProfilMemeLists';

import { styles } from './UserProfileStyle';

type UserProfileScreenProps = {
	navigation: any;
};

type UserProfileScreen = {
	(props: UserProfileScreenProps): React.JSX.Element;
};

const UserProfileScreen: UserProfileScreen = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(retrieveUser);
	const anotherUserId = useAppSelector(getAnotherUserId);
	const [filter, setFilter] = useState<'memes' | 'likedMemes' | 'comments'>('memes');

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
			console.log(`c'est moi ${userData.value.username}`);
		}
	}, [anotherUserId, dispatch, userData.value.id, userData.value.username]);

	return (
		<View style={styles.container}>
			<View style={styles.containerThumbnail}>
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
			</View>
			<View style={styles.userInfo}>
				<Text style={styles.username}>{`@${userData.value.username}`}</Text>
				<Text style={styles.userBio}>{userData.value.bio}</Text>
			</View>
			<Button title="Logout" onPress={logoutUser} />

			<View style={styles.viewTabButtons}>
				<Button title="Memes" onPress={() => setFilter('memes')} />
				<Button title="Likes" onPress={() => setFilter('likedMemes')} />
				<Button title="Comments" onPress={() => setFilter('comments')} />
			</View>

			{filter === 'memes' && <UserProfilMemeLists />}
			{filter === 'likedMemes' && <UserProfilLikedMemeLists />}
			{filter === 'comments' && <UserProfilComments />}
		</View>
	);
};
export default UserProfileScreen;
