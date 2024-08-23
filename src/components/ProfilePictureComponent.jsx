import React from 'react'
import profilePicture from '/profile-picture.png'

const ProfilePictureComponent = ({ userProfileImage }) => {
	let imgSrc = profilePicture
	if (typeof userProfileImage !== 'undefined' && userProfileImage) {
		imgSrc = `data:${userProfileImage.contentType};${userProfileImage.encoding},${userProfileImage.content}`
	}
	return <img className="w-8 h-8 rounded-full" src={imgSrc} />
}

export default ProfilePictureComponent
