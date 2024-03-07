import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	containerThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		padding: 20,
	},
	backgroundImage: {
		width: '100%',
		// borderRadius: 100,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 100,
		backgroundColor: 'grey',
		alignSelf: 'center',
		marginTop: 80,
		marginBottom: -40,
	},
	userInfo: {
		marginTop: 30,
		alignItems: 'center',
	},
	username: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	userBio: {
		marginBottom: 5,
		textAlign: 'center',
	},
	viewTabButtons: {
		marginTop: 10,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
	},
});
