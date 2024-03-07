import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface AuthState {
	isAuth: boolean;
	token: string | null;
}

const initialState: AuthState = {
	isAuth: false,
	token: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthentification: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { setAuthentification, setToken } = authSlice.actions;
export const isAuth = (state: RootState) => state.auth.isAuth;
export const getToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
