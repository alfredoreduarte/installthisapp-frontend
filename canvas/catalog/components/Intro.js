import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/example/components/Image'

const Intro = ({ image, linkUrl }) => (
	<div className="col-sm-12">
		<div className="row">
			<Link to={linkUrl}>
				<Image source={image} />
			</Link>
		</div>
	</div>
)

Intro.propTypes = {
	image: PropTypes.string.isRequired,
	linkUrl: PropTypes.string.isRequired,
}

export default Intro