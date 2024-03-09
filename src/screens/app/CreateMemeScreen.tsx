import { createMeme } from '@api/memes.req';
import type { MemeCategory } from '@api/memes.req.type';
import { uploadFile } from '@api/upload.req';
import { useAppDispatch } from '@hooks/redux';
import useToast from '@hooks/toast';
import type { AuthNavigation, AuthRoute } from '@navigations/types/navigation.type';
import { setNewMeme } from '@store/reducers/memesSlice';
import { isEmpty } from '@utils/string.helper';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
	type Asset,
	type ImageLibraryOptions,
	launchImageLibrary,
} from 'react-native-image-picker';
import LoaderKit from 'react-native-loader-kit';

type CreateMemeScreenProps = {
	navigation: AuthNavigation;
	route: AuthRoute;
};

type CreateMemeScreen = {
	(props: CreateMemeScreenProps): React.JSX.Element;
};

const CreateMemeScreen: CreateMemeScreen = ({ navigation }) => {
	const [title, setTitle] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<MemeCategory>('');
	const [uploadedImage, setUplodadImage] = useState('');
	const [uploadState, setUploadState] = useState<'loading' | 'idling'>('idling');

	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: 'twitter', value: 'twitter' },
		{ label: 'joke', value: 'joke' },
		{ label: 'cartoon', value: 'cartoon' },
		{ label: 'troll', value: 'troll' },
		{ label: 'cat', value: 'cat' },
		{ label: 'sport', value: 'sport' },
		{ label: 'music', value: 'music' },
		{ label: 'dev', value: 'dev' },
		{ label: 'anime', value: 'anime' },
		{ label: 'cinema', value: 'cinema' },
		{ label: 'animals', value: 'animals' },
	]);

	const { showToast } = useToast();

	// TODO: We need the categories
	// const categories: Array<Category> = ['Funny', 'Meme', 'Random'];

	const dispatch = useAppDispatch();

	const openImagePicker = async () => {
		if (isEmpty(title)) {
			showToast({ type: 'error', text1: 'Error', text2: 'Meme title must be not empty' });
			return;
		}

		if (isEmpty(selectedCategory)) {
			showToast({ type: 'error', text1: 'Error', text2: 'Meme category must be selected' });
			return;
		}

		const options: ImageLibraryOptions = {
			mediaType: 'photo',
			includeBase64: false,
			maxHeight: 2000,
			maxWidth: 2000,
		};

		launchImageLibrary(options, async (response) => {
			if (response.didCancel) {
				showToast({ type: 'info', text1: 'Info', text2: 'User cancelled image picker' });
				return;
			}

			if (response.errorMessage) {
				showToast({
					type: 'error',
					text1: 'Error',
					text2: `Image picker error: ${response.errorMessage}`,
				});
				return;
			}

			setUploadState('loading');
			const metadata = response.assets![0];
			const formData = buildFormDataFrom(metadata);
			const uploaded = await tryUploadFile(formData);
			if (uploaded) {
				setUploadState('idling');
				setUplodadImage(metadata.uri as string);
				showToast({
					type: 'success',
					text1: 'Success',
					text2: `Votre meme ${title} a été crée !`,
				});
			} else {
				showToast({
					type: 'success',
					text1: 'Success',
					text2: `Votre meme ${title} n'a pas pu être crée !`,
				});
			}
		});
	};

	const buildFormDataFrom = (metadata: Asset) => {
		const formData = new FormData();
		formData.append('file', {
			uri: metadata.uri,
			name: metadata.fileName,
			type: metadata.type,
		});

		return formData;
	};

	const tryUploadFile = async (formData: FormData) => {
		try {
			const upload = await uploadFile(formData);
			const meme = await createMeme({
				title,
				category: selectedCategory,
				upload: upload.data,
			});
			dispatch(setNewMeme(meme.data));
			return true;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
				showToast({
					type: 'error',
					text1: 'Error',
					text2: `Failed to upload meme file: ${error.response?.data}`,
				});
			}
			return false;
		}
	};

	useEffect(() => {
		const unsubscribeBlur = navigation.addListener('blur', () => {
			setTitle('');
			setSelectedCategory('');
			setUplodadImage('');
			setUploadState('idling');
		});

		// Necessary to trigger blur
		const unsubscribeFocus = navigation.addListener('focus', () => {});

		return () => {
			unsubscribeBlur();
			unsubscribeFocus();
		};
	}, [navigation, setTitle, setSelectedCategory, setUplodadImage, setUploadState]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Upload a new meme !</Text>
			<View style={styles.formContainer}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					placeholder="Enter a title..."
					placeholderTextColor="gray"
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					autoCapitalize="none"
				/>

				<Text style={styles.label}>Category</Text>
        <DropDownPicker
					open={open}
					value={selectedCategory}
					items={items}
					setOpen={setOpen}
					setValue={setSelectedCategory}
					setItems={setItems}
					placeholder={'Choose a category'}
				/>
			</View>

			<TouchableOpacity onPress={openImagePicker} style={styles.uploadButton}>
				<Text style={styles.buttonText}>Create your meme !</Text>
			</TouchableOpacity>

			{uploadedImage && (
				<View style={styles.previewContainer}>
					<Text style={styles.preview}>Preview</Text>
					<Image
						source={{ uri: uploadedImage }}
						style={styles.imageView}
						resizeMode="cover"
					/>
				</View>
			)}
			{uploadState === 'loading' && (
				<LoaderKit
					style={{ width: '75%', height: '75%', alignSelf: 'center' }}
					name={'BallClipRotatePulse'}
					color={'#9c080b'}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	formContainer: {
		padding: 16,
		paddingBottom: 26,
	},
	previewContainer: {
		flex: 1,
		borderTopColor: 'gray',
		borderTopWidth: 1,
		gap: 10,
		marginBottom: 100,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 8,
		color: 'gray',
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		paddingTop: 20,
		color: 'gray',
		textAlign: 'center',
	},
	preview: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingTop: 20,
		color: 'gray',
	},
	input: {
		height: 40,
		borderColor: 'gray',
		color: 'gray',
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		marginRight: 8,
	},
	uploadButton: {
		backgroundColor: '#9c080b',
		padding: 12,
		borderRadius: 5,
		alignItems: 'center',
		marginBottom: 16,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
		borderRadius: 5,
		marginBottom: 16,
	},
	imageView: {
		flex: 1,
	},
});

export default CreateMemeScreen;
