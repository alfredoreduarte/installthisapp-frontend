import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Accordion, AccordionItem } from 'react-sanfona'
import { setAlert } from 'actions/alerts'
import FacebookLogin from 'react-facebook-login'
import { postToApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { installFacebookTab, uninstallFacebookTab, updateAppSettings } from 'actions/apps'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'

const IntegrationFacebook = ({ 
	pageIdentifier,
	advanceWizard,
	steps,
	// Activity indicators
	connectingToFacebook,
	loadingPages,
	installingFacebookTab,
	// 
	fbAppId,
	published,
	tabInstalledInPage,
	fbProfile, 
	fbPages, 
	fetchPages, 
	selectPage, 
	installTab, 
	fbPageIdentifierForIntegration, 
	fbLoginCallback, 
	uninstallTab,
}) => (
	<div>
		{published ? 
		<div className="col-md-12">
			<div className="text-center">
				<h1 style={{marginTop: '0px'}}>Display your app in a Facebook Page tab</h1>
				<h4>Just <b>two easy steps</b> and you're good to go.</h4>
				<br />
				<br />
			</div>
			<div className="col-md-8 col-md-offset-2">
				<div className="panel-group">
					<div 
						className={`panel ${steps[0].done ? 'panel-success' : 'panel-default'} ${steps[0].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(0)}>
							<h4 className="panel-title">
								{steps[0].done ? 
								<span className="glyphicon glyphicon-ok"></span>
								:
								<span className="glyphicon glyphicon-user"></span>
								}
								<b>Connect with Facebook</b>
							</h4>
						</div>
						<div className={`panel-collapse collapse ${steps[0].active ? 'in' : ''}`}>
							<div className="panel-body">
								{fbProfile ? 
								<div>
								<p>Signed in as: {fbProfile.name}</p>
								<FacebookLogin
									appId={process.env.FB_APP_ID}
									autoLoad={false}
									scope={'manage_pages'}
									fields="name,email,picture"
									cssClass="btn btn-default btn-xs"
									textButton="Refresh permissions"
									callback={fbLoginCallback} />
								</div>
								:
								<div>
								<p>Sign in with Facebook</p>
								<FacebookLogin
									appId={process.env.FB_APP_ID}
									autoLoad={true}
									scope={'manage_pages'}
									textButton={connectingToFacebook ? 'Please wait...' : 'Connect to Facebook'}
									fields="name,email,picture"
									cssClass="btn btn-primary btn-sm"
									callback={fbLoginCallback} />
								</div>
								}
							</div>
							<div className="panel-footer text-right">
								<button className="btn btn-success" onClick={() => advanceWizard(1)}  disabled={!fbProfile}>Continue</button>
							</div>
						</div>
					</div>
					<div
						className={`panel ${steps[1].done ? 'panel-success' : 'panel-default'} ${steps[1].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(1)}>
							<h4 className="panel-title">
								{steps[1].done ? 
								<span className="glyphicon glyphicon-ok"></span>
								:
								<span className="glyphicon glyphicon-link"></span>
								}
								{' '}<b>Select a Facebook Page</b>
							</h4>
						</div>
						{steps[1].active ? 
							<div className={`panel-collapse collapse in`}>
								<div className="panel-body">
									<p>{tabInstalledInPage 
									? 
										<span>Tab installed in <a href={`https://fb.com/${pageIdentifier}/app/${fbAppId}`} target="_blank">{tabInstalledInPage}</a></span>
									:
										'Select a Facebook Page'}</p>
									{tabInstalledInPage ?
									<p>
										<small><a 
											href="javascript:void(0)" 
											// className="btn btn-xs btn-danger"
											className="text-danger"
											disabled={installingFacebookTab}
											onClick={() => uninstallTab()}>
											{installingFacebookTab ? 'Please wait...' : 'Uninstall tab'}
										</a>
										</small>
									</p>
									:
									null
									}
									<div className="row">
										<div className="col-md-12">
											{tabInstalledInPage ?
											null
											:
											<select 
												className="form-control" 
												value={fbPageIdentifierForIntegration} 
												onChange={e => selectPage(e.target.value)}
												disabled={fbPages.length == 0 || tabInstalledInPage}
												>
													<option value={''} disabled>-- Facebook Page --</option>
													{fbPages.map(page => 
														<option 
														key={page.id} 
														value={page.identifier}>
															{page.name}
														</option>
													)}
											</select>
											}
										</div>
									</div>
								</div>
								<div className="panel-footer text-right">
									{tabInstalledInPage ?
									null
									:
									<button 
										className="btn btn-primary"
										onClick={() => installTab()} 
										disabled={fbPageIdentifierForIntegration == '' || installingFacebookTab}>
										{installingFacebookTab ? 'Please wait...' : 'Install tab'} 
									</button>
									}
								</div>
							</div>
						:
						null
						}
					</div>
				</div>
			</div>
		</div>
		:
		<div className="col-md-12">
			<div className="page-header">
				<h1 className="text-center" style={{marginTop: '0px'}}>Display your app in a Facebook Page tab</h1>
			</div>
			<br/>
			<br/>
			<div className="alert alert-warning" role="alert"><b>Step required:</b> Please publish your app first, using the green <i>Publish</i> button at the top.</div>
		</div>
		}
	</div>
)

const mapStateToProps = (state, props) => {
	const fbProfile = state.admin.fbProfile
	const published = getCurrentAppByState(state).status == 'installed'
	const tabInstalledInPage = getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null
	const pageIdentifier = tabInstalledInPage ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).identifier : null
	const steps = [
		{
			active: state.wizard.step == 0 && !tabInstalledInPage,
			done: fbProfile ? true : false,
			disabled: false,
		},
		{
			active: state.wizard.step == 1 || tabInstalledInPage,
			done: tabInstalledInPage ? true : false,
			disabled: fbProfile ? false : true,
		},
	]
	return {
		pageIdentifier,
		steps,
		// activity indicators
		installingFacebookTab: state.activityIndicators.installingFacebookTab,
		loadingPages: state.activityIndicators.loadingPages,
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
		// 
		fbAppId: tabInstalledInPage ? getCurrentAppByState(state).fbApplication.appId : null,
		published,
		tabInstalledInPage,
		fbProfile,
		fbPages: getAllPages(state),
		fbPageIdentifierForIntegration: state.admin.fbPageIdentifierForIntegration,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	// fb verification: The fbLoaded var is created at dashboard.ejs
	setTimeout(function() {
		if (!fbLoaded) {
			console.log('UNABLE TO LOAD FB SCRIPT')
			dispatch(setAlert('Whoops!', "We're not being able to connect to Facebook. Please disable any ad-blocker and reload the page. We don't show any ads here anyway 😇"))
		}
	}, 5 * 1000)
	// ! fb verification
	return {
		advanceWizard: step => dispatch({
			type: 'UPDATE_WIZARD_STEP',
			step,
		}),
		fbLoginCallback: response => dispatch(fbConnect(response)),
		fetchPages: () => dispatch(fetchFacebookPages()),
		selectPage: fbPageIdentifier => {
			dispatch({
				type: 'SET_FB_PAGE_IDENTIFIER_FOR_INTEGRATION',
				payload: fbPageIdentifier,
			})
		},
		installTab: () => dispatch(installFacebookTab()).then(() => {
			console.log('tab instalado!')
		}),
		uninstallTab: () => dispatch(uninstallFacebookTab())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationFacebook)