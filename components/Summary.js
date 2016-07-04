import React, { Component, PropTypes } from 'react'
import StatusIndicator from './StatusIndicator'

const values = [999, 12, 234, 23]

const SummaryValue = ({ value }) => (
	<div className="col-md-3">
		<h2 className="ita-stats-summary-number text-center">{value}</h2>
		<p className="text-gray-light text-center">
			<StatusIndicator active={true} />
			Dataset name
		</p>
	</div>
)

const Summary = () => (
	<div className="row">
		<div className="col-md-12">
			<div className="row">
				{ values.map( value => <SummaryValue key={`sum${value}`} value={value} /> ) }
			</div>
		</div>
		<hr/>
	</div>
)

export default Summary