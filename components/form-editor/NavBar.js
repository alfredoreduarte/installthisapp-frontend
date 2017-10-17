import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { Link } from 'react-router'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import { APP_EDITOR_FORM_NAME } from 'config'
import { saveAppFromNewEditor } from 'actions/formEditorUI'

const NavBar = ({ saving, handleClose, handleSave }) =>
<div className={`editor-navbar-pain-coat ${saving ? 'busy' : ''}`}>
	<div className="container">
		<div className={`editor-navbar`}>
			<div onClick={handleClose} className="editor-navbar-back">
				<MdArrowBack size={20} /> <span>Back to the dashboard</span>
			</div>
			<button className="editor-navbar-button" disabled={saving} onClick={handleSave}>{saving ? 'Saving...' : 'Save'}</button>
		</div>
	</div>
</div>

const mapStateToProps = (state, props) => {
	return {
		saving: state.form.formEditor.submitting,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleSave: e => dispatch(saveAppFromNewEditor())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)