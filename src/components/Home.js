import { Button } from '@mui/material';
import React, { useState } from 'react';
import Header from './Header';
import QuizContainer from './QuizContainer';

function Home() {
	const [isStarted, setIsStarted] = useState(false);

	return (
		<div className="home__container">
			<Header />
			{isStarted ? (
				<QuizContainer />
			) : (
				<div className="home__button">
					<Button
						onClick={() => setIsStarted(true)}
						style={{ padding: '30px' }}
						variant="contained"
					>
						<h3>Lets get started</h3>
					</Button>
				</div>
			)}
		</div>
	);
}

export default Home;
