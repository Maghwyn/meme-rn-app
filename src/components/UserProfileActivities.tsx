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
import useToast from '@hooks/toast';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
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

	const { showToast } = useToast();

	useEffect(() => {
		const fetchUserMemes = async () => {
			try {
				const res = await retrieveUserMemeCreated(userId);
				setUserMemes(res.data);
			} catch (error) {
				if (error instanceof AxiosError) {
					console.log(error.response?.data);
				}
				showToast({
					type: 'error',
					text1: 'Fetch Error',
					text2: 'Failed to fetch user memes. Please try again.',
				});
			}
		};
		const fetchUserLikedMemes = async () => {
			try {
				const res = await retrieveUserMemeLikes(userId);
				setUserLikedMemes(res.data);
			} catch (error) {
				if (error instanceof AxiosError) {
					console.log(error.response?.data);
				}
				showToast({
					type: 'error',
					text1: 'Fetch Error',
					text2: 'Failed to fetch user liked memes. Please try again.',
				});
			}
		};
		const fetchUserComments = async () => {
			try {
				const res = await retrieveUserMemeComments(userId);
				setUserComments(res.data);
			} catch (error) {
				if (error instanceof AxiosError) {
					console.log(error.response?.data);
				}
				showToast({
					type: 'error',
					text1: 'Fetch Error',
					text2: 'Failed to fetch user comments. Please try again.',
				});
			}
		};
		fetchUserMemes();
		fetchUserLikedMemes();
		fetchUserComments();
	}, [showToast, userId]);

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
