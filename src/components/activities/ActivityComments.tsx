import React from 'react';
import { ScrollView, Text } from 'react-native';

type ActivityCommentsProps = {};

type ActivityComments = {
	(props: ActivityCommentsProps): React.JSX.Element;
};

const ActivityComments: ActivityComments = () => {
	return (
		<ScrollView>
			<Text>ActivityComments</Text>
		</ScrollView>
	);
};

export default ActivityComments;
