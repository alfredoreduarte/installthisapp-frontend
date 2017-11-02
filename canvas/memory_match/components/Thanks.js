import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import FbPhoto from 'components/FbPhoto'
import Image from 'canvas/memory_match/components/Image'
import Credits from 'canvas/common-components/Credits'

const ThanksView = ({ headerImage, footerImage, thanksMessage, userName, userIdentifier, clicks, time }) => (
	<div>
		{headerImage ? <Image source={headerImage} /> : null}
		<div className="container">{thanksMessage ? <h1 className="ita-cali-message">{thanksMessage}</h1> : null}</div>
		<div className="container">
			<div
				style={{
					textAlign: 'center',
				}}>
				<FbPhoto identifier={`${userIdentifier}`} width={50} height={50} className="user-photo" />
			</div>
			<h1 className="ita-cali-user-name">{userName}</h1>
		</div>
		<div className="Indicators">
			<div className="Indicator-left animated slideInLeft">
				<div className="Indicator-background" />
				<span className="ita-cali-indicator-text">{clicks}</span>
			</div>
			<div className="Indicator-right animated slideInRight">
				<div className="Indicator-background" />
				<span className="ita-cali-indicator-text">{time}</span>
			</div>
		</div>
		{footerImage ? <Image source={footerImage} /> : null}
		<Credits />
	</div>
)

ThanksView.propTypes = {
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	thanksMessage: PropTypes.string,
	userName: PropTypes.string.isRequired,
	userIdentifier: PropTypes.oneOfType([React.PropTypes.number.isRequired, React.PropTypes.string.isRequired]),
	clicks: PropTypes.number.isRequired,
	time: PropTypes.oneOfType([React.PropTypes.number.isRequired, React.PropTypes.string.isRequired]),
}

export default ThanksView
