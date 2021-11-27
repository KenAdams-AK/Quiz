import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handleLogin } from '../redux/login/loginActions';
import './styles/Login.css';

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.login.username);

	useEffect(() => {
		if (currentUser) {
			history.push('/');
		}
	}, []);

	const [username, setUsername] = useState('');
	const [usernameInvalid, setUsernameInvalid] = useState('');

	const usernameValidRegex = /^(?=[a-zA-Z._]{3,12}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	const handleChange = (e) => {
		setUsername(e.target.value);

		if (!usernameValidRegex.test(String(e.target.value))) {
			setUsernameInvalid(
				'Username requires 3 to 12 characters, only latin letters can be used'
			);
		} else {
			setUsernameInvalid('');
		}
	};

	const handleSubmit = () => {
		dispatch(handleLogin(username));
		setUsername('');
		console.log('clicked');
	};

	return (
		<div className="login__container">
			<Box
				onSubmit={handleSubmit}
				style={{ display: 'flex', flexDirection: 'column' }}
				component="form"
				sx={{
					'& .MuiTextField-root': { width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					onChange={handleChange}
					value={username}
					required
					id="outlined-required"
					label="Name is required"
				/>

				<div>
					<Button
						type="submit"
						style={{ marginTop: '20px' }}
						variant="contained"
						disabled={!username || !!usernameInvalid}
					>
						Start quiz
					</Button>
				</div>
			</Box>

			<div className="login__error">{usernameInvalid}</div>
		</div>
	);
}

export default Login;
