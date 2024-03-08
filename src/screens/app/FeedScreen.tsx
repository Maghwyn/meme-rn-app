import { retrieveMemeList, toggleLike } from '@api/memes.req';
import type { MemeSearchQuery } from '@api/memes.req.type';
import type { Upload } from '@api/upload.req.type';
import FeedBottomSheet from '@components/FeedBottomSheet';
import FeedOverlay from '@components/FeedOverlay';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { retrieveMemes, setMemes, setNewLike } from '@store/reducers/memesSlice';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Swiper from 'react-native-swiper';

interface FeedScreenProps {
	navigation: any;
}

type FeedScreen = {
	(props: FeedScreenProps): React.JSX.Element;
};

const FeedScreen: FeedScreen = () => {
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [currentMemeId, setCurrentMemeId] = useState('');

	const dispatch = useAppDispatch();
	const memes = useAppSelector(retrieveMemes);

	// TODO: Is called only once
	useEffect(() => {
		const filterMemeList = async (query: MemeSearchQuery) => {
			try {
				const res = await retrieveMemeList(query);
				dispatch(setMemes(res.data));
			} catch (error) {
				if (error instanceof AxiosError) {
					console.error(error.response?.data);
				}
			}
		};
		filterMemeList({ c: 'test' });
	}, [dispatch]);

	const onClose = () => {
		setIsBottomSheetVisible(false);
	};

	const onCommentPress = (id: string) => {
		setCurrentMemeId(id);
		setIsBottomSheetVisible(true);
	};

	const onLikePress = async (id: string) => {
		try {
			const res = await toggleLike(id);
			// TODO: Fix randomId
			dispatch(
				setNewLike({
					id,
					liked: res.data,
					userId: 'random ID' /** Retrieve from user store */,
				}),
			);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error.response?.data);
			}
		}
	};

	const onDownloadPress = async (upload: Upload) => {
		if (Platform.OS !== 'ios') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'Storage Permission Required',
						message: 'App needs access to your storage to download Photos',
						buttonPositive: 'cool !',
					},
				);

				if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
					return;
				}
			} catch (err) {
				// To handle permission related exception
				console.warn(err);
			}
		}

		ReactNativeBlobUtil.config({ fileCache: true })
			.fetch('GET', upload.url)
			.then(async (res) => {
				// TODO: Add toast
				// in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
				// whereas in android, the download manager is handling the download for us.
				if (Platform.OS === 'ios') {
					ReactNativeBlobUtil.ios.openDocument(res.data);
				} else {
					await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
						{
							name: upload.name,
							parentFolder: '/Memes', // it will store the file in this path
							mimeType: 'image/webp',
						},
						'Download', // Media Collection to store the file in ("Audio" | "Image" | "Video" | "Download")
						res.path(),
					);
				}
				// TODO: Add toast
			})
			.catch((err) => console.log('BLOB ERROR -> ', JSON.stringify(err)));
	};

	return (
		<View style={{ flex: 1 }}>
			<Swiper
				style={styles.wrapper}
				loop={false}
				showsPagination={false}
				horizontal={false}
				onIndexChanged={(index) => setCurrentMemeId(memes[index].id)}
			>
				{memes.map((meme) => (
					<View key={meme.id} style={styles.slide}>
						<Image source={{ uri: meme.upload.url }} style={styles.image} />
						<FeedOverlay
							title={meme.title}
							username={meme.username}
							category={meme.category}
							createdAt={meme.createdAt}
							liked={meme.likes.includes(meme.id)}
							onCommentPress={() => onCommentPress(meme.id)}
							onLikePress={() => onLikePress(meme.id)}
							onDownloadPress={() => onDownloadPress(meme.upload)}
						/>
					</View>
				))}
			</Swiper>
			<FeedBottomSheet
				visible={isBottomSheetVisible}
				memeId={currentMemeId}
				onClose={onClose}
			/>
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
