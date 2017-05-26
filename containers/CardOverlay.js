import React from 'react'
import { connect } from 'react-redux'
import TakeMoney from 'components/StripeButton'
import { getBasicPlanIfExists } from 'selectors/plans'

const CardOverlay = ({ 
	busy,
	plan,
	onSuccess,
}) => (
	<div className="container-flex container-fullheight container-cancel ita-flex-justify-center" style={{
		flexDirection: 'column',
		alignItems: 'center',
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(255,255,255,.5)',
		zIndex: 1,
	}}>
		<div style={{
			border: '1px solid #ddd',
			boxShadow: '0px 12px 25px rgba(0,0,0,.1)',
			padding: '40px 20px',
			borderRadius: '3px',
			display: 'flex',
			flexDirection: 'column',
			minWidth: '60vw',
			minHeight: '85vh',
			justifyContent: 'space-between',
			backgroundColor: 'white',
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
				<ul className="list-unstyled" style={{lineHeight: 1.8}}>
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
				{plan ? 
				<TakeMoney planId={plan.id} onSuccess={onSuccess} couponCode="trial-offer">
					<button
						style={{letterSpacing: '1px', fontWeight: '400'}}
						className={`btn text-uppercase btn-success btn-lg`}
						disabled={busy}
					>
						{busy ? 'Please wait...' : 'Start free trial'}
					</button>
				</TakeMoney>
				:
					<button className="btn btn-primary btn-lg" disabled>No plans currently available</button>
				}
				<div className="col-md-12 text-right" style={{marginTop: '20px'}}>
					<a href="/d" className="" style={{
						fontSize: '11px'
					}}>Skip this, I'll start later without the discount</a>
				</div>
			</div>
		</div>
		<div className="col-md-12 text-right hide">
			<a href="#" className="">Skip this, I'll start later without the discount</a>
		</div>
	</div>
)

const mapStateToProps = (state, props) => ({
	busy: state.activityIndicators.purchasing,
	plan: getBasicPlanIfExists(state),
})

const mapDispatchToProps = (dispatch, props) => ({
	onSuccess: () => {
		analytics.track('Trial Offer Purchased', () => {
			top.location = location.protocol + '//' + window.location.host + '/d?successful-purchase=true'
		})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CardOverlay)