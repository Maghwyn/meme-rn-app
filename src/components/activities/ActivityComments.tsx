import type { MemeCommentPreview } from '@api/memes.req.type';
import FeedComment from '@components/FeedComment';
import React from 'react';
import { ScrollView } from 'react-native';

type ActivityCommentsProps = { memes: Array<MemeCommentPreview> };

type ActivityComments = {
	(props: ActivityCommentsProps): React.JSX.Element;
};

const ActivityComments: ActivityComments = ({ memes }) => {
	return (
		<ScrollView style={{ height: '70%' }}>
			{memes.map((meme) => {
				return meme.comments.map((item, index) => <FeedComment key={index} item={item} />);
			})}
		</ScrollView>
	);
};

export default ActivityComments;
