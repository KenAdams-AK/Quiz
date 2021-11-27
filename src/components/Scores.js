import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewScore } from '../redux/scores/scoresActions';
import { v4 as uuidv4 } from 'uuid';
import './styles/Scores.css';

function Scores() {
	const dispatch = useDispatch();

	const currentScoreData = useSelector(
		(state) => state.scores.currentScoreData
	);
	const isQuizFinished = useSelector((state) => state.scores.isQuizFinished);
	const scoresData = useSelector((state) => state.scores.scoresData);

	const [newScoresData, setNewScoresData] = useState([]);

	const [newScoreData, setNewScoreData] = useState({
		id: currentScoreData.id,
		username: currentScoreData.username,
		score: currentScoreData.score,
		isDisplayed: true,
	});

	useEffect(() => {
		setNewScoreData();
	}, []);

	useEffect(() => {
		if (isQuizFinished) {
			dispatch(saveNewScore(newScoreData));
		}
	}, []);

	useEffect(() => {
		let sortedScoresData = scoresData.sort((a, b) =>
			a.score > b.score ? -1 : 1
		);

		let filteredScoresData = sortedScoresData
			.map((score, index) => {
				if (index > 4) {
					score.isDisplayed = false;
				}
				return { ...score };
			})
			.filter((score) => score.isDisplayed === true);

		let scoresDataToDisplay =
			filteredScoresData[4]?.score >= currentScoreData.score &&
			filteredScoresData[4]?.id !== currentScoreData.id
				? [
						...filteredScoresData,
						scoresData.find((score) => score.id === currentScoreData.id),
				  ]
				: [...filteredScoresData];

		setNewScoresData(scoresDataToDisplay);
	}, [scoresData]);

	return (
		<div className=" scores__container">
			<table className="scores__table">
				<caption>Scores</caption>
				<thead>
					<tr>
						<th>№</th>
						<th>Name</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{newScoresData[5]
						? newScoresData.map((score, index) => {
								if (index === 5) {
									return (
										<tr style={{ background: 'yellow' }} key={uuidv4()}>
											<th>
												{scoresData.findIndex(
													(score) => score.id === currentScoreData.id
												) + 1}
											</th>
											<td>{score?.username}</td>
											<td>{score?.score}</td>
										</tr>
									);
								} else {
									return (
										<tr key={uuidv4()}>
											<th>{index + 1}</th>
											<td>{score?.username}</td>
											<td>{score?.score}</td>
										</tr>
									);
								}
						  })
						: newScoresData.map((score, index) => {
								if (score?.id === currentScoreData?.id) {
									return (
										<tr style={{ background: 'yellow' }} key={uuidv4()}>
											<th>{index + 1}</th>
											<td>{score?.username}</td>
											<td>{score?.score}</td>
										</tr>
									);
								} else {
									return (
										<tr key={uuidv4()}>
											<th>{index + 1}</th>
											<td>{score?.username}</td>
											<td>{score?.score}</td>
										</tr>
									);
								}
						  })}
				</tbody>
			</table>
		</div>
	);
}

export default Scores;
