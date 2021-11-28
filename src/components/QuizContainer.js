import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { setQuestionAnswers } from '../redux/quiz/quizActions';
import { saveCurrentScoreData } from '../redux/scores/scoresActions';
import './styles/QuizContainer.css';

function QuizeContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const quiz = useSelector((state) => state.quiz);
	const currentUser = useSelector((state) => state.login.username);

	const timerLast = 15;
	const timerLineWidthDefault = 100;

	const [isQuizFinished, setIsQuizFinished] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [timerInterval, setTimerInterval] = useState(null);
	const [currentTimer, setCurrentTimer] = useState(timerLast);
	const [currentScore, setCurrentScore] = useState(0);

	const [timerLineWidth, setTimerLineWidth] = useState(timerLineWidthDefault);
	const [timerLineColor, setTimerLineColor] = useState('green');

	const handleSwitchQuestion = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
		setCurrentTimer(timerLast);
		setTimerLineWidth(timerLineWidthDefault);
		setTimerLineColor('green');
	};

	const handleFinishQuiz = () => {
		setIsQuizFinished(true);
		clearInterval(timerInterval);
	};

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
			history.push('/scores');
		}
	}, [isQuizFinished]);

	useEffect(() => {
		if (!isQuizFinished) {
			dispatch(setQuestionAnswers(currentIndex));
		}
	}, [currentIndex]);

	useEffect(() => {
		setTimerInterval(
			setInterval(() => {
				setCurrentTimer((prevTimer) => prevTimer - 1);
				setTimerLineWidth((prevStyle) => prevStyle - 100 / 15);
			}, 1000)
		);
		clearInterval(timerInterval);
	}, []);

	useEffect(() => {
		if (currentTimer === -1) {
			handleSwitchQuestion();
		}

		if (currentTimer === 0 && currentIndex === quiz.quiz.length - 1) {
			handleFinishQuiz();
		}
	}, [currentTimer]);

	const handleClick = (e) => {
		handleSwitchQuestion();

		if (e.target.value === quiz?.quiz[currentIndex]?.correct_answer) {
			setCurrentScore(currentScore + currentTimer * 100);
		}

		if (currentIndex === quiz.quiz.length - 1) {
			handleFinishQuiz();

			console.log('lastclick', currentScore);
		}
	};

	useEffect(() => {
		if (currentTimer === 4) {
			setTimerLineColor('red');
		}
	}, [currentTimer]);

	return (
		<div className="quiz__container">
			<div className="quiz__score">Score: {currentScore}</div>
			<div className="quiz__card-container">
				<div className="quiz__timer-container">
					<div
						className="quiz__timer-line"
						style={{
							width: `${timerLineWidth}%`,
							background: `${timerLineColor}`,
						}}
					></div>
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
									{quiz.answers.map((answer) => (
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
