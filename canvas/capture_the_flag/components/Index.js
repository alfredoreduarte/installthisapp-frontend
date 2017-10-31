import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'
import TopUsers from 'canvas/capture_the_flag/components/TopUsers'

const Index = ({ messages, images, settings, entries, currentWinner, timer, captchaPath }) => (
	<div>
		<Image source={images.header} />
		<TopUsers entries={entries} />
		<div className="container">
			<div className="col-xs-12">
				<div id="timer">{timer}</div>
				<h1 id="main-screen-title">{messages.mainScreenTitle}</h1>
				<p className="text-center">
					<FbPhoto identifier={currentWinner.identifier} className="current-winner-pic" />
				</p>
				<h3 className="current-winner-name">{currentWinner.name}</h3>
				<p className="text-center">
					<button className="btn btn-primary btn-lg" id="claim-button">
						{messages.claimButtonLabel}
					</button>
				</p>
			</div>
		</div>
		<Image source={images.footer} />
	</div>
)

Index.propTypes = {}

export default Index
