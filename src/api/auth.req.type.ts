export type ActivateToken = {
	token: string;
};

export type SignUpBody = {
	username: string;
	email: string;
	password: string;
};

export type LoginUser = {
	email: string;
	password: string;
};

export type ActivateUserAccountBody = {
	email: string;
};

export type AuthBearer = string;
