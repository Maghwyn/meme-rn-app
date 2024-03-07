import { client } from '@api/network/client';

import type { User, UserIdQuery } from './user.req.type';

export const getMe = () => {
	return client.get<User>('/users/@me');
};

export const getUserById = (query: UserIdQuery) => {
	return client.get<User>(`/users/${query}`);
};
