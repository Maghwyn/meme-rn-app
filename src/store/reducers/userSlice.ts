import type { User } from '@api/user.req.type.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface UserState {
	value: Partial<User>;
	anotherUserId: string;
}

const initialState: UserState = {
	value: {},
	anotherUserId: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<User>) => {
			state.value = action.payload;
		},
		willViewUserProfileOf: (state, action: PayloadAction<string>) => {
			state.anotherUserId = action.payload;
		},
	},
});

export const { setUserData, willViewUserProfileOf } = userSlice.actions;
export const retrieveUser = (state: RootState) => state.user;
export const getAnotherUserId = (state: RootState) => state.user.anotherUserId;
export default userSlice.reducer;
