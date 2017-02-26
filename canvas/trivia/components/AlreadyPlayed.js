import React, { PropTypes } from 'react'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'

const AlreadyPlayed = ({ title, foot, header, footer }) => (
	<div>
		<div className="row">
			<HeaderImage source={header} />
		</div>
		<div className="col-sm-12">
			<h1 className="ita-cali-message-text" data-editable-message-key="alreadyPlayed">{title}</h1>
			<h3 className="hide">{foot}</h3>
		</div>
		<div className="row">
			<HeaderImage source={footer} />
		</div>
	</div>
)

AlreadyPlayed.propTypes = {
	title: PropTypes.string.isRequired,
}

export default AlreadyPlayed