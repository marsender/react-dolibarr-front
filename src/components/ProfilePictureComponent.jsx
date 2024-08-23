import React from 'react'

const ProfilePictureComponent = ({ src, userProfileImage }) => {
	let imgSrc = null
	if (typeof userProfileImage !== 'undefined' && userProfileImage) {
		imgSrc = `data:${userProfileImage.contentType};${userProfileImage.encoding},${userProfileImage.content}`
	} else if (typeof src !== 'undefined' && src) {
		imgSrc = src
	} else {
		console.log('Missing profile image')
		return null
	}
	return <img className="w-8 h-8 rounded-full" src={imgSrc} />
}

export default ProfilePictureComponent
