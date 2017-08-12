import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import FlipCard from 'components/FlipCard'
import { Link } from 'react-router'
import FacebookLogin from 'react-facebook-login'
import FaClose from 'react-icons/lib/fa/close'
import FbPhoto from 'components/FbPhoto'
import AppNavBar from 'components/AppNavBar'
import DestinationCreator from 'leadgen/containers/DestinationCreator'
import Destination from 'leadgen/components/Destination'
import Source from 'leadgen/components/Source'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const AdminDashboard = ({ 
	pristine,
	submitting,
	reset,
	change,
	handleSubmit,
	handleDeleteFbLeadform,
	handleDeleteFbLeadDestination,
	handlePageChange,
	// 
	fbProfile,
	connectingToFacebook,
	fbLoginCallback,
	fbLeadforms,
	fbLeadDestinations,
	fbPages,
	fbLeadgenForms,
	// successfulPurchase,
	hideSourcesForm,
	showSourcesForm,
	hideDestinationsForm,
	showDestinationsForm,
	// 
	sourcesFormVisible,
	destinationsFormVisible,
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
				<div className="col-md-12 text-center" style={{marginBottom: '40px'}}>
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
				<div className="col-md-12" style={{display: 'flex', justifyContent: 'space-around'}} >
					<div className="Leadgen-column">
						<FlipCard disabled={true} flipped={sourcesFormVisible} style={{width: '100%'}}>
							<div>
								<div style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: '15px 0px',
								}}>
									<p className="text-center h3" style={{margin: '0px'}}>Sources</p>
									<button className="btn btn-primary btn-sm" onClick={showSourcesForm}>Add Source</button>
								</div>
								{fbLeadforms.length > 0 ? 
									<ul className="list-group" style={{marginBottom: '0px'}}>
										{fbLeadforms.map(fbLeadform =>
											<Source
												key={fbLeadform.id}
												id={fbLeadform.id}
												fbPageName={fbLeadform.fbPageName}
												fbFormId={fbLeadform.fbFormId}
												destinationsAmount={fbLeadform.fbLeadDestinations.length}
												handleDelete={handleDeleteFbLeadform}
											/>
										)}
									</ul>
								: null }
							</div>
							<div className="panel panel-default">
								<div className="panel-body">
									<div style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginBottom: '20px',
									}}>
										<p className="text-center h3" style={{margin: '0px'}}>New Source</p>
										<button type="button" onClick={hideSourcesForm}>x</button>
									</div>
									<form className="" onSubmit={e => {
										return handleSubmit(e).then(() => reset())
									}}>
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
												<option value={''} disabled>-- Form Name --</option>
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
											disabled={pristine || submitting}>Save Source</button>
									</form>
								</div>
							</div>
						</FlipCard>
					</div>
					{fbLeadforms.length ? 
						<div className="Leadgen-column">
							<FlipCard disabled={true} flipped={destinationsFormVisible} style={{width: '100%'}}>
								<div>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '15px 0px',
									}}>
										<p className="text-center h3" style={{margin: '0px'}}>Destinations</p>
										<button className="btn btn-primary btn-sm" onClick={showDestinationsForm}>
											Add Destination
										</button>
									</div>
									{fbLeadDestinations.length > 0 ? 
										<div><ul className="list-group" style={{marginBottom: '0px'}}>
											{fbLeadDestinations.map(fbLeadDestination =>
												<Destination
													key={fbLeadDestination.id}
													id={fbLeadDestination.id}
													destinationType={fbLeadDestination.destinationType}
													fbPageName={fbLeadDestination.fbPageName}
													fbFormId={fbLeadDestination.fbFormId}
													status={fbLeadDestination.status}
													handleDelete={handleDeleteFbLeadDestination}
												/>
											)}
										</ul></div>
									: null }
								</div>
								<div className="panel panel-default">
									<div className="panel-body">
										<div style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: '20px',
										}}>
											<p className="text-center h3" style={{margin: '0px'}}>New Destination</p>
											<button onClick={hideDestinationsForm}>X</button>
										</div>
										<DestinationCreator />
									</div>
								</div>
							</FlipCard>
						</div>
					: null }
				</div>
			</div>
		}
		<ol className="hide">
			<li>Connect with Facebook</li>
			<li>Add a destination</li>
			<li>Select a Source: Page, ad, destination</li>
		</ol>
		<svg width="224" height="660">
			<g fill="none" stroke="#dfe4e9" strokeOpacity="0.52">
				<path d="M0,330.6C89.60000000000001,330.6, 134.4,30.6 224,30.6" strokeWidth="3.5999999999999996"></path>
			</g>
		</svg>
	</div>
)
export default AdminDashboard