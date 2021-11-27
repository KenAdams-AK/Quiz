import { HANDLE_LOGIN, HANDLE_LOGOUT } from './loginTypes';

const initialState = {
	isLoggedin: false,
	username: null,
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_LOGIN:
			localStorage.setItem('currentUser', action.payload);

			return {
				isLoggedin: true,
				username: action.payload,
			};

		case HANDLE_LOGOUT:
			localStorage.removeItem('currentUser');
			return {
				isLoggedin: false,
				username: null,
			};

		default:
			return state;
	}
};

export default loginReducer;
