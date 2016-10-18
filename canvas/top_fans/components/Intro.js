import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'

const Intro = () => (
	<div className="col-sm-12">
		<Link to={`/${window.canvasId}/${window.checksum}/scores`}>
			<HeaderImage source={'https://uploads.intercomcdn.com/i/o/11827468/20f165b7d5095d40143e3c17/sabafon.jpg'} />
		</Link>
	</div>
)

Intro.propTypes = {
	// title: PropTypes.string.isRequired,
	// subtitle: PropTypes.string.isRequired,
	// likesLabel: PropTypes.string.isRequired,
	// commentsLabel: PropTypes.string.isRequired,
	// pointsLabel: PropTypes.string.isRequired,
	// entries: PropTypes.array.isRequired,
	// maxScore: PropTypes.number.isRequired,
}

export default Intro