import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { logoutUser, setAuthentication } from '@store/reducers/authSlice';
import { retrieveUserProfile } from '@store/reducers/userSlice';
import React from 'react';
import { Button, Image, ImageBackground, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

type UserProfileHeaderProps = {
	isOwner: boolean;
};

type UserProfileHeader = {
	(props: UserProfileHeaderProps): React.JSX.Element;
};

const UserProfileHeader: UserProfileHeader = ({ isOwner }) => {
	const dispatch = useAppDispatch();
	const userProfile = useAppSelector(retrieveUserProfile);

	const tryLogoutUser = () => {
		dispatch(logoutUser());
		dispatch(setAuthentication(false));
	};

	return (
		<>
			<View style={{ ...styles.containerThumbnail, ...styles.shadow }}>
				<ImageBackground
					source={{
						uri: userProfile?.backgroundUrl || 'https://i.imgflip.com/6gw7k6.jpg',
					}}
					style={styles.backgroundImage}
				>
					<Image
						source={{
							uri:
								userProfile?.pictureUrl ||
								'https://static.vecteezy.com/system/resources/previews/012/721/545/original/doge-meme-icon-free-vector.jpg',
						}}
						style={styles.avatar}
					/>
				</ImageBackground>
				{isOwner && (
					<View style={styles.logoutButton}>
						<Button title="Logout" onPress={tryLogoutUser} />
					</View>
				)}
			</View>
			<View style={styles.userInfo}>
				<Text style={styles.username}>{`@${userProfile?.username}`}</Text>
				<Text style={styles.userBio}>{userProfile?.bio}</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
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
});

export default UserProfileHeader;
