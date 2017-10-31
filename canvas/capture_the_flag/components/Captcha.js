import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'
import TopUsers from 'canvas/capture_the_flag/components/TopUsers'

const Captcha = ({ messages, images, settings, entries, shuffledCaptcha, claim }) => (
	<div>
		<Image source={images.header} />
		<TopUsers entries={entries} />
		<div className="container">
			<h1 id="captcha-question">{messages.captchaQuestion}</h1>
		</div>
		<div className="container">
			<div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
				<div id="captcha">
					{_.shuffle(shuffledCaptcha).map(image => (
						<img key={image} src={image} className="captcha-item" onClick={() => claim(image)} />
					))}
				</div>
			</div>
		</div>
		<Image source={images.footer} />
	</div>
)

Captcha.propTypes = {}

export default Captcha
