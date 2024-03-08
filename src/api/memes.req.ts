import type {
	Comment,
	Meme,
	MemeCommentPreview,
	MemeId,
	MemePreview,
	MemeSearchQuery,
	NewMemeCommentPayload,
	NewMemePayload,
} from '@api/memes.req.type';
import { client } from '@api/network/client';
import type { UserId } from '@api/user.req.type';
import { buildQueryString } from '@utils/string.helper';

export const retrieveMemeList = (query: MemeSearchQuery) => {
	return client.get<Array<Meme>>(`/memes?${buildQueryString(query)}`);
};

export const createMeme = (payload: NewMemePayload) => {
	return client.post<Meme>('/memes', payload);
};

export const createMemeComment = (id: MemeId, payload: NewMemeCommentPayload) => {
	return client.post<Comment>(`memes/comment/${id}`, payload);
};

export const toggleLike = (id: MemeId) => {
	return client.post<boolean>(`memes/like/${id}`, {});
};

export const retrieveUserMemeComments = (id: UserId) => {
	return client.get<MemeCommentPreview>(`memes/${id}/comments`, {});
};

export const retrieveUserMemeLikes = (id: UserId) => {
	return client.get<MemePreview>(`memes/${id}/likes`, {});
};

export const retrieveUserMemeCreated = (id: UserId) => {
	return client.get<MemePreview>(`memes/${id}/created`, {});
};
