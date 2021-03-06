import React, { PropTypes } from 'react'
import HeaderImage from 'canvas/trivia/components/HeaderImage'
import Credits from 'canvas/common-components/Credits'

const Thanks = ({ title, foot, header, footer }) => (
	<div>
		<div className="row">
			<HeaderImage source={header} />
		</div>
		<div className="col-sm-12">
			<h1 className="ita-cali-message-text" data-editable-message-key="thankYou">
				{title}
			</h1>
			<h3 className="hide">{foot}</h3>
		</div>
		<div className="row">
			<HeaderImage source={footer} />
		</div>
		<Credits />
	</div>
)

Thanks.propTypes = {
	title: PropTypes.string.isRequired,
}

export default Thanks
