import { HANDLE_LOGIN, HANDLE_LOGOUT } from './loginTypes';

export const handleLogin = (username) => {
	return {
		type: HANDLE_LOGIN,
		payload: username,
	};
};

export const handleLogout = () => {
	return {
		type: HANDLE_LOGOUT,
	};
};
