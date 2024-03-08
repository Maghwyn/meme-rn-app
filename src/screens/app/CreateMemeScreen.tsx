import { createMeme } from '@api/memes.req';
import type { Category } from '@api/memes.req.type';
import { uploadFile } from '@api/upload.req';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
	type Asset,
	type ImageLibraryOptions,
	launchImageLibrary,
} from 'react-native-image-picker';

type CreateMemeScreenProps = {
	navigation: any;
};

type CreateMemeScreen = {
	(props: CreateMemeScreenProps): React.JSX.Element;
};

const CreateMemeScreen: CreateMemeScreen = () => {
	const [title, setTitle] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<Category>();
	const [uploadedImage, setUplodadImage] = useState('');

	// const categories: Array<Category> = ['Funny', 'Meme', 'Random'];

	const openImagePicker = async () => {
		const options: ImageLibraryOptions = {
			mediaType: 'photo',
			includeBase64: false,
			maxHeight: 2000,
			maxWidth: 2000,
		};

		launchImageLibrary(options, async (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.errorMessage) {
				console.log('Image picker error: ', response.errorMessage);
			} else {
				const metadata = response.assets![0];
				const formData = buildFormDataFrom(metadata);
				await tryUploadFile(formData);
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
			const res = await uploadFile(formData);
			const upload = res.data;

			await createMeme({ title, category: selectedCategory, upload });
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
