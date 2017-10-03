import React, { Component, PropTypes } from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, FieldArray } from 'redux-form'
import { updateInfo } from 'actions/admin'
import FieldsDictionary from 'components/form-editor/FieldsDictionary'

let Editor = ({ array, handleSubmit }) => 
<div className="col-sm-6">
	<form className="form-horizontal" onSubmit={handleSubmit}>
		<div className="form-group">
			<label className="col-sm-2 control-label">Headline</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'messages.formHeading'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<hr />
		<p>
			<a className="btn btn-primary btn-outline" onClick={() => array.push('schema', {
				id: v4(),
				type: 'shortText',
			})}>Add short text</a>
			<a className="btn btn-success btn-outline" onClick={() => array.push('schema', {
				id: v4(),
				type: 'longText',
			})}>Add Long text</a>
			<a className="btn btn-warning btn-outline" onClick={() => array.push('schema', {
				id: v4(),
				type: 'multipleChoice',
				options: [],
			})}>Add multiple choice</a>
		</p>
		<FieldArray name="schema" component={FieldsDictionary} />
		<button type="submit" className="btn btn-primary btn-block">Save</button>
	</form>
</div>

export default Editor