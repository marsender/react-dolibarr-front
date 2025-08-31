import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function ThirdPartyComponent({ thirdParty, detail }) {
	return (
		<>
			<div className="flex">
				{/* <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">{thirdParty.code_client}</div> */}
				<h1 className="flex-1">{detail ? thirdParty.email : <Link to={thirdParty.url}>{thirdParty.name}</Link>}</h1>
				<div className="text-gray-500 dark:text-gray-400">{detail ? thirdParty.phone : thirdParty.email}</div>
			</div>
			{detail ? (
				<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
					<div>
						{thirdParty.address} {thirdParty.zip} {thirdParty.town}
					</div>
				</div>
			) : null}
		</>
	)
}

ThirdPartyComponent.propTypes = {
	thirdParty: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string,
		address: PropTypes.string,
		zip: PropTypes.string,
		town: PropTypes.string,
		url: PropTypes.string,
	}).isRequired,
	detail: PropTypes.bool.isRequired,
}
