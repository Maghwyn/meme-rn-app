import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 16,
		margin: 8,
		borderRadius: 8,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	image: {
		width: '100%',
		height: 150,
		borderRadius: 8,
		marginBottom: 16,
	},
	detailsContainer: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
	},
	category: {
		fontSize: 16,
		color: 'gray',
	},
	likesCount: {
		fontSize: 14,
		color: 'green',
	},
	commentsCount: {
		fontSize: 14,
		color: 'blue',
	},
});
