import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { Animate } from 'react-move'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import MdCloud from 'react-icons/lib/md/cloud'
import MdClose from 'react-icons/lib/md/close'
import MdChevronRight from 'react-icons/lib/md/chevron-right'
import FlipCard from 'components/FlipCard'
import FbPhoto from 'components/FbPhoto'
import DestinationCreator from 'leadgen/containers/DestinationCreator'
import SourceCreator from 'leadgen/containers/SourceCreator'
import Destination from 'leadgen/components/Destination'
import Source from 'leadgen/components/Source'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const SuccessModal = ({ 
	sendTest,
	hideDestinationSuccessModal,
	showDestinationSuccessModal,
}) => <Animate
	// Set some default data
	default={{
		scale: .8,
		opacity: 0,
	}}
	// Update your data to whatever you want
	data={{
		scale: 1,
		opacity: 1,
	}}
	duration={800}
	// easing='easeQuadIn'
>
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
			}
		}}
	>
		<MdClose 
			size="16" 
			style={{
				color: 'white',
				cursor: 'pointer',
				position: 'absolute',
				top: '-20px',
				right: '-20px',
			}} onClick={hideDestinationSuccessModal} />
		<h1 className="text-center" style={{fontSize: '24px'}}>Success!</h1>
		<p className="text-center">Now let's send a test lead just to make sure everything's in place</p>
		<div style={{
			padding: '40px 0px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			{showDestinationSuccessModal ? <img className="img-rounded"
			style={{
				width: '100px',
			}} src={`https://graph.facebook.com/${showDestinationSuccessModal.fbPageIdentifier}/picture?type=large`} />
			: null}
			<div style={{
				width: '100px',
				height: '10px',
				background: '#d4f2ff',
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				overflow: 'hidden',
			}}>
				<div className="leadgen-flow"></div>
			</div>
			<div style={{
				width: '100px',
				height: '100px',
				borderRadius: '5px',
				background: '#AFD885',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			}}>
				{showDestinationSuccessModal.destinationType == 'email' ?
					<FaEnvelope size="50" style={{color: 'white'}} />
				: null}
				{showDestinationSuccessModal.destinationType == 'webhook' ?
					<MdCloud size="50" style={{color: 'white'}} />
				: null}
				{showDestinationSuccessModal.destinationType == 'mailchimp' ?
					<img src="/images/third-party-logos/mailchimp.svg" style={{height: '80px'}} />
				: null}
			</div>
		</div>
		<p className="text-center"><a onClick={sendTest} className="btn btn-primary">Send Test Lead</a></p>
	</Modal>
	)}
</Animate>
export default SuccessModal