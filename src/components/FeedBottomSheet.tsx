import { createMemeComment } from '@api/memes.req';
import type { Comment } from '@api/memes.req.type';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { retrieveMemeComments, setNewCommment } from '@store/reducers/memesSlice';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type FeedBottomSheetProps = {
	visible: boolean;
	memeId: string;
	onClose: () => void;
};

type FeedBottomSheet = {
	(props: FeedBottomSheetProps): React.JSX.Element;
};

const FeedBottomSheet: FeedBottomSheet = ({ visible, memeId, onClose }) => {
	const [newComment, setNewComment] = useState('');
	const bottomSheetRef = useRef<BottomSheet>(null);
	const dispatch = useAppDispatch();

	const comments = useAppSelector((state) => retrieveMemeComments(state, memeId));

	const renderCommentItem = ({ item }: { item: Comment }) => (
		<View style={styles.commentItem}>
			<Text>{item.content}</Text>
			<Text>{item.username}</Text>
		</View>
	);

	const handleAddComment = async () => {
		if (newComment.trim() !== '') {
			try {
				const res = await createMemeComment(memeId, { content: newComment });
				dispatch(setNewCommment({ id: memeId, comment: res.data }));
				setNewComment('');
			} catch (error) {
				if (error instanceof AxiosError) {
					console.error(error.response?.data);
				}
			}
		}
	};

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={0}
			snapPoints={['25%', '50%', '75%', '100%']}
			style={{ display: visible ? 'flex' : 'none' }}
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
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Text style={styles.closeButtonText}>Close</Text>
				</TouchableOpacity>
				<View style={styles.addCommentContainer}>
					<BottomSheetFlatList
						data={comments}
						renderItem={renderCommentItem}
						keyExtractor={(_, index) => index.toString()}
					/>
				</View>
			</View>
		</BottomSheet>
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

export default FeedBottomSheet;
