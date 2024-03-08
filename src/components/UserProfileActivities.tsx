import ActivityComments from '@components/activities/ActivityComments';
import ActivityLikes from '@components/activities/ActivityLikes';
import ActivityMemes from '@components/activities/ActivityMemes';
import UserProfileActivityButton from '@components/UserProfileActivityButton';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

type UserProfileActivitiesProps = {
	userId: string;
};

type UserProfileActivities = {
	(props: UserProfileActivitiesProps): React.JSX.Element;
};

enum ProfileTabFilter {
	MEMES,
	LIKES,
	COMMENTS,
}

const UserProfileActivities: UserProfileActivities = ({ userId }) => {
	const [filter, setFilter] = useState<ProfileTabFilter>(ProfileTabFilter.MEMES);
	console.log(userId);
	// TODO: Use the userId to fetch the memes, likes, comments from the filter

	return (
		<View style={styles.userActivity}>
			<View style={styles.viewTabButtons}>
				<UserProfileActivityButton
					name={'Memes'}
					active={filter === ProfileTabFilter.MEMES}
					onPress={() => setFilter(ProfileTabFilter.MEMES)}
				/>
				<UserProfileActivityButton
					name={'Likes'}
					active={filter === ProfileTabFilter.LIKES}
					onPress={() => setFilter(ProfileTabFilter.LIKES)}
				/>
				<UserProfileActivityButton
					name={'Comments'}
					active={filter === ProfileTabFilter.COMMENTS}
					onPress={() => setFilter(ProfileTabFilter.COMMENTS)}
				/>
			</View>
			<View>
				{filter === ProfileTabFilter.MEMES && <ActivityMemes />}
				{filter === ProfileTabFilter.LIKES && <ActivityLikes />}
				{filter === ProfileTabFilter.COMMENTS && <ActivityComments />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userActivity: {
		flexDirection: 'column',
		alignSelf: 'stretch',
		paddingHorizontal: 20,
		backgroundColor: 'rgba(220,220,220,1)',
		flex: 1,
		gap: 5,
	},
	viewTabButtons: {
		marginTop: 10,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'flex-start',
		gap: 5,
	},
});

export default UserProfileActivities;
