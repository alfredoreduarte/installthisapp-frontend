import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/form/components/Image'

const Welcome = ({ messages, images, settings, formPath }) => (
	<div>
		{settings.welcomeLayout == 'html' &&
		<div className="col-sm-4 col-md-offset-4 text-center">
			<img src={images.header} className="img-responsive" />
			<h1>{messages.welcomeHeadline}</h1>
			<p>{messages.welcomeCopy}</p>
			<Link 
				to={formPath} 
				className="btn btn-primary btn-block">{messages.startButton}</Link>
		</div>
		}
		{settings.welcomeLayout == 'flyer' &&
		<div className="col-sm-4 col-md-offset-4 text-center">
			<Link to={formPath}>
				<img src={images.welcome} className="img-responsive" />
			</Link>
		</div>
		}
	</div>
)

Welcome.propTypes = {
	
}

export default Welcome