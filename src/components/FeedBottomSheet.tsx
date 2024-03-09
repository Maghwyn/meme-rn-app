import { createMemeComment } from '@api/memes.req';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { retrieveMemeComments, setNewCommment } from '@store/reducers/memesSlice';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FeedComment from './FeedComment';

type FeedBottomSheetProps = {
	visible: boolean;
	memeId: string;
	onClose: () => void;
	onRedirectToProfile: (userId: string) => void;
};

type FeedBottomSheet = {
	(props: FeedBottomSheetProps): React.JSX.Element;
};

const FeedBottomSheet: FeedBottomSheet = ({ visible, memeId, onClose, onRedirectToProfile }) => {
	const [newComment, setNewComment] = useState('');
	const bottomSheetRef = useRef<BottomSheet>(null);
	const dispatch = useAppDispatch();

	const comments = useAppSelector((state) => retrieveMemeComments(state, memeId));

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

	useEffect(() => {
		if (visible) {
			bottomSheetRef.current?.expand();
		} else {
			bottomSheetRef.current?.close();
			setNewComment('');
		}
	}, [visible]);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				enableTouchThrough={false}
				pressBehavior={'close'}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[],
	);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={['25%', '50%', '75%', '85%']}
			backdropComponent={renderBackdrop}
			enablePanDownToClose={false}
			enableContentPanningGesture={false}
			onClose={onClose}
			backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
		>
			<View style={styles.bottomSheetContent}>
				<View style={styles.addCommentContainer}>
					<TextInput
						placeholder="Add a new comment..."
						placeholderTextColor="gray"
						value={newComment}
						onChangeText={(text) => setNewComment(text)}
						onSubmitEditing={handleAddComment}
						style={styles.commentInput}
					/>
				</View>
				<View style={styles.addCommentContainer}>
					<Text style={styles.commentTitle}>Comments</Text>
				</View>
				<View style={styles.addCommentContainer}>
					<ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 350 }}>
						{comments.map((item, index) => (
							<FeedComment
								key={index}
								item={item}
								onRedirectToProfile={onRedirectToProfile}
							/>
						))}
					</ScrollView>
				</View>
			</View>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	bottomSheetContent: {
		padding: 16,
		paddingTop: 0,
	},
	commentItem: {
		backgroundColor: 'rgba(255,255,255, 0.2)',
		borderRadius: 10,
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
		color: 'gray',
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
	commentTitle: {
		color: 'gray',
		fontSize: 22,
		borderTopWidth: 1,
		borderTopColor: 'gray',
		width: '100%',
		paddingTop: 16,
	},
});

export default FeedBottomSheet;
