import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Accordion, AccordionItem } from 'react-sanfona'
import { setAlert } from 'actions/alerts'
import FacebookLogin from 'react-facebook-login'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { postToApi } from 'api'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import { getCurrentAppByState } from 'selectors/apps'
import { installFacebookTab, uninstallFacebookTab, updateAppSettings } from 'actions/apps'
import { getCurrentAppFbPageFeedWebhookIntegration } from 'selectors/appIntegrations'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'
import { editAppSpecificSettings, subscribeToWebhook, unsubscribeFromWebhook } from 'modules/top_fans/actions'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { pollTopFansEntities } from 'modules/top_fans/actions/entities'

const Integrations = ({ 
	progressBarWidth,
	trackFromDate,
	onToggleTrackFromDate,
	onToggleDatePicker,
	onDateChange,
	showDatePicker,
	firstFetchFromDate,
	// 
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
				<h4>Just <b>four steps</b> and you're good to go.</h4>
				<br />
				<br />
			</div>
			<div className="col-md-8 col-md-offset-2">
				<div className="progress">
					<div className={`progress-bar progress-bar-striped active ${progressBarWidth == 100 ? 'progress-bar-success' : 'progress-bar-warning'}`} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{
						width: progressBarWidth + '%'
					}}>
						<span className="sr-only">60% Complete</span>
					</div>
				</div>
			</div>
			<div className="col-md-8 col-md-offset-2">
				<div className="panel-group">
					<div className={`panel ${steps[0].done ? 'panel-success' : 'panel-default'} ${steps[0].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(0)}>
							{fbProfile ? 
								<h4 className="panel-title"><b>1- Connected as {fbProfile.name}</b></h4>
							:
								<h4 className="panel-title"><b>1- Connect with Facebook</b></h4>
							}
						</div>
						<div className={`panel-collapse collapse ${steps[0].active ? 'in' : ''}`}>
							<div className="panel-body">
								{fbProfile ? 
								<div>
								<p>Signed in as: <b>{fbProfile.name}</b></p>
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
								<button className={`btn ${fbProfile ? 'btn-success' : 'btn-default'}`} onClick={() => advanceWizard(1)} disabled={!fbProfile}>Continue</button>
							</div>
						</div>
					</div>
					<div className={`panel ${steps[1].done ? 'panel-success' : 'panel-default'} ${steps[1].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(1)}>
							<h4 className="panel-title">{' '}<b>2- Select a Page</b></h4>
						</div>
						{steps[1].active ? 
							<div className={`panel-collapse collapse in`}>
								<div className="panel-body">
									{ tabInstalledInPage ? <p>Tab installed in {tabInstalledInPage}</p> : null }
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
									<div className="row">
										<div className="col-md-12">
											{tabInstalledInPage ?
											null
											:
											<select 
												className="form-control" 
												value={fbPageIdentifierForIntegration ? fbPageIdentifierForIntegration : ''} 
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
									<button className={`btn ${fbPageIdentifierForIntegration ? 'btn-success' : 'btn-default'}`} onClick={() => advanceWizard(2)} disabled={!fbPageIdentifierForIntegration}>Continue</button>
								</div>
							</div>
						:
						null
						}
					</div>
					<div className={`panel ${steps[2].done ? 'panel-success' : 'panel-default'} ${steps[2].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(2)}>
							<h4 className="panel-title"><b>3- Select a Date</b></h4>
						</div>
						{steps[2].active ? 
							<div className={`panel-collapse collapse in`}>
								<div className="panel-body">
									<div className="row">
										<div className="col-md-6 text-center">
											<h3><b>Count since:</b></h3>
										</div>
										<div className="col-md-6">
											<div className="checkbox">
												<label>
													<input type="radio" name="trackFromDate" checked={!trackFromDate} onChange={() => onToggleTrackFromDate(false)} /> Right now
												</label>
											</div>
										</div>
										<div className="col-md-6">
											<div className="checkbox">
												<label>
													<input type="radio" name="trackFromDate" checked={trackFromDate} onChange={() => onToggleTrackFromDate(true)} /> A past date
												</label>
											</div>
											<div className="form-group">
												<SingleDatePicker 
													id="lafecha"
													placeholder="mm/dd/yyy"
													showDefaultInputIcon={true}
													date={firstFetchFromDate}
													isOutsideRange={day => day.isAfter(moment().subtract(1, 'days')) || day.isBefore(moment().subtract(240, 'days'))}
													disabled={!trackFromDate}
													numberOfMonths={1}
													focused={showDatePicker}
													onDateChange={onDateChange}
													onFocusChange={onToggleDatePicker}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="panel-footer text-right">
									{tabInstalledInPage ?
									<button className="btn btn-success" onClick={() => advanceWizard(3)} disabled={!tabInstalledInPage}>Continue</button>
									:
									<button 
										className="btn btn-primary"
										onClick={() => installTab()} 
										disabled={!fbPageIdentifierForIntegration || installingFacebookTab || (!firstFetchFromDate && trackFromDate)}>
										{installingFacebookTab ? 'Please wait...' : 'Connect'} 
									</button>
									}
								</div>
							</div>
						:
						null
						}
					</div>
					<div className={`panel ${steps[3].done ? 'panel-success' : 'panel-default'} ${steps[3].disabled ? 'panel-disabled' : ''} panel-wizard`}>
						<div className="panel-heading"  onClick={() => advanceWizard(3)}>
							<h4 className="panel-title"><b>4- Verify</b></h4>
						</div>
						<div className={`panel-collapse collapse ${steps[3].active ? 'in' : ''}`}>
							<div className="panel-body text-center" style={{
									lineHeight: 3,
								}}>
								<p>
									{integrated ?
										<s>Like or Comment on <b>your <a href={`https://fb.com/${pageIdentifier}/posts`} target="_blank">latest post</a></b></s>
									:
										<span>Like or Comment on <b>your <a href={`https://fb.com/${pageIdentifier}/posts`} target="_blank">latest post</a></b></span>
									}
								</p>
								<p>
									{integrated ?
										<b className="text-success">Verified! 🚀</b>
									:
										<span className="animated flash" style={{
											WebkitAnimationIterationCount: 'infinite',
											animationIterationCount: 'infinite',
										}}>Nothing detected yet...</span>
									}
								</p>
							</div>
							<div className="panel-footer text-center">
								{integrated ?
								<Link to={scoreboardLink} className="btn btn-success btn-lg">See Scoreboard</Link>
								:
								<button className="btn btn-default btn-lg" disabled>See Scoreboard</button>
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
	// OLD
	// const fbProfile = state.admin.fbProfile
	// const published = getCurrentAppByState(state).status == 'installed'
	// const tabInstalledInPage = getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null
	// const pageIdentifier = tabInstalledInPage ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).identifier : null
	// 
	// Does the user have a linked FB profile?
	const fbProfile = state.admin.fbProfile
	// Is the app currently published?
	const published = getCurrentAppByState(state).status == 'installed'
	// Does it have a tab integration?
	const tabIntegration = getCurrentAppFbPageFeedWebhookIntegration(state)
	const tabIntegrationPageIdentifier = tabIntegration ? tabIntegration.settings.fbPageIdentifier : null
	// Which page is the app integrated with?
	const integratedPage = tabIntegration ? _.find(getAllPages(state), page => parseInt(page.identifier) == tabIntegrationPageIdentifier) : null
	// Did we get at least one activity recorded?
	const receivedData = getEntriesForPage(state, props).length > 0
	const steps = [
		{
			active: state.topFans.wizard.step == 0,
			done: fbProfile ? true : false,
			disabled: false,
		},
		{
			active: state.topFans.wizard.step == 1,
			done: state.admin.fbPageIdentifierForIntegration || integratedPage,
			disabled: fbProfile ? false : true,
		},
		{
			active: state.topFans.wizard.step == 2,
			done: integratedPage ? true : false,
			disabled: state.admin.fbPageIdentifierForIntegration ? false : true,
		},
		{
			active: state.topFans.wizard.step == 3 || integratedPage,
			done: receivedData,
			disabled: integratedPage ? false : true,
		}
	]
	let progressBarWidth
	if (steps[3].done) {
		progressBarWidth = 100
	}
	else if (steps[2].done) {
		progressBarWidth = 70
	}
	else if (steps[1].done) {
		progressBarWidth = 30
	}
	else if (steps[0].done) {
		progressBarWidth = 15
	}
	else {
		progressBarWidth = 10
	}
	return {
		progressBarWidth,
		trackFromDate: state.topFans.wizard.trackFromDate,
		showDatePicker: state.topFans.wizard.showDatePicker,
		firstFetchFromDate: getCurrentAppByState(state).setting.firstFetchFromDate ? moment(getCurrentAppByState(state).setting.firstFetchFromDate) : null,
		// 
		scoreboardLink: `/d/apps/top_fans/${props.params.checksum}/scoreboard`,
		// integrated: integratedPage ? true : false,
		integrated: receivedData,
		pageIdentifier: integratedPage ? integratedPage.identifier : null,
		steps,
		// activity indicators
		installingFacebookTab: state.activityIndicators.installingFacebookTab,
		loadingPages: state.activityIndicators.loadingPages,
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
		// 
		published,
		tabInstalledInPage: integratedPage ? integratedPage.name : null,
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
			dispatch(setAlert('Whoops!', "We're not being able to connect to Facebook. Please disable any ad-blocker or whitelist v3.installthisapp.com, then reload the page. We don't show any ads here anyway 😇"))
		}
	}, 5 * 1000)
	// ! fb verification
	return {
		onToggleTrackFromDate: value => {
			dispatch({
				type: 'WIZARD_TOGGLE_TRACK_FROM_DATE',
				value,
			})
			if (!value) {
				dispatch(editAppSpecificSettings(null))
			}
		},
		onToggleDatePicker: () => dispatch({
			type: 'WIZARD_TOGGLE_DATE_PICKER',
		}),
		onDateChange: date => {
			dispatch(editAppSpecificSettings(date.format()))
			dispatch({
				type: 'WIZARD_TOGGLE_DATE_PICKER'
			})
		},
		// 
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
		installTab: () => dispatch(updateAppSettings()).then(() => {
			// dispatch(installFacebookTab()).then(success => {
			dispatch(subscribeToWebhook()).then(success => {
				if (success) {
					analytics.track('App Installed', {
						appType: 'top_fans',
					})
					dispatch(pollTopFansEntities(props.params.checksum))
				}
			})
		}),
		// uninstallTab: () => dispatch(uninstallFacebookTab())
		uninstallTab: () => dispatch(unsubscribeFromWebhook())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)