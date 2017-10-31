import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'
import TopUsers from 'canvas/capture_the_flag/components/TopUsers'

const Captcha = ({ messages, images, settings, entries }) => (
	<div>
		<Image source={images.header} />
		<TopUsers entries={entries} />
		<div className="container">
			<h1 id="captcha-question">{messages.captchaQuestion}</h1>
		</div>
		<div id="captcha">
			<img src={images.captcha.correct} className="captcha-item" />
			<img src={images.captcha.incorrect[0]} className="captcha-item" />
			<img src={images.captcha.incorrect[1]} className="captcha-item" />
		</div>
		<Image source={images.footer} />
	</div>
)

Captcha.propTypes = {}

export default Captcha
