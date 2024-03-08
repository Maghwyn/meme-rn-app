import { createMeme } from '@api/memes.req';
import type { MemeCategory } from '@api/memes.req.type';
import { uploadFile } from '@api/upload.req';
import { useAppDispatch } from '@hooks/redux';
import type { AuthNavigation, AuthRoute } from '@navigations/types/navigation.type';
import { setNewMeme } from '@store/reducers/memesSlice';
import { isEmpty } from '@utils/string.helper';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
	type Asset,
	type ImageLibraryOptions,
	launchImageLibrary,
} from 'react-native-image-picker';

type CreateMemeScreenProps = {
	navigation: AuthNavigation;
	route: AuthRoute;
};

type CreateMemeScreen = {
	(props: CreateMemeScreenProps): React.JSX.Element;
};

const CreateMemeScreen: CreateMemeScreen = () => {
	const [title, setTitle] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<MemeCategory>('');
	const [uploadedImage, setUplodadImage] = useState('');

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

			const metadata = response.assets![0];
			const formData = buildFormDataFrom(metadata);
			await tryUploadFile(formData);
			setUplodadImage(metadata.uri as string);
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
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Title</Text>
			<TextInput
				style={styles.input}
				value={title}
				onChangeText={setTitle}
				placeholder="Enter title"
			/>

			<Text style={styles.label}>Category</Text>
			<TextInput
				style={styles.input}
				value={selectedCategory}
				onChangeText={setSelectedCategory}
				placeholder="Enter Category"
			/>
			{/* <Picker
				selectedValue={selectedCategory}
				onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
			>
				{categories.map((category: Category) => {
					return (
						<Picker.Item label={category.categoryName} value={category.categoryName} />
					);
				})}
			</Picker> */}

			<TouchableOpacity onPress={openImagePicker} style={styles.uploadButton}>
				<Text style={styles.buttonText}>Upload Image</Text>
			</TouchableOpacity>

			{uploadedImage && (
				<Image
					source={{ uri: uploadedImage }}
					style={styles.imageView}
					resizeMode="contain"
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 8,
		marginBottom: 16,
	},
	uploadButton: {
		backgroundColor: '#3498db',
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
