import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 8,
		marginBottom: 16,
	},
	uploadButton: {
		backgroundColor: '#3498db',
		padding: 12,
		borderRadius: 5,
		alignItems: 'center',
		marginBottom: 16,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
		borderRadius: 5,
		marginBottom: 16,
	},
	imageView: {
		flex: 1,
	},
});
