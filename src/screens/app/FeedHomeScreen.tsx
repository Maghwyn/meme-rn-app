import { retrieveMemeList, toggleLike } from '@api/memes.req';
import type { MemeSearchQuery } from '@api/memes.req.type';
import type { Upload } from '@api/upload.req.type';
import FeedBottomSheet from '@components/FeedBottomSheet';
import FeedOverlay from '@components/FeedOverlay';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import type { AuthNavigation, AuthRoute } from '@navigations/types/navigation.type';
import { retrieveMemes, setMemes, setNewLike } from '@store/reducers/memesSlice';
import { retrieveUser, willViewUserProfileOf } from '@store/reducers/userSlice';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Swiper from 'react-native-swiper';

interface FeedHomeScreenProps {
	navigation: AuthNavigation;
	route: AuthRoute;
}

type FeedHomeScreen = {
	(props: FeedHomeScreenProps): React.JSX.Element;
};

const FeedHomeScreen: FeedHomeScreen = ({ navigation }) => {
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [currentMemeId, setCurrentMemeId] = useState('');

	const dispatch = useAppDispatch();
	const memes = useAppSelector(retrieveMemes);
	const userData = useAppSelector(retrieveUser);

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
			dispatch(
				setNewLike({
					id,
					liked: res.data,
					userId: userData.id!,
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

	const navigateToAnotherUserProfile = async (userId: string) => {
		dispatch(willViewUserProfileOf(userId));
		navigation.navigate('UserProfile');
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
							liked={meme.likes.includes(userData.id!)}
							onCommentPress={() => onCommentPress(meme.id)}
							onLikePress={() => onLikePress(meme.id)}
							onDownloadPress={() => onDownloadPress(meme.upload)}
							onProfilePress={() => navigateToAnotherUserProfile(meme.userId)}
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
});

export default FeedHomeScreen;
