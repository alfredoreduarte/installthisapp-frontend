import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Sidebar = ({ checksum, type }) => (
	<ul className="list-unstyled">
		<li>
			<Link to={`/d/apps/${type}/${checksum}/products`} activeClassName="active">Products</Link>
			<ul className="list-unstyled" style={{
				marginTop: '10px',
				marginBottom: '24px',
			}}>
				<li><Link to={`/d/apps/${type}/${checksum}/products/create`} activeClassName="active">Add new</Link></li>
			</ul>
		</li>
		<li><Link to={`/d/apps/${type}/${checksum}/categories`} activeClassName="active">Categories</Link></li>
		<li><Link to={`/d/apps/${type}/${checksum}/media`} activeClassName="active">Product Images</Link></li>
	</ul>
)

const mapStateToProps = ( state, props ) => ({
	checksum: props.params.checksum,
	type: props.params.type,
})

export default connect(mapStateToProps)(Sidebar)