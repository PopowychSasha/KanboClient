import './SignUpForm.scss';
import { useState } from 'react';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authDataCreator } from '../../../redux/actionCreators/authDataCreator';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postSignUpUserData } from '../../../utils/postSignUpUserData';
import SignUpFormFields from '../SignUpFormFields/SignUpFormFields';
import {
	onChangeEmailHandler,
	onChangeNicknameHandler,
	onChangePasswordHandler,
} from '../../../utils/isSignUpFormDataValid';
import ImagePicker from '../ImagePicker/ImagePicker';

const SignUpForm = ({ formsToggle }) => {
	const [isEysClosed, setIsEysClosed] = useState();

	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [nicknameError, setNicknameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [isLoader, setIsLoader] = useState(false);

	const [imageSelected, setImageSelected] = useState();
	const [pickedImageUrl, setPickedImageUrl] = useState('');

	const toggleShowPasswordHandler = () => setIsEysClosed(isEysClosed => !isEysClosed);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmitFormHandler = event => {
		event.preventDefault();

		const isFormDataValid =
			nickname !== '' &&
			email !== '' &&
			password !== '' &&
			nicknameError === false &&
			emailError === false &&
			passwordError === false;

		if (isFormDataValid === false) {
			toast.info('data in the form is not valid ');
			return;
		} else if (!imageSelected) {
			toast.info('avatar not selected');
			return;
		}
		setIsLoader(true);

		const formData = new FormData();
		formData.append('file', imageSelected);
		formData.append('upload_preset', 'yb6djiab');

		axios
			.post(`https://api.cloudinary.com/v1_1/dgle2qeqp/image/upload`, formData)
			.then(responce => {
				postSignUpUserData(
					nickname,
					email,
					password,
					responce.data.public_id,
					dispatch,
					authDataCreator,
					navigate,
					setIsLoader,
					setNickname,
					setEmail,
					setPassword,
					toast,
				);
			})
			.catch(() => console.log('Cloudinary error'));
	};

	return (
		<div className='sign-up-form-wrapper'>
			{isLoader && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open={true}>
					<CircularProgress color='inherit' />
				</Backdrop>
			)}
			<div className='sign-up-form-title'>SignUp</div>
			<form className='sign-up-form' onSubmit={onSubmitFormHandler}>
				<SignUpFormFields
					nicknameError={nicknameError}
					nickname={nickname}
					onChangeNicknameHandler={onChangeNicknameHandler}
					setNicknameError={setNicknameError}
					setNickname={setNickname}
					emailError={emailError}
					email={email}
					passwordError={passwordError}
					password={password}
					onChangeEmailHandler={onChangeEmailHandler}
					isEysClosed={isEysClosed}
					toggleShowPasswordHandler={toggleShowPasswordHandler}
					onChangePasswordHandler={onChangePasswordHandler}
					setPasswordError={setPasswordError}
					setPassword={setPassword}
					setEmailError={setEmailError}
					setEmail={setEmail}
				/>
				<ImagePicker
					setPickedImageUrl={setPickedImageUrl}
					setImageSelected={setImageSelected}
					imageSelected={imageSelected}
				/>
				{pickedImageUrl && (
					<div className='picked-image'>
						<img src={`${pickedImageUrl}`} alt='' />
					</div>
				)}
				<Button type='submit' variant='contained' color='secondary'>
					Sign Up
				</Button>
			</form>
			<div onClick={formsToggle} className='dont-have-account'>
				I already have an account
			</div>
			<ToastContainer
				position='top-right'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default SignUpForm;
