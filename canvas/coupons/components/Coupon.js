import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Credits from 'canvas/common-components/Credits'
import Image from 'canvas/common-components/Image'

const Coupon = ({ messages, images, settings, nextPath, code }) => (
	<div>
		<div className="container-fluid">
			<div className="col-xs-12 col-md-6 col-md-offset-3 text-center">
				<h1
					style={{
						marginTop: '86px',
						marginBottom: '46px',
					}}>
					{messages.voucherScreenHeadline}
				</h1>
				<p
					style={{
						marginBottom: '46px',
					}}>
					{messages.voucherScreenCopy}
				</p>
			</div>
			<div className="container">
				<div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4" style={{ marginTop: '20px' }}>
					<div
						className="panel panel-primary text-center"
						style={{
							boxShadow: '0px 5px 10px rgba(0,0,0,.4)',
						}}>
						<div className="panel-heading">{messages.voucherText}</div>
						<div className="panel-body text-uppercase">
							<b>{code}</b>
						</div>
					</div>
				</div>
			</div>
			<p className="text-center">
				<a href={settings.redeemUrl} target="_blank" rel="noopener" className="btn btn-success">
					{messages.voucherUseButtonLabel}
				</a>
			</p>
			<p className="text-center">
				<a href="javascript:window.print();" className="btn btn-default btn-xs">
					{messages.printButtonlabel}
				</a>
			</p>
		</div>
		<p className="text-center" style={{ marginTop: '46px' }}>
			<a href={settings.privacyPolicyUrl} target="_blank">
				{messages.privacyPolicyLinkText}
			</a>
		</p>
		<Credits />
	</div>
)

Coupon.propTypes = {}

export default Coupon
