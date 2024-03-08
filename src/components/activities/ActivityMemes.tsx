import type { MemePreview } from '@api/memes.req.type';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { styles } from './ActivityMemeUsersStyle';

type ActivityMemesProps = {
	memes: Array<MemePreview>;
};

type ActivityMemes = {
	(props: ActivityMemesProps): React.JSX.Element;
};

const ActivityMemes: ActivityMemes = ({ memes }) => {
	return (
		<ScrollView style={{ height: '70%' }}>
			{memes.map((meme) => (
				<View key={meme.id} style={styles.cardContainer}>
					<Image source={{ uri: meme.pictureUrl }} style={styles.image} />
					<View style={styles.detailsContainer}>
						<Text style={styles.title}>{meme.title}</Text>
						<Text style={styles.category}>{meme.category}</Text>
						<Text style={styles.likesCount}>{`${meme.likesCount} Likes`}</Text>
					</View>
				</View>
			))}
		</ScrollView>
	);
};

export default ActivityMemes;
