import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/form/components/Image'

const Welcome = ({ messages, images, settings, formPath }) => 
<div>
	{settings.welcomeLayout == 'html' &&
		<div>
			<Image source={images.header} />
			<div className="container-fluid">
				<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
					<h1 style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>{messages.welcomeHeadline}</h1>
					<p style={{
						marginBottom: '46px',
					}}>{messages.welcomeCopy}</p>
					<Link 
						to={formPath} 
						className="btn btn-primary btn-lg">{messages.startButton}</Link>
				</div>
			</div>
		</div>
	}
	{settings.welcomeLayout == 'flyer' &&
		<Link to={formPath}>
			<Image source={images.welcome} />
		</Link>
	}
	<p className="text-center" style={{marginTop: '46px'}}>
		<a href={settings.privacyPolicyUrl} target="_blank">
			{messages.privacyPolicyLinkText}
		</a>
	</p>
</div>

Welcome.propTypes = {
	
}

export default Welcome