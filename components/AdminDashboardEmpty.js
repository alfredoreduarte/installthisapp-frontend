import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const AdminDashboardEmpty = () => (
	<div className="col-sm-12">
		<div className="ita-empty text-center">
			<br />
			<h1 className="weight-thin animated fadeInDown">Let's get this started</h1>
			<br />
			<br />
			<img 
				src="/images/dashboard-empty.png"
				style={{height: '200px'}}
				className="ita-empty-illustration animated fadeInUp" />
			<br />
			<br />
			<p>
				<Link to='/d/apps/create' className="btn btn-success btn-lg animated fadeInUp">
					Create your first App
				</Link>
			</p>
		</div>
	</div>
)

export default AdminDashboardEmpty