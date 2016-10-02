import React, { Component, PropTypes } from 'react'
import StatusIndicator from 'components/StatusIndicator'

// const values = [999, 12, 234, 23]

const SummaryValue = ({ item }) => (
	<div className="col-md-3">
		<h2 className="ita-stats-summary-number text-center">{item.value}</h2>
		<p className="text-gray-light text-center">
			{false ? <StatusIndicator active={false} /> : null}
			{item.label}
		</p>
	</div>
)

const Summary = ({ data }) => (
	<div className="row">
		<div className="col-md-12">
			<div className="row">
				{ data.map( item => <SummaryValue key={`sum_${item.label}${item.value}`} item={item} /> ) }
			</div>
		</div>
		<hr/>
	</div>
)

export default Summary