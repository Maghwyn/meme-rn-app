import React from 'react';
import { ScrollView, Text } from 'react-native';

type ActivityMemesProps = {};

type ActivityMemes = {
	(props: ActivityMemesProps): React.JSX.Element;
};

const ActivityMemes: ActivityMemes = () => {
	return (
		<ScrollView>
			<Text>ActivityMemes</Text>
		</ScrollView>
	);
};

export default ActivityMemes;
