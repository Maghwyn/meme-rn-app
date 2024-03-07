import type {
	Comment,
	Meme,
	MemeId,
	MemeSearchQuery,
	NewMemeCommentPayload,
	NewMemePayload,
} from '@api/memes.req.type';
import { client } from '@api/network/client';
import { buildQueryString } from '@utils/string.helper';

export const retrieveMemeList = (query: MemeSearchQuery) => {
	return client.get<Array<Meme>>(`/memes?${buildQueryString(query)}`);
};

export const createMeme = (payload: NewMemePayload) => {
	return client.post<Meme>('/meme', payload);
};

export const createMemeComment = (id: MemeId, payload: NewMemeCommentPayload) => {
	return client.post<Comment>(`meme/comment/${id}`, payload);
};
