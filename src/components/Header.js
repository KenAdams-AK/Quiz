import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { handleLogout } from '../redux/login/loginActions';
import './styles/Header.css';

function Header() {
	const dispatch = useDispatch();
	const history = useHistory();
	const username = useSelector((state) => state.login.username);

	const handleClick = () => {
		dispatch(handleLogout());
		history.push('/login');
	};

	return (
		<div className="header__container">
			<Link to="/" className="link">
				<h1 className="header__logo">Quiz</h1>
			</Link>
			<h2 className="header__greeting">Hello, {username}!</h2>
			<div className="header__scores">
				<Link to="/scores" className="link">
					<Button variant="contained">Scores</Button>
				</Link>
			</div>
			<div className="header__logout">
				<Button onClick={handleClick} variant="contained">
					Logout
				</Button>
			</div>
		</div>
	);
}

export default Header;
