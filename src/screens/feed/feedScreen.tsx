import React, { useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

interface FeedScreenProps {
	navigation: any;
}

interface Photo {
	id: string;
	source: any;
}

export type FeedScreen = {
	(props: FeedScreenProps): React.JSX.Element;
};

const FeedScreen: FeedScreen = () => {
	const [commentsVisible, setCommentsVisible] = useState(false);
	const [comments, setComments] = useState<{ [id: string]: string[] }>({});
	const [newComment, setNewComment] = useState('');
	const [currentPhotoId, setCurrentPhotoId] = useState('');

	const data: Photo[] = [
		{ id: '1', source: require('./../../../assets/icon.png') },
		{ id: '2', source: require('./../../../assets/icon.png') },
		{ id: '3', source: require('./../../../assets/icon.png') },
		{ id: '4', source: require('./../../../assets/icon.png') },
		{ id: '5', source: require('./../../../assets/icon.png') },
	];

	const handleLikePress = () => {
		// Gérer l'action du bouton "like" ici
	};

	const handleCommentPress = (id: string) => {
		setCurrentPhotoId(id);
		setCommentsVisible(true);
	};

	const handleCloseComments = () => {
		setCommentsVisible(false);
	};

	const handleCommentSubmit = () => {
		if (newComment.trim() !== '') {
			setComments((prevComments) => ({
				...prevComments,
				[currentPhotoId]: [...(prevComments[currentPhotoId] || []), newComment],
			}));
			setNewComment('');
		}
	};

	return (
		<KeyboardAvoidingView
			enabled={true}
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'position' : undefined}
		>
			<Swiper
				style={styles.wrapper}
				loop={false}
				showsPagination={false}
				horizontal={false}
				onIndexChanged={(index) => setCurrentPhotoId(data[index].id)}
			>
				{data.map((photo) => (
					<View key={photo.id} style={styles.container}>
						<Image source={photo.source} style={styles.image} />

						<View style={styles.overlay}>
							<View style={styles.actionsContainer}>
								<TouchableOpacity
									style={styles.actionButton}
									onPress={handleLikePress}
								>
									<Text style={styles.actionButtonText}>Like</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.actionButton}
									onPress={() => handleCommentPress(photo.id)}
								>
									<Text style={styles.actionButtonText}>Comment</Text>
								</TouchableOpacity>
							</View>

							<Modal
								isVisible={commentsVisible}
								onBackdropPress={handleCloseComments}
								style={styles.modal}
								backdropOpacity={0}
							>
								<View style={styles.modalContent}>
									<View style={styles.row}>
										<TouchableOpacity
											style={styles.closeButton}
											onPress={handleCloseComments}
										>
											<Text style={styles.closeButtonText}>Close</Text>
										</TouchableOpacity>

										<TextInput
											placeholder="Add a comment..."
											style={styles.input}
											value={newComment}
											onChangeText={(text) => setNewComment(text)}
										/>

										<TouchableOpacity
											style={styles.sendButton}
											onPress={handleCommentSubmit}
										>
											<Text style={styles.sendButtonText}>Send</Text>
										</TouchableOpacity>
									</View>

									<ScrollView style={styles.commentsContainer}>
										{(comments[currentPhotoId] || []).map(
											(comment, commentIndex) => (
												<Text key={commentIndex} style={styles.commentText}>
													{comment}
												</Text>
											),
										)}
									</ScrollView>
								</View>
							</Modal>
						</View>
					</View>
				))}
			</Swiper>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		backgroundColor: 'black',
	},
	image: {
		flex: 1,
		width: '100%',
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
	modal: {
		margin: 0,
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: 'white',
		height: '50%',
		padding: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	input: {
		flex: 5,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 8,
		padding: 8,
		color: 'black',
		height: 50,
	},
	sendButton: {
		flex: 1,
		backgroundColor: 'black',
		padding: 8,
		borderRadius: 8,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sendButtonText: {
		color: 'white',
	},
	closeButton: {
		flex: 1,
		backgroundColor: 'black',
		padding: 8,
		borderRadius: 8,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeButtonText: {
		color: 'white',
	},
	commentsContainer: {
		maxHeight: '50%',
	},
	commentText: {
		color: 'black',
		marginBottom: 8,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		margin: 20,
		gap: 10,
	},
});

export default FeedScreen;
