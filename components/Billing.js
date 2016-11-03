import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import confirm from 'react-confirm2'
import { connect } from 'react-redux'
import { cancel } from 'actions/billing'
import { postToApi, deleteFromApi } from 'api'

const Billing = ({ plan, cancel }) => (
	<div>
		<div className="row">
			<h3 className="ita-page-title">Billing</h3>
			<hr />
		</div>
		<div className="row">
			<div className="col-md-6">
				<h6 className="text-muted text-uppercase">Your Plan</h6>
				<h3>{plan.name} <br/><small>${plan.price} / mo.</small></h3>
				<p>
					<Link to="/d/upgrade" className="btn btn-success" style={{marginRight: '15px'}}>Upgrade Plan</Link>
					{plan.id ? <a href="#" onClick={cancel}><small>Cancel Plan</small></a> : null}
				</p>
			</div>
			<div className="col-md-6 hide">
				<h6 className="text-muted text-uppercase">Card Info</h6>
				<h3>Alfredo Re <br/><small>Visa ending in 4238</small></h3>
				<p>
					<button className="btn btn-sm btn-default" style={{marginRight: '15px'}}>Change Card</button>
				</p>
			</div>
		</div>
		<hr />
		<div className="row hide">
			<div className="col-md-6">
				<h6 className="text-muted text-uppercase">Invoice History</h6>
				<table className="table table-condensed table--plain">
					<tbody>
					{['August', 'September', 'October'].map(month =>
						<tr key={month}>
							<td>{month} 18, 2016</td>
							<td>$29.00</td>
							<td><a href="#">PDF</a></td>
						</tr>
					)}
					</tbody>
				</table>
			</div>
		</div>
	</div>
)

const freePlan = {
	id: null,
	name: "Free",
	price: 0.00
}

const mapStateToProps = state => ({
	plan: state.admin.subscription ? _.find(state.plans, {'id': state.admin.subscription}) : freePlan
})

const mapDispatchToProps = dispatch => ({
	cancel: () => {
		confirm('Sure? This will unpublish all of your apps', {
			done: () => dispatch(cancel()),
			confirmLabel: 'Yup, cancel my plan',
			abortLabel: 'Keep my current plan',
		})
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Billing)