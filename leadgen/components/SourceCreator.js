import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const SourceCreator = ({ 
	pristine,
	submitting,
	reset,
	valid,
	change,
	handleSubmit,
	fbPages,
	handlePageChange,
	hasSelectedPage,
	fetchingLeadgenForm,
	fbLeadgenForms,
	fetchLeadgenForms,
	// destinationSettings,
}) => 
<form className="" onSubmit={e => {
	return handleSubmit(e).then(() => reset())
}}>
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
	{hasSelectedPage ? 
	<div className="form-group">
		<label className="control-label">Form</label>
		{fetchingLeadgenForm ? 
			<p>Fetching forms. Please wait...</p>
		:
			<Field name="fbFormId" component="select" className={`form-control ${fbLeadgenForms.length == 0 ? 'hide' : null}`}>
				<option value={''} disabled>-- Form Name --</option>
				{fbLeadgenForms.map(leadgenForm => 
					<option 
						key={leadgenForm.id} 
						value={leadgenForm.id} 
						disabled={leadgenForm.status == "ARCHIVED"}
					>
						{leadgenForm.status == "ARCHIVED" ? '[ARCHIVED] ' : null}
						{leadgenForm.name} | {leadgenForm.locale}
					</option>
				)}
			</Field>
		}
		{fbLeadgenForms.length == 0 && !fetchingLeadgenForm ? 
			<p>This page has no forms. <a href="javascript:void(0);" onClick={() => fetchLeadgenForms(hasSelectedPage)}>Refresh</a></p>
		: null}
	</div>
	: null}
	{hasSelectedPage && fbLeadgenForms.length == 0 && !fetchingLeadgenForm ? 
		<p>Create a <a 
			href={`https://fb.com/${hasSelectedPage}/publishing_tools/?section=LEAD_ADS_FORMS`} 
			target="_blank" rel="noopener">Lead Form</a>?</p>
	: null}
	<div className="form-group">
		<button 
			type="submit" 
			className="btn btn-primary btn-block" 
			disabled={!valid || submitting || fetchingLeadgenForm}>Save Source</button>
	</div>
</form>

export default SourceCreator