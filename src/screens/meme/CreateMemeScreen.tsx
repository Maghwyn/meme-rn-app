import { createMeme } from '@api/memes.req';
import type { Category } from '@api/memes.req.type';
import { uploadFile } from '@api/upload.req';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import { styles } from './CreateMemeScreenStyle';

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

		launchImageLibrary(options, async (response: ImagePickerResponse) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('Image picker error: ', response.error);
			} else {
				const formData = buildFormDataFrom(response);
				await tryUploadFile(formData);
				let imageUri = response.uri || response.assets?.[0]?.uri;
				setUplodadImage(imageUri);
			}
		});
	};

	const buildFormDataFrom = (res: ImagePickerResponse) => {
		const metadata = res.assets[0];
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

			// TODO: You need to append the upload to the payload to create the meme
			await createMeme({ title, category: selectedCategory, upload });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err.response);
				console.error(err.response.error);
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

export default CreateMemeScreen;
