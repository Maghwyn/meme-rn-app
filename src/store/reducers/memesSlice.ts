import type { Comment, Meme } from '@api/memes.req.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

interface MemeCommentPayload {
	id: string;
	comment: Comment;
}

interface MemeLikePayload {
	id: string;
	userId: string;
	liked: boolean;
}

export interface MemesState {
	value: Array<Meme>;
}

const initialState: MemesState = {
	value: [],
};

export const memesSlice = createSlice({
	name: 'memes',
	initialState,
	reducers: {
		setMemes: (state, action: PayloadAction<Array<Meme>>) => {
			state.value = action.payload;
		},
		setNewMeme: (state, action: PayloadAction<Meme>) => {
			state.value.push(action.payload);
		},
		setNewLike: (state, action: PayloadAction<MemeLikePayload>) => {
			const index = state.value.findIndex((meme) => meme.id === action.payload.id);
			if (index === -1) return;

			if (action.payload.liked) {
				state.value[index].likes.push(action.payload.userId);
			} else {
				const userIdIndex = state.value[index].likes.findIndex(
					(userId) => userId === action.payload.userId,
				);
				if (index === -1) return;
				state.value[index].likes.splice(userIdIndex, 1);
			}
		},
		setNewCommment: (state, action: PayloadAction<MemeCommentPayload>) => {
			const index = state.value.findIndex((meme) => meme.id === action.payload.id);
			if (index === -1) return;
			state.value[index].comments.push(action.payload.comment);
		},
	},
});

export const { setMemes, setNewMeme, setNewCommment, setNewLike } = memesSlice.actions;
export const retrieveMemes = (state: RootState) => state.memes.value;
export const retrieveMemeComments = (state: RootState, memeId: string) => {
	const meme = state.memes.value.find((m) => m.id === memeId);
	return meme ? meme.comments : [];
};
export default memesSlice.reducer;
