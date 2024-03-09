import {
	retrieveUserMemeComments,
	retrieveUserMemeCreated,
	retrieveUserMemeLikes,
} from '@api/memes.req';
import type { MemeCommentPreview, MemePreview } from '@api/memes.req.type';
import ActivityComments from '@components/activities/ActivityComments';
import ActivityLikes from '@components/activities/ActivityLikes';
import ActivityMemes from '@components/activities/ActivityMemes';
import UserProfileActivityButton from '@components/UserProfileActivityButton';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
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

	const [userMemes, setUserMemes] = useState(Array<MemePreview>);
	const [userLikedMemes, setUserLikedMemes] = useState(Array<MemePreview>);
	const [userComments, setUserComments] = useState(Array<MemeCommentPreview>);

	const fetchUserMemes = useCallback(async () => {
		try {
			const res = await retrieveUserMemeCreated(userId);
			setUserMemes(res.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	}, [userId]);

	const fetchUserLikedMemes = useCallback(async () => {
		try {
			const res = await retrieveUserMemeLikes(userId);
			setUserLikedMemes(res.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	}, [userId]);

	const fetchUserComments = useCallback(async () => {
		try {
			const res = await retrieveUserMemeComments(userId);
			setUserComments(res.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
		}
	}, [userId]);

	useEffect(() => {
		if (filter === ProfileTabFilter.COMMENTS) {
			fetchUserComments();
		} else if (filter === ProfileTabFilter.MEMES) {
			fetchUserMemes();
		} else if (filter === ProfileTabFilter.LIKES) {
			fetchUserLikedMemes();
		}
	}, [filter, fetchUserComments, fetchUserMemes, fetchUserLikedMemes]);

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
			<View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
				{filter === ProfileTabFilter.MEMES && <ActivityMemes memes={userMemes} />}
				{filter === ProfileTabFilter.LIKES && <ActivityLikes likedMemes={userLikedMemes} />}
				{filter === ProfileTabFilter.COMMENTS && <ActivityComments memes={userComments} />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userActivity: {
		flexDirection: 'column',
		alignSelf: 'stretch',
		paddingHorizontal: 20,
		backgroundColor: 'rgba(0,0,0,0.4)',
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
