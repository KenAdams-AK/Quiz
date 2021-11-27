import { combineReducers } from 'redux';
import loginReducer from './login/loginReducer';
import quizReducer from './quiz/quizReducer';
import scoresReducer from './scores/scoresReducer';

const rootReducer = combineReducers({
	login: loginReducer,
	quiz: quizReducer,
	scores: scoresReducer,
});

export default rootReducer;
