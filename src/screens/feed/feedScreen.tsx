import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FeedProps {
	navigation: any;
}

const FeedScreen: React.FC<FeedProps> = ({ navigation }) => {
	const [commentsVisible, setCommentsVisible] = useState(false);
	const [comments, setComments] = useState<string[]>([]);
	const [newComment, setNewComment] = useState('');

	const data = [
		require('./../../../assets/icon.png'),
		require('./../../../assets/icon.png'),
		require('./../../../assets/icon.png'),
		require('./../../../assets/icon.png'),
		require('./../../../assets/icon.png'),
	];

	const handleLikePress = () => {};

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

	const renderItem = ({ item }: { item: string }) => (
		<View style={styles.container}>
			<Image source={item} style={styles.image} />

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
						renderItem={({ item }) => <Text style={styles.commentText}>{item}</Text>}
						keyExtractor={(item, index) => index.toString()}
					/>
					<TextInput
						placeholder="Add a comment..."
						style={styles.input}
						value={newComment}
						onChangeText={(text) => setNewComment(text)}
					/>
					<TouchableOpacity style={styles.addCommentButton} onPress={handleCommentSubmit}>
						<Text style={styles.addCommentButtonText}>Add Comment</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.closeButton} onPress={handleCloseComments}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 8,
		padding: 8,
		marginVertical: 8,
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
});

export default FeedScreen;
