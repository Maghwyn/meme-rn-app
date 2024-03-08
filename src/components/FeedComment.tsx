import type { Comment } from '@api/memes.req.type';
import { Image, StyleSheet, Text, View } from 'react-native';

type FeedCommentProps = {
	item: Comment;
};

type FeedComment = {
	(props: FeedCommentProps): React.JSX.Element;
};

const FeedComment: FeedComment = ({ item }) => {
	return (
		<View style={styles.commentItem}>
			<View style={styles.leftContainer}>
				<Image source={{ uri: item.pictureUrl }} style={styles.profileImage} />
			</View>
			<View style={styles.rightContainer}>
				<Text style={styles.username}>{item.username}</Text>
				<Text style={styles.createdAt}>{item.createdAt}</Text>
				<Text style={styles.commentText}>{item.content}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	commentItem: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: 'rgba(255,255,255, 0.2)',
		borderRadius: 10,
	},
	leftContainer: {
		marginRight: 10,
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	rightContainer: {
		flex: 1,
	},
	username: {
		fontWeight: 'bold',
	},
	createdAt: {
		color: 'rgba(200,200,200,0.7)',
		marginBottom: 5,
	},
	commentText: {
		fontSize: 16,
	},
});

export default FeedComment;
