import board from '../../../images/board.png';
import './MainImage.scss';

const MainImage = () => {
	return (
		<div className='main-image-wrapper'>
			<img className='main-image' src={board} alt='' />
		</div>
	);
};

export default MainImage;
