import type { Comment, Meme } from '@api/memes.req.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

interface MemeCommentPayload {
	id: string;
	comment: Comment;
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
		setNewCommment: (state, action: PayloadAction<MemeCommentPayload>) => {
			const index = state.value.findIndex((meme) => meme.id === action.payload.id);
			if (index === -1) return;
			state.value[index].comments.push(action.payload.comment);
		},
	},
});

export const { setMemes, setNewMeme, setNewCommment } = memesSlice.actions;
export const retrieveMemes = (state: RootState) => state.memes.value;
export default memesSlice.reducer;
