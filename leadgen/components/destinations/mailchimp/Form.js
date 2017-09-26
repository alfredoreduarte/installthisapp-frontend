import React from 'react'
import { Field } from 'redux-form'

const renderField = ({ input, label, type, placeholder, help, meta: { touched, error, warning } }) => (
<div className={`form-group ${touched && ((error && 'has-error') || (warning && 'has-warning'))}`}>
	<label className="control-label">{label}</label>
	<input
		{...input}
		className="form-control"
		placeholder={placeholder}
		type={type}
		required={true} />
	{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
	<p className="help-block">{help}</p>
	<br/>
</div>
)

const Form = () => 
<div>
	<Field
		name={'settings.apiKey'}
		type="text"
		required={true}
		help={<span>You can create and copy-paste your MailChimp API Key from <b>Account Settings > Extras > API Keys</b>.</span>}
		component={renderField}
		label="Mailchimp API Key" />
	<Field
		name={'settings.listId'}
		type="text"
		required={true}
		help={<span>You can find your List ID in your <b>Mailchimp list's Settings</b> pane under <b>List Name & Defaults</b>. Your list ID will be at the top of the right column..</span>}
		component={renderField}
		label="List ID" />
	<p>
		<a 
		href="http://help.installthisapp.com/lead-ads-integrations/how-to-find-your-mailchimp-api-key-and-list-id" 
		target="_blank">Need Help?</a></p>
</div>

export default Form