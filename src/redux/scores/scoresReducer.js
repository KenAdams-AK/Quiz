import {
	SET_SCORES_DATA,
	SAVE_CURRENT_SCORE,
	SAVE_NEW_SCORE,
	SET_CURRENT_SCORE,
} from './scoresTypes';

const initialState = {
	isQuizFinished: false,
	currentScoreData: {},
	scoresData: [],
};

const scoresReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SCORES_DATA:
			return {
				...state,
				isQuizFinished: false,
				scoresData: action.payload,
			};

		case SET_CURRENT_SCORE:
			return {
				...state,
				isQuizFinished: false,
				currentScoreData: action.payload,
			};

		case SAVE_NEW_SCORE:
			const newScoresData = [...state.scoresData, action.payload];
			localStorage.setItem(
				'scoresData',
				JSON.stringify({ data: newScoresData })
			);

			return {
				...state,
				isQuizFinished: true,
				scoresData: newScoresData,
			};

		case SAVE_CURRENT_SCORE:
			localStorage.setItem('currentScoreData', JSON.stringify(action.payload));

			return {
				...state,
				isQuizFinished: true,
				currentScoreData: action.payload,
			};

		default:
			return state;
	}
};

export default scoresReducer;
