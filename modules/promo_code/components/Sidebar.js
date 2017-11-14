import React from 'react'
import { Link } from 'react-router'

const Sidebar = ({ params: { checksum, type } }) => (
	<ul className="list-unstyled">
		<li>
			<Link to={`/d/apps/${type}/${checksum}/codes`} activeClassName="active">
				Participants
			</Link>
		</li>
	</ul>
)

export default Sidebar
