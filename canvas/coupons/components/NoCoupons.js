import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'

const NoCoupons = ({ messages, images, settings, nextPath, code }) => (
	<div>
		<div className="container-fluid">
			<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
				<h1
					style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>
					{messages.noVouchersHeadline}
				</h1>
				<p
					style={{
						marginBottom: '46px',
					}}>
					{messages.noVouchersCopy}
				</p>
			</div>
		</div>
		<p className="text-center" style={{ marginTop: '46px' }}>
			<a href={settings.privacyPolicyUrl} target="_blank">
				{messages.privacyPolicyLinkText}
			</a>
		</p>
		<Credits />
	</div>
)

NoCoupons.propTypes = {}

export default NoCoupons
