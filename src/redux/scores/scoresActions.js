import {
	SET_SCORES_DATA,
	SAVE_CURRENT_SCORE,
	SAVE_NEW_SCORE,
	SET_CURRENT_SCORE,
} from './scoresTypes';

export const setScoresData = (scoresData) => {
	return {
		type: SET_SCORES_DATA,
		payload: scoresData,
	};
};

export const setCurrentScoreData = (currentScoreData) => {
	return {
		type: SET_CURRENT_SCORE,
		payload: currentScoreData,
	};
};

export const saveNewScore = (newScore) => {
	return {
		type: SAVE_NEW_SCORE,
		payload: newScore,
	};
};

export const saveCurrentScoreData = (currentScoreData) => {
	return {
		type: SAVE_CURRENT_SCORE,
		payload: currentScoreData,
	};
};
