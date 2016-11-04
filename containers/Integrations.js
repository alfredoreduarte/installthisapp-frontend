import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { postToApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { installFacebookTab, uninstallFacebookTab } from 'actions/apps'
import { fbConnect } from 'actions/admin'
import { getAllPages } from 'selectors/pages'
import { fetchFacebookPages } from 'actions/pages'

const Integrations = ({ 
	published,
	tabInstalledInPage,
	fbProfile, 
	fbPages, 
	fetchPages, 
	selectPage, 
	installTab, 
	fbPageIdentifierForIntegration, 
	fbLoginCallback, 
	uninstallTab
}) => (
	<div>
		<div className="col-md-6">
			<h4>Integrate this app with your Facebook Page</h4>
			<p>This will install a page Tab, and also subscribe the app to the timeline's real-time updates.</p>
			<div className="panel panel-default">
				<div className="panel-body">
					<p className={published ? 'text-muted' : ''}>1 - Publish the app</p>
					{fbProfile ? 
						<p className="text-muted">
							2- Connected Facebook profile:{' '}
							<a 
								href={`https://fb.com/${fbProfile.identifier}`} 
								target="_blank">{fbProfile.name}</a>
							<FacebookLogin
								appId={process.env.FB_APP_ID}
								autoLoad={false}
								scope={'manage_pages'}
								fields="name,email,picture"
								cssClass="btn btn-default btn-sm"
								textButton="Refresh permissions"
								callback={fbLoginCallback} />
						</p>
					:
					null}
					{published && fbProfile == null ?
						<p className={fbPages.length > 0 || !published ? 'text-muted' : null}>2- <FacebookLogin
						appId={process.env.FB_APP_ID}
						autoLoad={false}
						scope={'manage_pages'}
						fields="name,email,picture"
						cssClass="btn btn-primary btn-sm"
						callback={fbLoginCallback} /></p>
					: null}
					<p className={!fbProfile ? 'text-muted' : null}>
						3- <button 
							className="btn btn-default btn-sm" 
							onClick={fetchPages} 
							disabled={!fbProfile}
							>
							Get your Facebook page list
							</button>
					</p>
					<p className={fbPages.length == 0 || !published || tabInstalledInPage ? 'text-muted' : null}>
						4- Select a Facebook Page:
					</p>
					<p>
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
					</p>
					<hr/>
					<p>
						{tabInstalledInPage
						?
						<button 
							className="btn btn-danger" 
							onClick={() => uninstallTab()}>Cancel integration</button>
						:
						<button 
							className="btn btn-primary" 
							onClick={() => installTab()} 
							disabled={fbPageIdentifierForIntegration == ''}>Install integration</button>
						}
					</p>
				</div>
			</div>
		</div>
		<div className="col-md-6">
			<br/>
			<br/>
			<h5><u>Detailed Instructions</u></h5>
			<ul>
				<li>1- Publish the app using the green button at the top</li>
				<li>2- Connect with your Facebook profile in order to get permissions to manage your pages from over here. After granting the required permissions, wait a moment until your name shows up at the left.</li>
				<li>3- Once your name is beign shown at the left, click the <i>Get your Facebook pages list</i> button and wait a couple of seconds until we can list all of your Facebook pages. </li>
				<li>4- Once all of your pages show up at the menu at step <i>4</i>, select one in order to install the page Tab there.</li>
				<li>5- Finally, click the <i>Install Integration</i> button and give it a couple of seconds to complete the task</li>
			</ul>
			<p>Once the Page Tab is installed, you can go to your Facebook page and see the tab for yourself.</p>
			<p>You can also share a URL to the standalone version (for mobile users), it's the one at the <i>Go to app</i> link at the top left.</p>
		</div>
	</div>
)

const mapStateToProps = state => ({
	published: getCurrentAppByState(state).status == 'installed',
	tabInstalledInPage: getCurrentAppByState(state).page,
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
		// postToApi('applications/RZ2CA4/install_tab.json', {
		// 	fbPageIdentifier: fbPageIdentifierForIntegration
		// })
		// .then(json => {
		// 	console.log(json)
		// })
	// },
	uninstallTab: () => dispatch(uninstallFacebookTab())
		// postToApi('applications/RZ2CA4/uninstall_tab.json')
		// .then(json => {
		// 	console.log(json)
		// })
	// }
})

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)