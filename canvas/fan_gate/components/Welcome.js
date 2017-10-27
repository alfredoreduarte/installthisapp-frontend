import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import FacebookProvider, { Like } from 'react-facebook'
import Image from 'canvas/common-components/Image'

const Welcome = ({ messages, images, settings, nextPath, isPreview }) => (
	<div>
		<div className="text-center">
			<img
				src={images.welcome}
				style={{
					width: '820px',
					maxWidth: '100%',
				}}
			/>
			<div className="container">
				<div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3" style={{ marginTop: '20px' }}>
					<div className="panel panel-default text-center">
						<div className="panel-body">
							{!isPreview && (
								<FacebookProvider appId={window.facebookAppId}>
									<Like href={settings.likeUrl} layout="box_count" size="large" colorScheme="dark" showFaces share />
								</FacebookProvider>
							)}
							{isPreview && <img src="/images/fake-like-button.png" />}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

Welcome.propTypes = {}

export default Welcome
