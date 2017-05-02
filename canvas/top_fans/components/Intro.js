import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'
import Credits from 'canvas/top_fans/components/Credits'

const Intro = ({ intro }) => (
	<div className="col-sm-12">
		<div className="row">
			{window.canvasId ?
				<Link to={`/${window.canvasId}/${window.checksum}/scores`}>
					<HeaderImage source={intro} />
				</Link>
			:
				<HeaderImage source={intro} />
			}
		</div>
		<Credits />
	</div>
)

Intro.propTypes = {
	// intro: PropTypes.string.isRequired,
	// subtitle: PropTypes.string.isRequired,
	// likesLabel: PropTypes.string.isRequired,
	// commentsLabel: PropTypes.string.isRequired,
	// pointsLabel: PropTypes.string.isRequired,
	// entries: PropTypes.array.isRequired,
	// maxScore: PropTypes.number.isRequired,
}

export default Intro