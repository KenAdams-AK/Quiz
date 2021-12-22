import React from 'react';
import { useDispatch } from 'react-redux';
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	HashRouter,
} from 'react-router-dom';
import { handleLogin } from '../redux/login/loginActions';
import Login from './Login';
import Home from './Home';
import { getQuizData, setQuizData } from '../redux/quiz/quizActions';
import Scores from './Scores';
import {
	setCurrentScoreData,
	setScoresData,
} from '../redux/scores/scoresActions';

function Main() {
	const dispatch = useDispatch();

	const username = localStorage.getItem('currentUser');
	const currentScore = localStorage.getItem('currentScore');
	const scoresData = localStorage.getItem('scoresData');
	const quizData = localStorage.getItem('quizData');

	if (username) {
		dispatch(handleLogin(username));
	}

	if (scoresData) {
		const parsedScoresData = JSON.parse(scoresData);
		dispatch(setScoresData(parsedScoresData.data));
	}

	if (currentScore) {
		dispatch(setCurrentScoreData(currentScore));
	}

	if (quizData) {
		const parsedQuiz = JSON.parse(quizData);
		dispatch(setQuizData(parsedQuiz.data));
	} else {
		dispatch(getQuizData());
	}

	const PrivateRoute = ({ component: Component }, ...rest) => (
		<Route
			{...rest}
			render={(props) =>
				username ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);

	return (
		<HashRouter>
			<div className="main__container">
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute exact path="/scores" component={Scores} />
					<Route path="/login" component={Login} />
					<Redirect from="*" to="/" />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default Main;
