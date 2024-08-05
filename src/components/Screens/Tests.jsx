import { Link } from 'react-router-dom'

const Tests = () => {
	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">Tests</h1>
			<ul>
				<li>
					<Link to="testTodo">Test Todo</Link>
				</li>
			</ul>
		</>
	)
}

export default Tests
