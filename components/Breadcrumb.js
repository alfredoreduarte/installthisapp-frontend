import React from 'react'
import { Link, IndexLink } from 'react-router'

const Breadcrumb = () => (
	<div className="ita-breadcrumb">
		<ul className="list-inline ita-breadcrumb-list">
			<li>
				<IndexLink to="/">
					<img src="/images/user.jpg" />
				</IndexLink>
			</li>
			<li className="weight-thin text-primary">
				<span className="h1 weight-thin text-primary">App Name</span>
			</li>
		</ul>
	</div>
)

export default Breadcrumb