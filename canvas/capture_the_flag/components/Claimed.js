import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Image from 'canvas/common-components/Image'
import FbPhoto from 'canvas/capture_the_flag/components/FbPhoto'
import TopUsers from 'canvas/capture_the_flag/components/TopUsers'

const Claimed = ({ messages, images, settings, entries, timer, currentWinner }) => (
	<div>
		<Image source={images.header} />
		<TopUsers entries={entries} />
		<div className="container">
			<div className="col-xs-12">
				<div id="timer">{timer}</div>
				<h1 id="claimed-screen-title">{messages.claimedScreenTitle}</h1>
				<p className="text-center">
					<FbPhoto identifier={currentWinner.identifier} className="current-winner-pic" />
				</p>
				<h3 className="current-winner-name">00:01:11</h3>
			</div>
		</div>
		<Image source={images.footer} />
	</div>
)

Claimed.propTypes = {}

export default Claimed
