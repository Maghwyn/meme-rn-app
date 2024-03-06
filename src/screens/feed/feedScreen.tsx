import React, { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FeedProps {
	navigation: any;
}

const FeedScreen: React.FC<FeedProps> = ({ navigation }) => {
	const [commentsVisible, setCommentsVisible] = useState(false);
	const [comments, setComments] = useState<string[]>([]);
	const [newComment, setNewComment] = useState('');
	const flatListRef = useRef<FlatList | null>(null);

	const data = [
		'./../../../assets/icon.png',
		'./../../../assets/icon.png',
		'./../../../assets/icon.png',
		'./../../../assets/icon.png',
		'./../../../assets/icon.png',
		'./../../../assets/icon.png',
	];

	const handleLikePress = () => {
		// Gérer l'action du bouton "like" ici
	};

	const handleCommentPress = () => {
		setCommentsVisible(true);
	};

	const handleCloseComments = () => {
		setCommentsVisible(false);
	};

	const handleCommentSubmit = () => {
		if (newComment.trim() !== '') {
			setComments((prevComments) => [...prevComments, newComment]);
			setNewComment('');
		}
	};

	const renderItem = ({ item, index }: { item: string; index: number }) => (
		<View style={styles.container}>
			<Image source={{ uri: item }} style={styles.image} />
			<View style={styles.overlay}>
				<View style={styles.actionsContainer}>
					<TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
						<Text style={styles.actionButtonText}>Like</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
						<Text style={styles.actionButtonText}>Comment</Text>
					</TouchableOpacity>
				</View>

				{commentsVisible && (
					<View style={styles.commentsContainer}>
						<FlatList
							data={comments}
							renderItem={({ item }) => (
								<Text style={styles.commentText}>{item}</Text>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
						<TextInput
							placeholder="Add a comment..."
							style={styles.input}
							value={newComment}
							onChangeText={(text) => setNewComment(text)}
						/>
						<TouchableOpacity
							style={styles.addCommentButton}
							onPress={handleCommentSubmit}
						>
							<Text style={styles.addCommentButtonText}>Add Comment</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.closeButton} onPress={handleCloseComments}>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			showsVerticalScrollIndicator={false}
			pagingEnabled
			ref={(ref) => (flatListRef.current = ref)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	actionButton: {
		backgroundColor: 'white',
		padding: 8,
		borderRadius: 8,
		alignItems: 'center',
	},
	actionButtonText: {
		color: 'black',
	},
	commentsContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		padding: 16,
	},
	commentText: {
		color: 'white',
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 8,
		padding: 8,
		marginVertical: 8,
		color: 'white',
	},
	addCommentButton: {
		backgroundColor: 'black',
		padding: 8,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	addCommentButtonText: {
		color: 'white',
	},
	closeButton: {
		backgroundColor: 'black',
		padding: 8,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	closeButtonText: {
		color: 'white',
	},
});

export default FeedScreen;
