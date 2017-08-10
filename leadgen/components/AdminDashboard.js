import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import FacebookLogin from 'react-facebook-login'
import FaClose from 'react-icons/lib/fa/close'
import FbPhoto from 'components/FbPhoto'
import AppNavBar from 'components/AppNavBar'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const AdminDashboard = ({ 
	pristine,
	submitting,
	reset,
	change,
	handleSubmit,
	handleDeleteFbLeadform,
	handlePageChange,
	// 
	fbProfile,
	connectingToFacebook,
	fbLoginCallback,
	fbLeadforms,
	fbPages,
	fbLeadgenForms,
	// successfulPurchase,
	step,
}) => (
	<div>
		<AppNavBar />
		{!fbProfile ? 
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-default">
					<div className="panel-body text-center">
						<h6 className="text-muted text-uppercase text-muted"><b>Step 1</b></h6>
						<h1>Connect your Facebook Profile</h1>
						<br/>
						<br/>
						<FacebookLogin
							appId={process.env.FB_APP_ID}
							autoLoad={true}
							scope={'manage_pages'}
							textButton={connectingToFacebook ? 'Please wait...' : 'Connect to Facebook'}
							fields="name,email,picture"
							cssClass="btn btn-primary btn-lg"
							callback={fbLoginCallback} />
					</div>
				</div>
			</div>
		:
			<div>
				<div className="col-md-12 text-center" style={{marginBottom: '60px'}}>
					<p><FbPhoto 
						identifier={parseInt(fbProfile.identifier)} 
						width={42} 
						height={42} 
						className="img-circle"
					/></p>
					<h4><b>{fbProfile.name}</b></h4>
					<p><small><FacebookLogin
						appId={process.env.FB_APP_ID}
						autoLoad={false}
						scope={'manage_pages'}
						fields="name,email,picture"
						cssClass=""
						textButton={connectingToFacebook ? 'Please wait...' : 'Refresh permissions'}
						callback={fbLoginCallback}
						tag="a" />
					</small></p>
				</div>
				<div className="col-md-4 col-md-offset-2">
					<div className="panel panel-default">
						<div className="panel-body">
							{fbLeadforms.length > 0 ? 
								<div><ul className="list-group">
									{fbLeadforms.map(fbLeadform =>
										<li 
											key={fbLeadform.fbFormId} 
											className="list-group-item">
												<FaClose 
													size="16" 
													className="text-danger pull-right" 
													style={{cursor: 'pointer'}} 
													onClick={() => {
														if (confirm('Are you sure?')){
															handleDeleteFbLeadform(fbLeadform.id)
														}
													}} 
												/>
												<b>{fbLeadform.fbPageName}</b>: <br/><small>Form ID {fbLeadform.fbFormId}</small>
										</li>
									)}
								</ul><hr/></div>
							: null }	
							<form onSubmit={e => {
								return handleSubmit(e).then(() => reset())
							}}>
								<h4><b>Add Form</b></h4>
								<div className="form-group">
									<label className="control-label">Facebook Page</label>
									<Field name="fbPageIdentifier" component="select" className="form-control"
										onChange={e => {
											handlePageChange(e.target.value)
											change('fbPageIdentifier', e.target.value)
										}}
									>
										<option value={''} disabled>-- Facebook Page --</option>
										{fbPages.map(page => 
											<option key={page.id} value={page.identifier}>{page.name}</option>
										)}
									</Field>
								</div>
								<div className="form-group">
									<label className="control-label">Form</label>
									<Field name="fbFormId" component="select" className="form-control">
										<option value={''} disabled>-- Form Page --</option>
										{fbLeadgenForms.map(leadgenForm => 
											<option 
												key={leadgenForm.id} 
												value={leadgenForm.id} 
												// disabled={leadgenForm.status == "ARCHIVED"}
											>
												{leadgenForm.name} | {leadgenForm.locale}
											</option>
										)}
									</Field>
								</div>
								<button 
									type="submit" 
									className="btn btn-primary btn-block" 
									disabled={pristine || submitting}>Save source</button>
							</form>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="panel panel-default">
						<div className="panel-body">
							<p>Destinations</p>
						</div>
					</div>
				</div>
			</div>
		}
		<ol className="hide">
			<li>Connect with Facebook</li>
			<li>Add a destination</li>
			<li>Select a Source: Page, ad, destination</li>
		</ol>
	</div>
)
export default AdminDashboard