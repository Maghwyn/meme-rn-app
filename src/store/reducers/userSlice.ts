import type { User } from '@api/user.req.type.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface UserState {
	value: Partial<User>;
	profileId: string;

	// clones data used for any user profile, so we keep the value for our own user stored
	profileData: Partial<User>;
}

const initialState: UserState = {
	value: {},
	profileId: '',
	profileData: {},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<Partial<User>>) => {
			state.value = action.payload;
		},
		willViewUserProfileOf: (state, action: PayloadAction<string>) => {
			state.profileId = action.payload;
		},
		setUserProfileData: (state, action: PayloadAction<Partial<User>>) => {
			state.profileData = action.payload;
		},
		resetUserProfile: (state) => {
			state.profileId = '';
			state.profileData = {};
		},
	},
});

export const { setUserData, willViewUserProfileOf, setUserProfileData, resetUserProfile } =
	userSlice.actions;
export const retrieveUser = (state: RootState) => state.user.value;
export const retrieveUserProfile = (state: RootState) => state.user.profileData;
export const retrieveUserProfileId = (state: RootState) => state.user.profileId;
export default userSlice.reducer;
