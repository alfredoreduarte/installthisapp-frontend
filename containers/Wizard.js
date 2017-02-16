import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Accordion, AccordionItem } from 'react-sanfona'
import { setAlert } from 'actions/alerts'
import FacebookLogin from 'react-facebook-login'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
// import DatePicker from 'react-datepicker'
import { postToApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { installFacebookTab, uninstallFacebookTab, editAppSpecificSettings, updateAppSettings } from 'actions/apps'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { pollTopFansEntities } from 'modules/top_fans/actions/entities'

const Integrations = ({ 
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
				<h4>Just <b>three easy steps</b> and you're good to go.</h4>
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
									<p>{tabInstalledInPage ? `Tab installed in ${tabInstalledInPage}` :'Select a Facebook Page'}</p>
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
										<div className="col-md-12">
											<hr/>
										</div>
										<div className="col-md-6">
											<div className="checkbox">
												<label>
													<input type="checkbox" name="trackFromDate" checked={!trackFromDate} onChange={() => onToggleTrackFromDate(false)} /> Track only new interactions happening from now on
												</label>
											</div>
										</div>
										<div className="col-md-6">
											<div className="checkbox">
												<label>
													<input type="checkbox" name="trackFromDate" checked={trackFromDate} onChange={() => onToggleTrackFromDate(true)} /> Pre-count interactions from a past date and track all the new ones
												</label>
											</div>
											<div className="form-group">
												<SingleDatePicker 
													id="lafecha"
													// placeholderText="Select a date"
													date={firstFetchFromDate}
													isOutsideRange={day => day.isAfter(moment().subtract(1, 'days')) || day.isBefore(moment().subtract(240, 'days'))}
													// maxDate={moment()}
													disabled={!trackFromDate}
													// minDate={moment().subtract(120, "days")}
													numberOfMonths={1}
													// autoFocus={false}
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
									<button className="btn btn-success" onClick={() => advanceWizard(2)} disabled={!tabInstalledInPage}>Continue</button>
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
						:
						null
						}
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
								<ol>
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
									<li>Wait for the app to collect activity...</li>
									}
								</ol>
								{integrated ?
								<p>Now go to the <Link to={scoreboardLink}>Scoreboard</Link> to track scores</p>
								:
								null
								}
							</div>
							<div className="panel-footer text-right">
								{integrated ?
								<Link to={scoreboardLink} className="btn btn-success">Go to Scoreboard</Link>
								:
								<button className="btn btn-success" disabled>Go to Scoreboard</button>
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
			active: state.wizard.step == 0,
			done: fbProfile ? true : false,
			disabled: false,
		},
		{
			active: state.wizard.step == 1,
			done: tabInstalledInPage ? true : false,
			disabled: fbProfile ? false : true,
		},
		{
			active: state.wizard.step == 2 || integrated,
			done: integrated,
			disabled: tabInstalledInPage ? false : true,
		}
	]
	return {
		trackFromDate: state.wizard.trackFromDate,
		showDatePicker: state.wizard.showDatePicker,
		firstFetchFromDate: getCurrentAppByState(state).setting.firstFetchFromDate ? moment(getCurrentAppByState(state).setting.firstFetchFromDate) : null,
		// 
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
			dispatch(installFacebookTab()).then(() => {
				dispatch(pollTopFansEntities(props.params.checksum))
			})
		}),
		uninstallTab: () => dispatch(uninstallFacebookTab())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)