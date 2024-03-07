import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'black',
	},
	slide: {
		flex: 1,
	},
	image: {
		flex: 1,
		height: '100%',
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		padding: 16,
	},
	commentButton: {
		backgroundColor: 'white',
		padding: 8,
		borderRadius: 8,
		alignItems: 'center',
	},
	commentButtonText: {
		color: 'black',
	},
	infoContainer: {
		justifyContent: 'flex-start',
		maxWidth: '70%',
	},
	username: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 4,
	},
	category: {
		fontSize: 16,
		color: 'white',
		marginBottom: 4,
	},
	date: {
		fontSize: 14,
		color: 'white',
		marginBottom: 4,
	},
	bottomSheetContent: {
		backgroundColor: 'white',
		padding: 16,
	},
	commentItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	addCommentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
	},
	commentInput: {
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		marginRight: 8,
	},
	addCommentButton: {
		color: 'blue',
		fontSize: 16,
		fontWeight: 'bold',
	},
	closeButton: {
		marginTop: 16,
		backgroundColor: 'red',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	closeButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	bottomSheetMessage: {
		backgroundColor: 'black',
		flex: 1,
		width: 100,
		height: 100,
		flexDirection: 'column',
	},
});
