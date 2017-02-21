import React from 'react'

const CountDown = ({ time }) => (
	<div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
		<h1 className="ita-cali-countdown-text"><span>{time}</span></h1>
	</div>
)

export default CountDown