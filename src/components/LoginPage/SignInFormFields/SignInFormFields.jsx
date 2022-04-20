import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import './SignInFormFields.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignInFormFields = ({onChangeNicknameHandler,nickname
    ,onChangePasswordHandler,password,isEysClosed,toggleShowPasswordHandler}) => {
	return (
		<>
			<FormControl variant='standard'>
				<InputLabel htmlFor='nickname'>nickname</InputLabel>
				<Input
					id='nickname'
					onChange={onChangeNicknameHandler}
					value={nickname}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton>
								<AccountCircleIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControl variant='standard'>
				<InputLabel htmlFor='standard-adornment-password'>password</InputLabel>
				<Input
					id='standard-adornment-password'
					onChange={onChangePasswordHandler}
					value={password}
					type={isEysClosed ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={toggleShowPasswordHandler}>
								{isEysClosed ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
		</>
	);
};

export default SignInFormFields;