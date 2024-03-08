import { client } from '@api/network/client';
import type { User, UserId } from '@api/user.req.type';

export const getMe = () => {
	return client.get<User>('/users/@me');
};

export const getUserById = (id: UserId) => {
	return client.get<User>(`/users/${id}`);
};
