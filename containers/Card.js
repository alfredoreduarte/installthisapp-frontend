import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TakeMoney from 'components/StripeButton'

const Card = ({ 
	busy,
	planId,
	onSuccess,
}) => (
	<div className="container-flex container-fullheight container-cancel">
		<div className="col-md-6" style={{
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			color: 'white',
			overflow: 'hidden',
		}}>
			<div className="img-background"></div>
			<div style={{
				display: 'flex',
				alignItems: 'flex-start',
				flexDirection: 'column',
				width: '100%',
				paddingTop: '20px',
			}}>
				<p><b>Install</b>This<b>App</b></p>
			</div>
			<div style={{
				alignItems: 'center',
				flex: '1',
				display: 'flex',
				position: 'relative',
			}}>
				<h1 className="animated fadeInUp text-center" style={{
					fontWeight: '300',
					fontSize: '46px',
					margin: '-50px 0px 0px',
				}}>Start off with a<br />
				<span style={{
					fontWeight: 'bold',
					marginTop: '10px',
					display: 'block',
				}}>50% discount</span></h1>
			</div>
		</div>
		<div className="col-md-6"  style={{display: 'flex', flexDirection: 'column'}}>
			<div className="text-center" style={{display: 'flex', flex: 1}}>
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', padding: '40px 20px'}}>
					<p><span className="h1">Try the Basic plan for 7 days</span></p>
					<p><span className="h4">pay <b>$14.45 instead of 29$</b></span><br/>for the first month and get:</p>
					<ul className="list-unstyled">
						<li><span className="glyphicon glyphicon-ok text-success"></span> <b>5 apps</b></li>
						<li><span className="glyphicon glyphicon-ok text-success"></span> <b>5 teammates</b></li>
						<li><span className="glyphicon glyphicon-ok text-success"></span> <b>in-app support via chat</b></li>
					</ul>
					<p>You'll only be charged after 7 days</p>
					<div>
						<p>
							<TakeMoney planId={planId} onSuccess={onSuccess}>
								<button
									style={{letterSpacing: '1px', fontWeight: '400'}}
									className={`btn text-uppercase btn-primary btn-lg btn-block`}
									disabled={busy}
								>
									{busy ? 'Please wait...' : 'Start free trial'}
								</button>
							</TakeMoney>
						</p>
						<p>
							<small>* You won't be charged until after 7 days.</small><br/>
							<small>* No contracts. Cancel at anytime.</small>
						</p>
					</div>
				</div>
			</div>
			<p className="text-right"><small><a href="/d">Skip the discount, I'll decide later →</a></small></p>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		busy: state.activityIndicators.purchasing,
		planId: state.plans[0].id,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	onSuccess: () => {
		// top.location = 'https://localhost.ssl:5000/d'
		top.location = location.protocol + '//' + window.location.host + '/d'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)