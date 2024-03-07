import type { Upload } from '@api/upload.req.type';

export type Meme = {
	id: string;
	title: string;
	username: string;
	category: string;
	upload: Upload;
	comments: Array<Comment>;
	updatedAt: string;
	createdAt: string;
};

export type Comment = {
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
