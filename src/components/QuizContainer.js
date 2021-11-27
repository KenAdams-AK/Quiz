import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { saveCurrentScoreData } from '../redux/scores/scoresActions';
import './styles/QuizContainer.css';

function QuizeContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const quiz = useSelector((state) => state.quiz);
	const currentUser = useSelector((state) => state.login.username);

	const timerLast = 15;

	const [isQuizFinished, setIsQuizFinished] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentTimer, setCurrentTimer] = useState(timerLast);
	const [currentScore, setCurrentScore] = useState(0);

	useEffect(() => {
		if (isQuizFinished) {
			dispatch(
				saveCurrentScoreData({
					id: uuidv4(),
					username: currentUser,
					score: currentScore,
					isDisplayed: true,
				})
			);
		}

		console.log(currentScore);
	}, [isQuizFinished]);

	useEffect(() => {
		if (isQuizFinished) {
			history.push('/scores');
		}
	}, [isQuizFinished]);

	useEffect(() => {
		if (!isQuizFinished) {
			setAnswers(
				[
					quiz?.quiz[currentIndex]?.correct_answer,
					...quiz?.quiz[currentIndex]?.incorrect_answers,
				].sort((a, b) => Math.random() - 0.5)
			);
		}
	}, [currentIndex]);

	useEffect(() => {
		if (currentTimer === -1) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
			setCurrentTimer(timerLast);
		}
		if (currentTimer === 0 && currentIndex === quiz.quiz.length - 1) {
			setIsQuizFinished(true);
		}

		const intervalTimer = setInterval(() => {
			setCurrentTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		return () => clearInterval(intervalTimer);
	}, [currentTimer]);

	const handleClick = (e) => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
		setCurrentTimer(timerLast);

		if (e.target.value === quiz?.quiz[currentIndex]?.correct_answer) {
			setCurrentScore(currentScore + currentTimer * 100);
		}

		if (currentIndex === quiz.quiz.length - 1) {
			setIsQuizFinished(true);

			console.log('lastclick', currentScore);
		}
	};

	return (
		<div className="quiz__container">
			<div className="quiz__score">Score: {currentScore}</div>
			<div className="quiz__card-container">
				<div className="quiz__timer-container">
					<div className="quiz__timer-line"></div>
					<div className="quiz__timer-countdown">{currentTimer}</div>
				</div>

				{quiz?.quiz?.map((element, index) => {
					if (index === currentIndex) {
						return (
							<div className="quiz__card" key={uuidv4()}>
								<div className="quiz__card-head">
									<div>
										Category: <h3>{element.category}</h3>
									</div>
									<div>
										Difficalty: <h3>{element.difficulty}</h3>
									</div>
								</div>
								<div className="quiz__card-question">
									<h4>{element.question}</h4>
								</div>
								<div className="quiz__card-answers">
									{answers.map((answer) => (
										<Button
											className="quiz__card-answer"
											onClick={handleClick}
											value={answer}
											key={uuidv4()}
											variant="contained"
										>
											{answer}
										</Button>
									))}
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default QuizeContainer;
