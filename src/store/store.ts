import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/reducers/authSlice';
import userReducer from '@store/reducers/userSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
