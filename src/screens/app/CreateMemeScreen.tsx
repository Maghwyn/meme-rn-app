import { createMeme } from '@api/memes.req';
import type { MemeCategory } from '@api/memes.req.type';
import { uploadFile } from '@api/upload.req';
import { useAppDispatch } from '@hooks/redux';
import type { AuthNavigation, AuthRoute } from '@navigations/types/navigation.type';
import { setNewMeme } from '@store/reducers/memesSlice';
import { isEmpty } from '@utils/string.helper';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

	// TODO: We need the categories
	// const categories: Array<Category> = ['Funny', 'Meme', 'Random'];

	const dispatch = useAppDispatch();

	const openImagePicker = async () => {
		if (isEmpty(title)) {
			// TODO: Toast, you must choose a title before uploading
			console.error('Title is tempty');
			return;
		}

		if (isEmpty(selectedCategory)) {
			// TODO: Toast, you must choose a category before uploading
			console.error('Category is tempty');
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
				// TODO: Toast
				console.log('User cancelled image picker');
				return;
			}

			if (response.errorMessage) {
				// TODO: Toast
				console.log('Image picker error: ', response.errorMessage);
				return;
			}

			setUploadState('loading');
			const metadata = response.assets![0];
			const formData = buildFormDataFrom(metadata);
			const uploaded = await tryUploadFile(formData);
			if (uploaded) {
				setUploadState('idling');
				setUplodadImage(metadata.uri as string);
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
				/>

				<Text style={styles.label}>Category</Text>
				<TextInput
					placeholder="Enter a category..."
					placeholderTextColor="gray"
					style={styles.input}
					value={selectedCategory}
					onChangeText={setSelectedCategory}
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
		backgroundColor: 'rgba(0,0,0,0.9)',
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
