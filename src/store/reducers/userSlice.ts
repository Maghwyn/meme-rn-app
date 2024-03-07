import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface UserState {
	username: string;
}

const initialState: UserState = {
	username: '',
};

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
	},
});

export const { setUsername } = authSlice.actions;
export const retrieveUsername = (state: RootState) => state.user.username;
export default authSlice.reducer;
