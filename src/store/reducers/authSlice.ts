import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface AuthState {
	isAuth: boolean;
	token: string | undefined;
}

const initialState: AuthState = {
	isAuth: false,
	token: undefined,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthentication: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		logoutUser: (state) => {
			state.token = undefined;
		},
	},
});

export const { setAuthentication, setToken, logoutUser } = authSlice.actions;
export const isAuth = (state: RootState) => state.auth.isAuth;
export const getToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
