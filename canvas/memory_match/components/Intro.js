import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/memory_match/components/Image'

const IntroView = ({ image, linkUrl }) => (
	<div className="col-sm-12">
		<div className="row">
			<Link to={linkUrl}>
				<Image source={image} />
			</Link>
		</div>
	</div>
)

IntroView.propTypes = {
	image: PropTypes.string.isRequired,
	linkUrl: PropTypes.string.isRequired,
}

export default IntroView