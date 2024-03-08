import type { MemePreview } from '@api/memes.req.type';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 16,
		margin: 8,
		borderRadius: 8,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	image: {
		width: '100%',
		height: 150,
		borderRadius: 8,
		marginBottom: 16,
	},
	detailsContainer: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
	},
	category: {
		fontSize: 16,
		color: 'gray',
	},
	likesCount: {
		fontSize: 14,
		color: 'green',
	},
	commentsCount: {
		fontSize: 14,
		color: 'blue',
	},
});
export default ActivityMemes;
