import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Accordion, AccordionItem } from 'react-sanfona'
import FacebookLogin from 'react-facebook-login'
import { postToApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { installFacebookTab, uninstallFacebookTab } from 'actions/apps'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { pollTopFansEntities } from 'modules/top_fans/actions/entities'

const Integrations = ({ 
	scoreboardLink,
	integrated,
	pageIdentifier,
	advanceWizard,
	steps,
	// Activity indicators
	connectingToFacebook,
	loadingPages,
	installingFacebookTab,
	// 
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
		<div className="col-md-12">
			<div className="text-center">
				<h1 style={{marginTop: '0px'}}>Welcome to your Top Fans App</h1>
				<h4>Let's go through some steps to start tracking your Facebook Page</h4>
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
									autoLoad={false}
									scope={'manage_pages'}
									textButton={connectingToFacebook ? 'Please wait...' : 'Connect to Facebook'}
									fields="name,email,picture"
									cssClass="btn btn-primary btn-sm"
									callback={fbLoginCallback} />
								</div>
								}
							</div>
							<div className="panel-footer text-right">
								<button className="btn btn-primary btn-outline" onClick={() => advanceWizard(1)}  disabled={!fbProfile}>Continue</button>
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
						<div className={`panel-collapse collapse ${steps[1].active ? 'in' : ''}`}>
							<div className="panel-body">
								<p>{tabInstalledInPage ? `Tab installed in ${tabInstalledInPage}` :'Select a Facebook Page to run the Top Fans contest'}</p>
								{tabInstalledInPage ?
								<p>
									<small><a 
										href="javascript:void(0)" 
										// className="btn btn-xs btn-danger"
										className="text-danger"
										disabled={installingFacebookTab}
										onClick={() => uninstallTab()}>
										{installingFacebookTab ? 'Please wait...' : 'Uninstall integration'}
									</a>
									</small>
								</p>
								:
								null
								}
								<div className="col-md-6">
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
								<div className="col-md-6">
									{tabInstalledInPage ?
									null
									:
									<button 
										className="btn btn-primary"
										onClick={() => installTab()} 
										disabled={fbPageIdentifierForIntegration == '' || installingFacebookTab}>
										{installingFacebookTab ? 'Please wait...' : 'Install integration'} 
									</button>
									}
								</div>
							</div>
							<div className="panel-footer text-right">
								<button className="btn btn-primary btn-outline" onClick={() => advanceWizard(2)} disabled={!tabInstalledInPage}>Continue</button>
							</div>
						</div>
					</div>
					<div 
						className={`panel ${steps[2].done ? 'panel-success' : 'panel-default'} ${steps[2].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(2)}>
							<h4 className="panel-title">
								{steps[2].done ? 
								<span className="glyphicon glyphicon-ok"></span>
								:
								<span className="glyphicon glyphicon-saved"></span>
								}
								{' '}<b>Verify</b>
							</h4>
						</div>
						<div className={`panel-collapse collapse ${steps[2].active ? 'in' : ''}`}>
							<div className="panel-body">
								<ul>
									{integrated ?
										<li><s>Go to your <a href={`https://fb.com/${pageIdentifier}`} target="_blank">Facebook Page</a></s></li>
									:
										<li>Go to your <a href={`https://fb.com/${pageIdentifier}`} target="_blank">Facebook Page</a></li>	
									}
									{integrated ?
										<li><s>Like or comment on the most recent post</s></li>
									:
										<li>Like or comment on the most recent post</li>
									}
									{integrated ?
									<li><b>Done!</b></li>
									:
									<li>Please wait...</li>
									}
								</ul>
								{integrated ?
								<p>Now go to the <Link to={scoreboardLink}>Scoreboard</Link> to track scores</p>
								:
								null
								}
							</div>
							<div className="panel-footer text-right">
								{integrated ?
								<Link to={scoreboardLink} className="btn btn-success btn-outline">Go to Scoreboard</Link>
								:
								null
								}
							</div>
						</div>
					</div>
				</div>
				<div className="hide">
				<hr/>
				<p><b>After integrating your app: </b>You might want to make your app publicly available by clicking the <i>Publish</i> button.</p>
				<br/>
				<br/>
				<br/>
				</div>
			</div>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	const fbProfile = state.admin.fbProfile
	const published = getCurrentAppByState(state).status == 'installed'
	const tabInstalledInPage = getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null
	const pageIdentifier = tabInstalledInPage ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).identifier : null
	const integrated = getEntriesForPage(state, props).length > 0
	const steps = [
		{
			active: state.wizardStep == 0,
			done: fbProfile ? true : false,
			disabled: false,
		},
		{
			active: state.wizardStep == 1,
			done: tabInstalledInPage ? true : false,
			disabled: fbProfile ? false : true,
		},
		{
			active: state.wizardStep == 2 || integrated,
			done: integrated,
			disabled: tabInstalledInPage ? false : true,
		}
	]
	return {
		scoreboardLink: `/d/apps/top_fans/${props.params.checksum}/scoreboard`,
		integrated,
		pageIdentifier,
		steps,
		// activity indicators
		installingFacebookTab: state.activityIndicators.installingFacebookTab,
		loadingPages: state.activityIndicators.loadingPages,
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
		// 
		published,
		tabInstalledInPage,
		fbProfile,
		fbPages: getAllPages(state),
		fbPageIdentifierForIntegration: state.admin.fbPageIdentifierForIntegration,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
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
		dispatch(pollTopFansEntities(props.params.checksum))
	}),
	uninstallTab: () => dispatch(uninstallFacebookTab())
})

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)