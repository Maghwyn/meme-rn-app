export type User = {
	username: string;
	password: string;
	pictureUrl: string;
	backgroundUrl: string;
	bio: string;
};

export type UserIdQuery = {
	userId: string;
};
