import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import HeaderImage from 'canvas/trivia/components/HeaderImage'
import Credits from 'canvas/trivia/components/Credits'

const Intro = ({ intro }) => (
	<div className="col-sm-12">
		<div className="row">
			<Link to={`/trivia/${window.checksum}/login`}>
				<HeaderImage source={intro} />
			</Link>
		</div>
		<Credits />
	</div>
)

Intro.propTypes = {
	// intro: PropTypes.string.isRequired,
	intro: PropTypes.string,
	// subtitle: PropTypes.string.isRequired,
	// likesLabel: PropTypes.string.isRequired,
	// commentsLabel: PropTypes.string.isRequired,
	// pointsLabel: PropTypes.string.isRequired,
	// entries: PropTypes.array.isRequired,
	// maxScore: PropTypes.number.isRequired,
}

export default Intro