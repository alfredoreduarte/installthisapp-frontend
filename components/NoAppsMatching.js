import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const NoAppsMatching = () => (
	<div className="col-sm-12">
		<div className="ita-empty text-center">
			<h3 className="animated fadeInDown">No apps match your query</h3>
			<h4 className="animated fadeInDown">Try using less fancy words ;)</h4>
		</div>
	</div>
)

export default NoAppsMatching
