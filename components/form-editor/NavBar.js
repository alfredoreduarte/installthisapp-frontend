import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { Link } from 'react-router'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import { saveAppFromNewEditor } from 'actions/formEditorUI'

const NavBar = ({ saving, dashboardPath, handleSave }) => (
  <div className={`editor-navbar-paint-coat ${saving ? 'busy' : ''}`}>
    <div className="container">
      <div className={`editor-navbar`}>
        <Link to={dashboardPath} className="editor-navbar-back">
          <MdArrowBack size={20} /> <span>Back to the dashboard</span>
        </Link>
        <button className="editor-navbar-button" disabled={saving} onClick={handleSave}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state, props) => {
  const currentApp = getCurrentAppByState(state)
  return {
    saving: state.form.formEditor.submitting,
    dashboardPath: `/d/apps/${currentApp.applicationType}/${currentApp.checksum}/`,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  handleSave: e => dispatch(saveAppFromNewEditor()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
