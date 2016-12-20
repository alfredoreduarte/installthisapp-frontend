import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TakeMoney from 'components/StripeButton'

const CardOverlay = ({ 
	busy,
	planId,
	onSuccess,
}) => (
	<div className="container-flex container-fullheight container-cancel ita-flex-justify-center" style={{
		flexDirection: 'column',
		alignItems: 'center',
	}}>
		<div style={{
			border: '1px solid #ccc',
			padding: '40px 20px',
			borderRadius: '3px',
			display: 'flex',
			flexDirection: 'column',
			minWidth: '60vw',
			minHeight: '80vh',
			justifyContent: 'space-between',
		}}>
			<div style={{
				marginBottom: '20px'
			}}>
				<h1 style={{
					textAlign: 'center',
				}}>Try the basic plan for 7 days</h1>
				<p style={{
					textAlign: 'center',
				}}>Pay the first month after 7 days. Cancel whenever you want.</p>
			</div>
			<div>
			<div className="col-md-6">
				<h4>What you'll get:</h4>
				<ul className="list-unstyled">
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>5 campaigns</li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>In-app support via chat</li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>All of our current and <a href="#" target="_blank">upcoming apps</a></li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Facebook Tab integration</li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Standalone public webpage</li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Mobile and desktop views</li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Interface texts 100% customizable</li>
					<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>100% customizable styles and images</li>
				</ul>
			</div>
			<div className="col-md-6 text-center">
				<h5 style={{
					letterSpacing: '1px',
					marginBottom: '0px',
					opacity: .5
				}} className="text-uppercase"><b>One-time offer</b></h5>
				<h2 style={{
					margin: '0px',
				}}><b>50% OFF</b></h2>
				<h4>for the first month by signing up<br/> for the free trial now</h4>
				<h4 style={{
					marginBottom: '0px'
				}}><s>$29/mo</s></h4>
				<h1 style={{
					marginTop: '0px'
				}}>$14.45<sub style={{fontSize: '12px'}}>/mo</sub></h1>
			</div>
			</div>
			<div className="col-md-12 text-center">
				<TakeMoney planId={planId} onSuccess={onSuccess}>
					<button
						style={{letterSpacing: '1px', fontWeight: '400'}}
						className={`btn text-uppercase btn-success btn-lg`}
						disabled={busy}
					>
						{busy ? 'Please wait...' : 'Start free trial'}
					</button>
				</TakeMoney>
			</div>
		</div>
		<div className="col-md-12 text-right hide">
			<a href="#" className="">Skip this, I'll start later without the discount</a>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		busy: state.activityIndicators.purchasing,
		planId: state.plans[0].id,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	
	return {
		onSuccess: () => {
			top.location = location.protocol + '//' + window.location.host + '/d?successful-purchase=true'
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CardOverlay)