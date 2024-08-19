import { Link } from 'react-router-dom'

export default function ThirdPartyComponent(item, { detail }) {
	return (
		<>
			<div className="flex">
				{/* <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">{item.code_client}</div> */}
				<h1 className="flex-1">{detail ? item.email : <Link to={item.url}>{item.name}</Link>}</h1>
				<div className="text-gray-500 dark:text-gray-400">{detail ? item.phone : item.email}</div>
			</div>
			{detail ? (
				<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
					<div>
						{item.address} {item.zip} {item.town}
					</div>
				</div>
			) : null}
		</>
	)
}
