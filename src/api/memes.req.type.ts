import type { Upload } from '@api/upload.req.type';

export type Meme = {
	id: string;
	userId: string;
	title: string;
	username: string;
	category: string;
	upload: Upload;
	likes: Array<string>;
	comments: Array<Comment>;
	updatedAt: string;
	createdAt: string;
};

export type MemePreview = {
	id: string;
	userId: string;
	title: string;
	username: string;
	category: string;
	pictureUrl: string;
	commentsCount: number;
	likesCount: number;
};

export type MemeCommentPreview = MemePreview & {
	comments: Array<Comment>;
};

export type Comment = {
	pictureUrl: string;
	userId: string;
	username: string;
	content: string;
	createdAt: string;
};

export type MemeSearchQuery = {
	q?: string; // search query
	c?: string; // category
};

export type NewMemePayload = {
	title: string;
	category: string;
	upload: Upload;
};

export type NewMemeCommentPayload = {
	content: string;
};

export type MemeId = string;
export type MemeCategory = string;
