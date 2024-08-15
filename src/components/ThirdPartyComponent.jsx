import { Link } from 'react-router-dom'

export default function ThirdPartyComponent(item, { detail }) {
	return (
		<div className="flex">
			{/* <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">{item.code_client}</div> */}
			<h1 className="flex-auto">{detail ? item.email : <Link to={item.url}>{item.name}</Link>}</h1>
			<div className="text-sm text-gray-900 dark:text-white">{item.phone}</div>
		</div>
	)
}
