import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'

const SourceCreator = ({ 
	// Redux-form
	pristine,
	submitting,
	reset,
	valid,
	change,
	// values
	selectedFbPageIdentifier,
	fbPages,
	fetchingLeadgenForms,
	fbLeadgenForms,
	// actions
	handlePageChange,
	fetchLeadgenForms,
	handleSubmit,
}) => 
<form className="" onSubmit={e => handleSubmit(e).then(() => reset())}>
	<div className="form-group">
		<label className="control-label">Facebook Page</label>
		<Field name="fbPageIdentifier" component="select" className="form-control"
			onChange={e => {
				handlePageChange(e.target.value)
				change('fbPageIdentifier', e.target.value)
			}}
		>
			<option value={''} disabled>- Select one -</option>
			{fbPages.map(page => 
				<option key={page.id} value={page.identifier}>{page.name}</option>
			)}
		</Field>
	</div>
	<div className={`form-group ${selectedFbPageIdentifier || 'hide'}`}>
		<label className="control-label">Form</label>
		<Field
			name={'fbFormName'}
			type="hidden"
			component="input" />
		{fetchingLeadgenForms ? 
			<p>Fetching forms. Please wait...</p>
		:
			<Field name="fbFormId" component="select" className={`form-control ${fbLeadgenForms.length == 0 ? 'hide' : null}`}
				onChange={e => {
					const name = _.find(fbLeadgenForms, {'id': e.target.value}).name
					change('fbFormId', e.target.value)
					change('fbFormName', name)
				}}
			>
				<option value={''} disabled>-- Form Name --</option>
				{fbLeadgenForms.map(leadgenForm => 
					<option 
						key={leadgenForm.id} 
						value={leadgenForm.id} 
						label={leadgenForm.name} 
						disabled={leadgenForm.status == "ARCHIVED"}
					>
						{leadgenForm.status == "ARCHIVED" ? '[ARCHIVED] ' : null}
						{leadgenForm.name} | {leadgenForm.locale}
					</option>
				)}
			</Field>
		}
		{selectedFbPageIdentifier && fbLeadgenForms.length == 0 && !fetchingLeadgenForms ? 
			<p>This page has no forms. <a href="javascript:void(0);" onClick={() => fetchLeadgenForms(selectedFbPageIdentifier)}>Refresh</a></p>
		: null}
	</div>
	{fbLeadgenForms.length == 0 && !fetchingLeadgenForms ? 
		<p>Create a <a 
			href={`https://fb.com/${selectedFbPageIdentifier}/publishing_tools/?section=LEAD_ADS_FORMS`} 
			target="_blank" rel="noopener">Lead Form</a>?</p>
	: null}
	<div className="form-group">
		<button 
			type="submit" 
			className="btn btn-primary btn-block" 
			disabled={!valid || submitting || fetchingLeadgenForms}>Save Source</button>
	</div>
</form>

export default SourceCreator