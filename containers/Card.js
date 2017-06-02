// 
// @Card
// 
// Pantalla fullscreen con foto de soporte
// plan: basic
// coupon: trial-offer
// 
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TakeMoney from 'components/StripeButton'
import { getBasicPlanIfExists } from 'selectors/plans'

const Card = ({ 
	busy,
	plan,
	onSuccess,
}) => (
	<div className="container-flex container-fullheight container-cancel" style={{
		position: 'fixed',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		zIndex: 2000,
		background: 'white',
	}}
	>
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
				paddingLeft: '20px',
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
		<div className="col-md-6"  style={{display: 'flex', flexDirection: 'column', paddingRight: '20px'}}>
			<div className="text-center" style={{display: 'flex', flex: 1}}>
				<p className="text-right" style={{position: 'absolute', top: '10px', right: '30px'}}><small><a href="/d">Skip the discount, I'll decide later →</a></small></p>
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', padding: '40px 20px'}}>
					<p><span className="h6 text-uppercase text-muted" style={{letterSpacing: '1px'}}><b>One-time offer</b></span><br/><span className="h1">Try the Basic plan for 7 days</span></p>
					
					<p><span className="h2"><b>50% OFF</b></span><br/>for the first month <br/> <small>$14.45 instead of $29</small></p>
					<div className="col-md-6 col-md-offset-3">
					<p>What you'll get:</p>
					<ul className="list-unstyled text-left" style={{lineHeight: 1.8}}>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>5 contests</li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>In-app support via chat</li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>All of our current and <a href="https://installthisapp.com/apps" target="_blank">upcoming apps</a></li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Facebook Tab integration</li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Standalone public webpage</li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Mobile and desktop views</li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>Interface texts 100% customizable</li>
						<li><span style={{marginRight: '5px'}} className="glyphicon glyphicon-ok text-success"></span>100% customizable styles and images</li>
					</ul>
					</div>
					<p className="hide"><b>You'll only be charged after 7 days</b></p>
					<p><b>Start now. Pay in 7 days. Cancel at anytime.</b></p>
					{plan ? 
						<div>
							<p>
								<TakeMoney planId={plan.id} onSuccess={onSuccess} couponCode="trial-offer">
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
					:
						<button className="btn btn-primary btn-lg" disabled>No plans currently available</button>
					}
				</div>
			</div>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		busy: state.activityIndicators.purchasing,
		plan: getBasicPlanIfExists(state),
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	onSuccess: () => {
		analytics.track('Trial Offer Purchased', () => {
			top.location = location.protocol + '//' + window.location.host + '/d?successful-purchase=true'
		})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)