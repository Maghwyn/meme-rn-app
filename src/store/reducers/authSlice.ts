import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

export interface AuthState {
	isAuth: boolean;
}

const initialState: AuthState = {
	isAuth: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthentification: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
	},
});

export const { setAuthentification } = authSlice.actions;
export const isAuth = (state: RootState) => state.auth.isAuth;
export default authSlice.reducer;
