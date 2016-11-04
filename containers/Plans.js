import React, { PropTypes } from 'react'
import { goBack } from 'react-router-redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { upgrade } from 'actions/billing'
import TakeMoney from 'components/StripeButton'

const ConditionalBuy = ({ upgrade, currentPlan, plan }) => (
	<div>
		{currentPlan ?
			<button
				onClick={() => upgrade(plan)}
				style={{letterSpacing: '1px', fontSize: '12px', fontWeight: '400'}}
				className={`btn text-uppercase ${plan == 'agency_development' ? 'btn-success' : 'btn-primary btn-outline'}`}
			>
				Choose Plan
			</button>
		:
			<TakeMoney planSlug={plan}>
				<button
					style={{letterSpacing: '1px', fontSize: '12px', fontWeight: '400'}}
					className={`btn text-uppercase ${plan == 'agency_development' ? 'btn-success' : 'btn-primary btn-outline'}`}
				>
					Choose Plan
				</button>
			</TakeMoney>
		}
	</div>
)

const Plans = ({ 
	back,
	currentPlan,
	currentPlanName,
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
				You're currently on the {currentPlanName} plan — upgrade, downgrade, or cancel at any time.
			</h4>
		</div>
		<div className="col-md-12" style={{
			display: 'flex',
			justifyContent: 'center'
		}}>
			{plans.map(plan =>
			<div style={{width: '200px', margin: '0px 32px'}} key={plan.stripeId}>
				<div 
					className={`panel text-center ${plan.id == 'agency_development' ? 'panel-success' : 'panel-default'}`}>
					<div className="panel-body">
						<h5 
							className="text-uppercase" 
							style={{marginBottom: '50px', letterSpacing: '1px'}}><b>{plan.name}</b></h5>
						<div className="text-muted" style={{marginBottom: '50px'}}>
							{plan.copy.map(copy => <p key={copy}>{copy}</p>)}
						</div>
						<p style={{marginBottom: '50px'}}>
							<sup>$</sup><span className="h1"><b>{plan.amount}</b></span><sub>/mo</sub>
						</p>
						{currentPlan == plan.stripeId ?
							<button 
								style={{letterSpacing: '1px', fontSize: '12px', fontWeight: '400'}}
								className="btn btn-default text-uppercase">Current plan
							</button>
						:
							<ConditionalBuy upgrade={upgrade} currentPlan={currentPlan} plan={plan.id} />
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
	const currentPlanName = state.admin.subscription ? _.find(plans, {'id': state.admin.subscription}).name : 'Free'
	return {
		currentPlan: state.admin.subscription,
		currentPlanName,
		plans,
	}
}

const mapDispatchToProps = dispatch => ({
	upgrade: plan => dispatch(upgrade(plan)),
	back: () => dispatch(goBack())
})

export default connect(mapStateToProps, mapDispatchToProps)(Plans)