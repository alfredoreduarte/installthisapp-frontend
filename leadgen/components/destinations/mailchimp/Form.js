import React from 'react'
import { Field } from 'redux-form'

const Form = () => 
<div>
	<div className="form-group">
		<label className="control-label">Mailchimp API Key</label>
		<Field
			name={'settings.apiKey'}
			className="form-control"
			type="text"
			component="input" />
		<p className="help-block">You create and copy-paste your MailChimp API Key from <b>Account Settings > Extras > API Keys</b>.</p>
	</div>
	<div className="form-group">
		<label className="control-label">List ID</label>
		<Field
			name={'settings.listId'}
			className="form-control"
			type="text"
			component="input" />
		<span></span>
		<p className="help-block">
			You can find your List ID in your <b>Mailchimp list's Settings</b> pane under <b>List Name & Defaults</b>. 
			Your list ID will be at the top of the right column.
		</p>
	</div>
	<p>
		<a 
		href="http://help.installthisapp.com/lead-ads-integrations/how-to-find-your-mailchimp-api-key-and-list-id" 
		target="_blank">Need Help?</a></p>
</div>

export default Form