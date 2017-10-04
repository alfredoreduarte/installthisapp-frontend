import React, { Component, PropTypes } from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, FieldArray } from 'redux-form'
import { updateInfo } from 'actions/admin'
import FieldsDictionary from 'components/form-editor/FieldsDictionary'
import ImageUploader from 'components/form-editor/ImageUploader'

const Editor = ({ array, handleSubmit, selectedValues }) => 
<div className="col-sm-6">
	<form className="form-horizontal" onSubmit={handleSubmit}>
		<div className="page-header">
			<h1>Welcome Screen</h1>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Layout</label>
			<div className="col-sm-10">
				<Field name="settings.welcomeLayout" component="select" className="form-control">
					<option value={'flyer'}>Flyer</option>
					<option value={'html'}>Images & Text</option>
				</Field>
			</div>
		</div>
		{selectedValues.welcomeLayout == 'flyer' &&
			<div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Welcome Flyer (820x1200)</label>
					<div className="col-sm-10">
						<Field name={'images.welcome'} component={ImageUploader} />
					</div>
				</div>
			</div>
		}
		{selectedValues.welcomeLayout == 'html' &&
			<div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Header Image</label>
					<div className="col-sm-10">
						<Field name={'images.header'} component={ImageUploader} />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Headline</label>
					<div className="col-sm-10">
						<Field 
							className="form-control"
							name={'messages.welcomeHeadline'} 
							component="input"
							type="text" 
							placeholder={'Welcome to our form'} />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Copy</label>
					<div className="col-sm-10">
						<Field 
							className="form-control"
							name={'messages.welcomeCopy'} 
							component="textarea"
							placeholder={'Welcome to our form'} />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Button</label>
					<div className="col-sm-10">
						<Field 
							className="form-control"
							name={'messages.startButton'} 
							component="input"
							type="text" 
							placeholder={'Start now'} />
					</div>
				</div>
			</div>
		}
		<div className="page-header">
			<h1>Entry Form</h1>
		</div>
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
		<h4>What information would you like to ask for?</h4>
		<div style={{display: 'flex', justifyContent: 'space-around'}}>
			<a className="btn btn-primary btn-outline" onClick={() => array.push('schema', {
				index: 0,
				id: v4(),
				type: 'shortText',
			})}>Add short text</a>
			<a className="btn btn-success btn-outline" onClick={() => array.push('schema', {
				index: 0,
				id: v4(),
				type: 'longText',
			})}>Add Long text</a>
			<a className="btn btn-danger btn-outline" onClick={() => array.push('schema', {
				index: 0,
				id: v4(),
				type: 'email',
			})}>Add Email field</a>
			<a className="btn btn-warning btn-outline" onClick={() => array.push('schema', {
				index: 0,
				id: v4(),
				type: 'multipleChoice',
				options: [],
			})}>Add multiple choice</a>
		</div>
		<FieldArray name="schema" component={FieldsDictionary} />
		<div className="form-group">
			<label className="col-sm-2 control-label">Submit Button</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'messages.submitButton'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<div className="page-header">
			<h1>Legal stuff</h1>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Privacy Policy Link Text</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'messages.privacyPolicyLinkText'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Privacy Policy URL</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'settings.privacyPolicyUrl'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<div className="page-header">
			<h1>"Thank You" screen</h1>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Heading</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'messages.thankYouHeading'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Copy</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'messages.thankYouCopy'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Button</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'messages.finishButton'} 
					component="input"
					type="text" 
					placeholder={'Welcome to our form'} />
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">Website URL</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'settings.finishedUrl'} 
					component="input"
					type="text" 
					placeholder={'http://yourwebsite.com'} />
			</div>
		</div>
		<button type="submit" className="btn btn-primary btn-block">Save</button>
	</form>
</div>

export default Editor