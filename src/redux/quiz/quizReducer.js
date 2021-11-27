import {
	GET_QUIZ_DATA_FAILURE,
	GET_QUIZ_DATA_REQUEST,
	GET_QUIZ_DATA_SUCCESS,
	SET_QUIZ_DATA,
} from './quizTypes';

const initialState = {
	loading: false,
	quiz: [],
	error: null,
};

const quizReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_QUIZ_DATA_REQUEST:
			return {
				loading: true,
			};

		case GET_QUIZ_DATA_SUCCESS:
			localStorage.setItem(
				'quizData',
				JSON.stringify({ data: action.payload })
			);
			return {
				...state,
				loading: false,
				quiz: action.payload,
			};

		case GET_QUIZ_DATA_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case SET_QUIZ_DATA:
			return {
				...state,
				quiz: action.payload,
			};

		default:
			return state;
	}
};

export default quizReducer;
