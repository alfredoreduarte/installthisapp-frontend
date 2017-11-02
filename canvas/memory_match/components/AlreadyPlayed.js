import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Image from 'canvas/memory_match/components/Image'
import Credits from 'canvas/common-components/Credits'

const AlreadyPlayedView = ({ headerImage, footerImage, alreadyPlayedMessage }) => (
	<div>
		{headerImage ? <Image source={headerImage} /> : null}
		<div className="container">
			{alreadyPlayedMessage ? (
				<h1>
					<span className="ita-cali-message">{alreadyPlayedMessage}</span>
				</h1>
			) : null}
		</div>
		{footerImage ? <Image source={footerImage} /> : null}
		<Credits />
	</div>
)

AlreadyPlayedView.propTypes = {
	headerImage: PropTypes.string,
	footerImage: PropTypes.string,
	alreadyPlayedMessage: PropTypes.string,
}

export default AlreadyPlayedView
