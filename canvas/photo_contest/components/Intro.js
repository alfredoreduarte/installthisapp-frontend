import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import HeaderImage from 'canvas/photo_contest/components/HeaderImage'
import Credits from 'canvas/photo_contest/components/Credits'

const Intro = ({ intro }) => (
	<div className="col-sm-12">
		<div className="row">
			<Link to={`/photo_contest/${window.checksum}/photos`}>
				<HeaderImage source={intro} />
			</Link>
		</div>
		<Credits />
	</div>
)

Intro.propTypes = {
	intro: PropTypes.string,
}

export default Intro