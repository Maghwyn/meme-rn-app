import type {
	ActivateToken,
	ActivateUserAccountBody,
	AuthBearer,
	LoginUser,
	SignUpBody,
} from '@api/auth.req.type';
import { client } from '@api/network/client';

export const isLoggedIn = () => {
	return client.post('/auth');
};

export const signupUser = (payload: SignUpBody) => {
	return client.post('/auth/signup', payload);
};

export const loginUser = (credentials: LoginUser) => {
	return client.post<AuthBearer>('/auth/signin', credentials);
};

export const askActivateToken = (payload: ActivateUserAccountBody) => {
	return client.post('/auth/ask-activation-token', payload);
};
export const activateUserAccount = (payload: ActivateToken) => {
	return client.post<AuthBearer>('/auth/activate', payload);
};
