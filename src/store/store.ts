import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/reducers/authSlice';
import userReducer from '@store/reducers/userSlice';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

export const setupStore = () => {
	const store = configureStore({
		reducer: persistReducer(persistConfig, rootReducer),
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
	});

	return {
		store,
		persistor: persistStore(store),
	};
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['store']['dispatch'];
