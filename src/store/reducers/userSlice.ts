import type { User } from '@api/user.req.type.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface UserState {
	value: Partial<User>;
}

const initialState: UserState = {
	value: {},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<User>) => {
			state.value = action.payload;
		},
	},
});

export const { setUserData } = userSlice.actions;
export const retrieveUser = (state: RootState) => state.user;
export default userSlice.reducer;
