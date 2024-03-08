import { DownloadSvg } from '@assets/download';
import { HeartSvg } from '@assets/heart';
import { MessageSvg } from '@assets/message';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

type FeedOverlayProps = {
	username: string;
	title: string;
	category: string;
	liked: boolean;
	createdAt: string;
	onCommentPress: () => void;
	onLikePress: () => void;
	onDownloadPress: () => void;
	onProfilePress: () => void;
};

type FeedOverlay = {
	(props: FeedOverlayProps): React.JSX.Element;
};

const FeedOverlay: FeedOverlay = ({
	username,
	title,
	category,
	liked,
	createdAt,
	onCommentPress,
	onLikePress,
	onDownloadPress,
	onProfilePress,
}) => {
	return (
		<View style={styles.overlay}>
			<LinearGradient
				colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.0)']} // Fades from black to transparent
				style={styles.gradiant}
			>
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.category}>Category: {category}</Text>
				</View>
			</LinearGradient>
			<View style={styles.container}>
				<View style={styles.infoContainer}>
					<TouchableOpacity onPress={onProfilePress}>
						<Text style={styles.username}>By {username}</Text>
					</TouchableOpacity>
					<Text style={styles.date}>{new Date(createdAt).toDateString()}</Text>
				</View>
				<View style={styles.actionContainer}>
					<TouchableOpacity onPress={onLikePress} style={styles.actionButton}>
						<HeartSvg size={34} fill={liked ? '#ff0000' : 'none'} />
					</TouchableOpacity>
					<TouchableOpacity onPress={onCommentPress} style={styles.actionButton}>
						<MessageSvg size={30} />
					</TouchableOpacity>
					<TouchableOpacity onPress={onDownloadPress} style={styles.actionButton}>
						<DownloadSvg size={30} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingBottom: 90,
		display: 'flex',
		flex: 1,
	},
	gradiant: {
		position: 'absolute',
		top: 0,
		alignSelf: 'stretch',
		width: '100%',
	},
	header: {
		alignSelf: 'stretch',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
		flex: 1,
		padding: 20,
		paddingHorizontal: 16,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flexGrow: 1,
		alignSelf: 'stretch',
		padding: 16,
	},
	infoContainer: {
		justifyContent: 'flex-start',
		maxWidth: '70%',
	},
	actionContainer: {
		flexDirection: 'column',
		gap: 20,
	},
	actionButton: {
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	username: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 4,
	},
	category: {
		fontSize: 16,
		color: 'white',
		marginBottom: 4,
	},
	date: {
		fontSize: 14,
		color: 'white',
		marginBottom: 4,
	},
});

export default FeedOverlay;
