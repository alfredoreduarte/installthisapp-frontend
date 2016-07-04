import React from 'react'

const TitleBar = ({ title, children }) => (
	<div className="col-md-12 ita-main-app-toolbar">
		<div className="row">
			<div className="col-md-6">
				<span className="h1 weight-thin text-primary">{title}</span>
			</div>
			<div className="col-md-6 text-right">
				{children}
			</div>
		</div>
	</div>
)

export default TitleBar