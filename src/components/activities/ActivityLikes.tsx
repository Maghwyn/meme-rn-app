import React from 'react';
import { ScrollView, Text } from 'react-native';

type ActivityLikesProps = {};

type ActivityLikes = {
	(props: ActivityLikesProps): React.JSX.Element;
};

const ActivityLikes: ActivityLikes = () => {
	return (
		<ScrollView>
			<Text>ActivityLikes</Text>
		</ScrollView>
	);
};

export default ActivityLikes;
