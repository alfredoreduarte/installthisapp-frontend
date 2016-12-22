import React, { PropTypes } from 'react'
import { goBack } from 'react-router-redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { upgrade, simulatePurchase } from 'actions/billing'
import TakeMoney from 'components/StripeButton'

const ConditionalBuy = ({ busy, upgrade, currentPlan, planId, featured }) => (
	<div>
		{currentPlan.stripeId == 'free' ?
			<TakeMoney planId={planId}>
				<button
					style={{letterSpacing: '1px', fontSize: '12px', fontWeight: '400'}}
					className={`btn text-uppercase ${featured ? 'btn-success' : 'btn-primary btn-outline'}`}
					disabled={busy}
				>
					{busy ? 'Please wait...' : 'Choose Plan'}
				</button>
			</TakeMoney>
		:
			<button
				onClick={() => upgrade(planId)}
				style={{letterSpacing: '1px', fontSize: '12px', fontWeight: '400'}}
				className={`btn text-uppercase ${featured ? 'btn-success' : 'btn-primary btn-outline'}`}
				disabled={busy}
			>
				{busy ? 'Please wait...' : 'Choose Plan'}
			</button>
		}
	</div>
)

const Plans = ({ 
	busy,
	back,
	currentPlan,
	plans,
	upgrade,
}) => (
	<div>
		<div className="col-md-12">
			<div className="page-header">
				<a href="#" onClick={back}><small>⃪ Back</small></a>
				<h1 className="text-center">Let's get you on the right plan!</h1>
			</div>
			<h4 
				className="text-center text-muted"
				style={{marginBottom: '50px'}}
			>
				You're currently on the {currentPlan.name} plan — upgrade, downgrade, or cancel at any time.
			</h4>
		</div>
		<div className="col-md-12" style={{
			display: 'flex',
			justifyContent: 'center'
		}}>
			{plans.length == 0 ? <h4>There are no subscription plans at this time.</h4> : null}
			{plans.map(plan =>
			<div style={{width: '200px', margin: '0px 32px'}} key={plan.stripeId}>
				<div 
					className={`panel text-center ${plan.id == 'agency_development' ? 'panel-success' : 'panel-default'}`}>
					<div className="panel-body">
						<h5 
							className="text-uppercase" 
							style={{marginBottom: '50px', letterSpacing: '1px'}}><b>{plan.name}</b></h5>
						<div className="text-muted" style={{marginBottom: '50px'}}>
							{plan.copy ? plan.copy.map(copy => <p key={copy}>{copy}</p>) : null}
						</div>
						<p style={{marginBottom: '50px'}}>
							<sup>$</sup><span className="h1"><b>{plan.amount}</b></span><sub>/mo</sub>
						</p>
						{currentPlan.stripeId == plan.stripeId ?
							<button 
								style={{letterSpacing: '1px', fontSize: '12px', fontWeight: '400'}}
								disabled
								className="btn btn-default text-uppercase"
							>
								Current Plan
							</button>
						:
							<ConditionalBuy busy={busy} upgrade={upgrade} currentPlan={currentPlan} planId={plan.id} featured={plan.stripeId == 'agency_development'} />
						}
					</div>
				</div>
			</div>
			)}
		</div>
	</div>
)

const mapStateToProps = state => {
	const plans = state.plans
	return {
		busy: state.activityIndicators.purchasing,
		currentPlan: state.admin.subscription ? _.find(state.plans, {'id': state.admin.subscription.planId}) : {name: 'Free', stripeId: 'free'},
		plans,
	}
}

const mapDispatchToProps = dispatch => ({
	upgrade: plan => dispatch(upgrade(plan)),
	back: () => dispatch(goBack()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Plans)