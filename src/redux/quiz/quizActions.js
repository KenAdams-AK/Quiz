import axios from 'axios';
import {
	GET_QUIZ_DATA_FAILURE,
	GET_QUIZ_DATA_REQUEST,
	GET_QUIZ_DATA_SUCCESS,
	SET_QUESTION_ANSWERS,
	SET_QUIZ_DATA,
} from './quizTypes';

export const getQuizDataRequest = () => {
	return {
		type: GET_QUIZ_DATA_REQUEST,
	};
};

export const getQuizDataSuccess = (response) => {
	return {
		type: GET_QUIZ_DATA_SUCCESS,
		payload: response,
	};
};

export const getQuizDataFailure = (error) => {
	return {
		type: GET_QUIZ_DATA_FAILURE,
		payload: error,
	};
};

export const setQuizData = (data) => {
	return {
		type: SET_QUIZ_DATA,
		payload: data,
	};
};

export const setQuestionAnswers = (currentIndex) => {
	return {
		type: SET_QUESTION_ANSWERS,
		payload: currentIndex,
	};
};

export const getQuizData = () => {
	return (dispatch) => {
		dispatch(getQuizDataRequest());

		const options = {
			method: 'get',
			url: 'https://opentdb.com/api.php?amount=10&category=23&type=multiple',
		};

		axios(options)
			.then((response) => {
				const data = response.data.results;
				dispatch(getQuizDataSuccess(data));
				console.log(data);
			})
			.catch((error) => {
				const errorMessage = error?.response?.data?.message;
				dispatch(getQuizDataFailure(error));
				console.log(errorMessage);
			});
	};
};
