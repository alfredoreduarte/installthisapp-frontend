import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import { connect } from 'react-redux'
import { postToApi } from 'api'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'
import { fetchFacebookPages } from 'actions/pages'

const Subscribe = ({
	fbProfile,
	fbPages,
	fbPageIdentifier,
	subscribe,
	fbLoginCallback,
	fetchPages,
	selectPage,
}) => (
	<div className="col-md-6">
	<h4>Activate real-time updates on your Facebook Page</h4>
	<div className="panel panel-default">
	<div className="panel-body">
		{fbProfile ? 
			<p className="text-muted">1- Connected Facebook profile: {fbProfile.name}</p>
		:
			<p>1- <FacebookLogin
			appId={process.env.FB_APP_ID}
			autoLoad={false}
			scope={'manage_pages'}
			fields="name,email,picture"
			className="btn btn-primary"
			callback={fbLoginCallback} /></p>
		}
		<br/>
		<p className={fbPages.length >= 0 ? 'text-muted' : null}>2- <button className="btn btn-default" onClick={fetchPages} disabled={fbPages.length >= 0}>Get my Facebook pages</button></p>
		<br/>
		{fbPages.length > 0 ? 
			<div>
				<p>3- Select Facebook Page to subscribe: </p>
				<select className="form-control" value="null" onChange={e => selectPage(e.target.value)}>
					<option value="null" disabled>Select Your Page</option>
					{fbPages.map(page => <option key={page.id} value={page.identifier}>{page.name}</option>)}
				</select>
				<br/>
				<button className="btn btn-primary" onClick={() => subscribe(fbPageIdentifier)} disabled={fbPages.length == 0}>Subscribe</button>
			</div>
		:
			null
		}
	</div>
	</div>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	return { 
		fbProfile: state.admin.fbProfile,
		fbPages: getAllPages(state),
		fbPageIdentifier: currentApp.setting.subscriptedFbPageIdentifier,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		subscribe: () => {
			postToApi('applications/4BJ5M4/subscribe_real_time.json', {
				fbPageIdentifier: fbPageIdentifierForIntegration
			})
			.then(json => {
				console.log(json)
			})
		},
		fbLoginCallback: response => {
			postToApi('fb_profiles.json', {
				signedRequest: response.signedRequest
			})
			.then(json => {
				console.log(json)
			})
		},
		fetchPages: () => {
			dispatch(fetchFacebookPages())
		},
		selectPage: identifier => {
			console.log('selected', identifier)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)