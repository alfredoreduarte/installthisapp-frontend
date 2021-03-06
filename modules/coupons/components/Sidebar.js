import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Sidebar = ({ checksum, type }) => 
<ul className="list-unstyled">
	<li><Link to={`/d/apps/${type}/${checksum}/vouchers`} activeClassName="active">Vouchers</Link></li>
</ul>

const mapStateToProps = ( state, props ) => ({
	checksum: props.params.checksum,
	type: props.params.type,
})

export default connect(mapStateToProps)(Sidebar)