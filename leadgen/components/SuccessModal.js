import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { Animate } from 'react-move'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login'
import FaCircleO from 'react-icons/lib/fa/circle-o'
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import MdCloud from 'react-icons/lib/md/cloud'
import MdClose from 'react-icons/lib/md/close'
import MdChevronRight from 'react-icons/lib/md/chevron-right'
import FlipCard from 'components/FlipCard'
import FbPhoto from 'components/FbPhoto'
import StepLabel from 'leadgen/components/StepLabel'
import DestinationCreator from 'leadgen/containers/DestinationCreator'
import SourceCreator from 'leadgen/containers/SourceCreator'
import Destination from 'leadgen/components/Destination'
import Source from 'leadgen/components/Source'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const SuccessModal = ({ testStatus, sendTest, hideDestinationSuccessModal, showDestinationSuccessModal }) => (
	<Animate
		// Set some default data
		default={{
			scale: 0.8,
			opacity: 0,
		}}
		// Update your data to whatever you want
		data={{
			scale: 1,
			opacity: 1,
		}}
		duration={800}
		easing="easeQuadIn">
		{data => (
			<Modal
				isOpen={showDestinationSuccessModal ? true : false}
				onAfterOpen={() => console.log('afteropen')}
				onRequestClose={() => console.log('request close')}
				contentLabel="Modal"
				style={{
					overlay: {
						position: 'fixed',
						opacity: `${data.opacity}`,
						top: '0px',
						left: '0px',
						right: '0px',
						bottom: '0px',
						backgroundColor: 'rgba(80, 88, 98, .9)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					},
					content: {
						transform: `scale(${data.scale})`,
						opacity: `${data.opacity}`,
						overflow: 'visible',
						position: 'absolute',
						top: 'auto',
						left: 'auto',
						right: 'auto',
						bottom: 'auto',
						border: '1px solid rgb(204, 204, 204)',
						background: 'rgb(255, 255, 255)',
						borderRadius: '4px',
						outline: 'none',
						padding: '20px',
						boxShadow: '0px 0px 10px rgba(0,0,0,.1)',
						width: '50%',
						padding: '20px',
					},
				}}>
				<MdClose
					size="16"
					style={{
						color: 'white',
						cursor: 'pointer',
						position: 'absolute',
						top: '-20px',
						right: '-20px',
					}}
					onClick={hideDestinationSuccessModal}
				/>
				<StepLabel number={5} />
				<h1 className="text-center" style={{ fontSize: '24px' }}>
					Test this destination
				</h1>
				<p className="text-center">
					The destination has been saved. Let's just send a test lead to make sure it's receiving data
				</p>
				<div
					style={{
						padding: '40px 0px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{showDestinationSuccessModal ? (
						<img
							className="img-rounded"
							style={{
								width: '100px',
							}}
							src={`https://graph.facebook.com/${showDestinationSuccessModal.fbPageIdentifier}/picture?type=large`}
						/>
					) : null}
					{testStatus.sentToDestinations ? (
						<div
							style={{
								width: '100px',
								height: '10px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<FaCheckCircleO className="text-success animated fadeInUp" size="26" />
						</div>
					) : (
						<div
							style={{
								width: '100px',
								height: '10px',
								background: '#d4f2ff',
								display: 'flex',
								alignItems: 'center',
								position: 'relative',
								overflow: 'hidden',
							}}>
							{testStatus.sent && !testStatus.receivedOnServer ? <div className="leadgen-flow active" /> : null}
						</div>
					)}
					<div
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '5px',
							background: '#AFD885',
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}>
						{showDestinationSuccessModal.destinationType == 'email' ? (
							<FaEnvelope size="50" style={{ color: 'white' }} />
						) : null}
						{showDestinationSuccessModal.destinationType == 'webhook' ? (
							<MdCloud size="50" style={{ color: 'white' }} />
						) : null}
						{showDestinationSuccessModal.destinationType == 'mailchimp' ? (
							<img src="/images/third-party-logos/mailchimp.svg" style={{ height: '80px' }} />
						) : null}
					</div>
				</div>
				{!testStatus.sent && !testStatus.sentToDestinations ? (
					<p className="text-center">
						<a onClick={sendTest} className="btn btn-success">
							Send Test Lead
						</a>
					</p>
				) : null}
				{testStatus.sent && !testStatus.sentToDestinations ? (
					<p className="text-center">
						<a disabled={true} className="btn btn-success">
							Testing...
						</a>
					</p>
				) : null}
				{testStatus.sent && testStatus.sentToDestinations ? (
					<p className="text-center">
						<a onClick={sendTest} className="btn btn-primary btn-outline">
							Test again
						</a>
					</p>
				) : null}
				<hr />
				<ul className="col-md-6 col-md-offset-3 list-unstyled">
					{testStatus.receivedOnServer ? (
						<li>
							<p className="text-success">
								<FaCheckCircleO size="16" className="pull-right" /> Receive Lead from Facebook
							</p>
						</li>
					) : (
						<li>
							<FaCheckCircleO size="16" className="text-muted pull-right" />
							<p className="text-muted">Receive Lead from Facebook</p>
						</li>
					)}
					{testStatus.sentToDestinations ? (
						<li>
							<p className="text-success">
								<FaCheckCircleO size="16" className="pull-right" /> Send to all connected destinations
							</p>
						</li>
					) : (
						<li>
							<FaCheckCircleO size="16" className="text-muted pull-right" />
							<p className="text-muted">Send to all connected destinations</p>
						</li>
					)}
				</ul>
			</Modal>
		)}
	</Animate>
)
export default SuccessModal
