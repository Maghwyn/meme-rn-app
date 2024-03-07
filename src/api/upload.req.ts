import { client } from '@api/network/client';
import type { Upload } from '@api/upload.req.type';

export const uploadFiles = (formData: FormData) => {
	return client.post<Upload>('/uploads', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};
