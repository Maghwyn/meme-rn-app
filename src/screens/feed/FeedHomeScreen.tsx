import { createMemeComment, retrieveMemeList } from '@api/memes.req';
import type { Comment, MemeSearchQuery } from '@api/memes.req.type';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { retrieveMemes, setMemes } from '@store/reducers/memesSlice';
import { retrieveUser, setAnotherUserId } from '@store/reducers/userSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { styles } from './FeedHomeStyle';

interface FeedScreenProps {
	navigation: any;
}

export type FeedScreen = {
	(props: FeedScreenProps): React.JSX.Element;
};

const FeedScreen: FeedScreen = ({ navigation }) => {
	const [newComment, setNewComment] = useState('');
	const [currentPhotoId, setCurrentPhotoId] = useState('');
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);

	const dispatch = useAppDispatch();
	const userData = useAppSelector(retrieveUser);

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

	const navigateAnotherUserProfile = (userId: string) => {
		if (userId !== userData.value.id) {
			dispatch(setAnotherUserId(userId));
			navigation.navigate('UserProfile');
		}
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
								<TouchableOpacity
									onPress={() => navigateAnotherUserProfile(meme.userId)}
								>
									<Text style={styles.username}>{meme.username}</Text>
								</TouchableOpacity>

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

export default FeedScreen;
