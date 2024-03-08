import type { MemePreview } from '@api/memes.req.type';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { styles } from './ActivityMemeUsersStyle';

type ActivityLikesProps = {
	likedMemes: Array<MemePreview>;
};

type ActivityLikes = {
	(props: ActivityLikesProps): React.JSX.Element;
};

const ActivityLikes: ActivityLikes = ({ likedMemes }) => {
	return (
		<ScrollView style={{ height: '70%' }}>
			{likedMemes.map((meme) => (
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

export default ActivityLikes;
