import profilePicture from '/profile-picture.png'
import PropTypes from 'prop-types'

const ProfilePictureComponent = ({ userProfileImage }) => {
	let imgSrc = profilePicture
	if (typeof userProfileImage !== 'undefined' && userProfileImage) {
		imgSrc = `data:${userProfileImage.contentType};${userProfileImage.encoding},${userProfileImage.content}`
	}
	return <img className="w-8 h-8 rounded-full" src={imgSrc} />
}

ProfilePictureComponent.propTypes = {
	userProfileImage: PropTypes.shape({
		contentType: PropTypes.string.isRequired,
		encoding: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}),
}

export default ProfilePictureComponent
