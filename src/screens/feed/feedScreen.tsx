import { createMemeComment, retrieveMemeList } from '@api/memes.req';
import type { Comment, MemeSearchQuery } from '@api/memes.req.type';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { retrieveMemes, setMemes } from '@store/reducers/memesSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

interface FeedScreenProps {
	navigation: any;
}

export type FeedScreen = {
	(props: FeedScreenProps): React.JSX.Element;
};

const FeedScreen: FeedScreen = () => {
	const [newComment, setNewComment] = useState('');
	const [currentPhotoId, setCurrentPhotoId] = useState('');
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);

	const dispatch = useAppDispatch();
	// dispatch(setMemes([]))
	const memes = useAppSelector(retrieveMemes);

	useEffect(() => {
		const filterMemeList = async (query: MemeSearchQuery) => {
			try {
				const res = await retrieveMemeList(query);
				dispatch(setMemes(res.data));
			} catch (err) {
				console.error(err.response);
			}
		};
		filterMemeList({ c: 'test' });
	}, [dispatch]);

	const handleCommentPress = (id: string) => {
		setCurrentPhotoId(id);
		setIsBottomSheetVisible(true);
	};

	const commentsToDisplay = memes.find((meme) => meme.id === currentPhotoId)?.comments || [];
	console.log(commentsToDisplay);

	const renderCommentItem = ({ item }: { item: Comment }) => (
		<View style={styles.commentItem}>
			<Text>{item.content}</Text>
			<Text>{item.username}</Text>
		</View>
	);

	const handleAddComment = () => {
		if (newComment.trim() !== '') {
			const memeId = currentPhotoId;
			createMemeComment(memeId, { content: newComment });
			setNewComment('');
		}
	};

	const handleCloseSheet = () => {
		setIsBottomSheetVisible(false);
	};

	return (
		<View style={{ flex: 1 }}>
			<Swiper
				style={styles.wrapper}
				loop={false}
				showsPagination={false}
				horizontal={false}
				onIndexChanged={(index) => setCurrentPhotoId(memes[index].id)}
			>
				{memes.map((meme) => (
					<View key={meme.id} style={styles.slide}>
						<Image source={{ uri: meme.upload.url }} style={styles.image} />
						<View style={styles.overlay}>
							<View style={styles.infoContainer}>
								<Text style={styles.username}>{meme.username}</Text>
								<Text style={styles.title}>{meme.title}</Text>
								<Text style={styles.category}>{meme.category}</Text>
								<Text style={styles.date}>{meme.createdAt}</Text>
							</View>
							<TouchableOpacity
								onPress={() => handleCommentPress(meme.id)}
								style={styles.commentButton}
							>
								<Text style={styles.commentButtonText}>Comment</Text>
							</TouchableOpacity>
						</View>
					</View>
				))}
			</Swiper>
			{isBottomSheetVisible && (
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					snapPoints={['25%', '50%', '75%', '100%']}
				>
					<View style={styles.bottomSheetContent}>
						<View style={styles.addCommentContainer}>
							<TextInput
								placeholder="Add a comment..."
								value={newComment}
								onChangeText={(text) => setNewComment(text)}
								style={styles.commentInput}
							/>
							<TouchableOpacity onPress={handleAddComment}>
								<Text style={styles.addCommentButton}>Add</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress={handleCloseSheet} style={styles.closeButton}>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
						<View style={styles.addCommentContainer}>
							<BottomSheetFlatList
								data={commentsToDisplay}
								renderItem={renderCommentItem}
								keyExtractor={(item, index) => index.toString()}
							/>
						</View>
					</View>
				</BottomSheet>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
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

export default FeedScreen;
