import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

const useToast = () => {
	// Default toast parameters
	const defaultToastParams: ToastShowParams = {
		visibilityTime: 2000,
		topOffset: 10,
		autoHide: true,
	};

	// Function to show a toast
	const showToast = (params: ToastShowParams) => {
		Toast.show({
			...defaultToastParams, // Use default parameters
			...params, // Override with provided parameters
		});
	};

	// Function to hide the toast
	const hideToast = () => {
		Toast.hide();
	};

	// Return the functions to be used externally
	return { showToast, hideToast };
};

export default useToast;
