import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Accordion, AccordionItem } from 'react-sanfona'
import FacebookLogin from 'react-facebook-login'
import { postToApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { installFacebookTab, uninstallFacebookTab } from 'actions/apps'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'

const Integrations = ({ 
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
		<div className="col-md-6">
			<h4>Facebook Integration {published ? 'true' : 'false'}</h4>
			{tabInstalledInPage ? 
			<div>
				<p className="h5">Done! A tab has been installed in <i>{tabInstalledInPage}</i>, and real-time activity collection is working.</p>
				<p>Now go <b>to the <i>Scoreboard</i> page</b> to see how your contest is going.</p>
			</div>
			:
			<p>Follow these steps to start receiving real-time updates from your page and also get the page tab.</p>
			}
			<hr/>
			<Accordion>
				<AccordionItem 
					className={published ? 'accordion-done' : ''} 
					title={'Publish the app'}
					slug={'publish'}
					expanded={true}>
					<p>Publish the app using the green button at the top right corner of your screen.</p>
				</AccordionItem>
				<AccordionItem 
					title={fbProfile ? `Connected to Facebook: ${fbProfile.name}` : 'Connect with Facebook'} 
					slug={'fbProfile'} 
					className={`${published ? '' : 'accordion-disabled'} ${fbProfile && published ? 'accordion-done' : ''}`}>
					<div>
						<p>Connect with your Facebook profile in order to get permissions to manage your pages from over here.</p>
						<p>After granting the required permissions, wait a moment until your name shows up.</p>
						{fbProfile ? 
						<FacebookLogin
							appId={process.env.FB_APP_ID}
							autoLoad={false}
							scope={'manage_pages'}
							fields="name,email,picture"
							cssClass="btn btn-primary btn-sm"
							textButton="Refresh permissions"
							callback={fbLoginCallback} />
						:
						<FacebookLogin
							appId={process.env.FB_APP_ID}
							autoLoad={false}
							scope={'manage_pages'}
							textButton={connectingToFacebook ? 'Please wait...' : 'Connect to Facebook'}
							fields="name,email,picture"
							cssClass="btn btn-primary btn-sm"
							callback={fbLoginCallback} />
						}
					</div>
				</AccordionItem>
				<AccordionItem 
					title="Fetch your Facebook Pages" 
					slug={'fbPages'} 
					className={`${fbProfile && published ? '' : 'accordion-disabled'} ${fbPages.length > 0 && published ? 'accordion-done' : ''}`}>
					<div>
						{fbPages.length > 0 ? 
						<p>Your {fbPages.length} pages have been fetched. Need to update the list? <a onClick={fetchPages} href="javascript:void(0)">Fetch again</a></p>
						:
						<div>
						<p>Get a list of Facebook to choose from.</p>
						<button 
							className="btn btn-primary btn-sm"
							onClick={fetchPages}
							disabled={!fbProfile || loadingPages}
						>
							{loadingPages ? 'Please wait...' : 'Get your Facebook page list'}
						</button>
						</div>
						}
					</div>
				</AccordionItem>
				<AccordionItem 
					title={tabInstalledInPage ? `Tab installed in ${tabInstalledInPage}` :'Install the page Tab'}
					slug={'install'} 
					className={`${fbPages.length == 0 ? 'accordion-disabled' : ''} ${tabInstalledInPage ? 'accordion-done' : ''} ${!published ? 'accordion-disabled' : ''}`}>
					<div>
						{tabInstalledInPage
						?
						<div>
						<p>Done! The tab is installed</p>
						<a 
							href="javascript:void(0)" 
							className="btn btn-xs btn-danger"
							disabled={installingFacebookTab}
							onClick={() => uninstallTab()}>
							{installingFacebookTab ? 'Please wait...' : 'Uninstall tab and cancel real-time updates'}
						</a>
						</div>
						:
						<div>
						<p>Select one of your Facebook pages and install the integration</p>
						<select 
							className="form-control input-sm" 
							value={fbPageIdentifierForIntegration} 
							onChange={e => selectPage(e.target.value)}
							disabled={fbPages.length == 0 || !published || tabInstalledInPage}
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
						<br/>
						<br/>
						<button 
							className="btn btn-primary"
							onClick={() => installTab()} 
							disabled={fbPageIdentifierForIntegration == '' || installingFacebookTab}>
							{installingFacebookTab ? 'Please wait...' : 'Install integration'} 
						</button>
						</div>
						}
					</div>
				</AccordionItem>
			</Accordion>
		</div>
		<div className="col-md-6 hide">
		</div>
	</div>
)

const mapStateToProps = state => ({
	// activity indicators
	installingFacebookTab: state.activityIndicators.installingFacebookTab,
	loadingPages: state.activityIndicators.loadingPages,
	connectingToFacebook: state.activityIndicators.connectingToFacebook,
	// 
	published: getCurrentAppByState(state).status == 'installed',
	tabInstalledInPage: getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null,
	fbProfile: state.admin.fbProfile,
	fbPages: getAllPages(state),
	fbPageIdentifierForIntegration: state.admin.fbPageIdentifierForIntegration,
})

const mapDispatchToProps = dispatch => ({
	fbLoginCallback: response => dispatch(fbConnect(response)),
	fetchPages: () => dispatch(fetchFacebookPages()),
	selectPage: fbPageIdentifier => {
		dispatch({
			type: 'SET_FB_PAGE_IDENTIFIER_FOR_INTEGRATION',
			payload: fbPageIdentifier,
		})
	},
	installTab: () => dispatch(installFacebookTab()),
	uninstallTab: () => dispatch(uninstallFacebookTab())
})

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)