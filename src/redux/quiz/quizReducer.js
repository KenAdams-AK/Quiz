import {
	GET_QUIZ_DATA_FAILURE,
	GET_QUIZ_DATA_REQUEST,
	GET_QUIZ_DATA_SUCCESS,
	SET_QUESTION_ANSWERS,
	SET_QUIZ_DATA,
} from './quizTypes';

const initialState = {
	loading: false,
	quiz: [],
	answers: [],
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

		case SET_QUESTION_ANSWERS:
			const randomOrderAnswers = [
				state?.quiz[action.payload]?.correct_answer,
				...state?.quiz[action.payload]?.incorrect_answers,
			].sort((a, b) => Math.random() - 0.5);

			return {
				...state,
				answers: randomOrderAnswers,
			};

		default:
			return state;
	}
};

export default quizReducer;
