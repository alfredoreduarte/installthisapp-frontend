import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateInfo } from 'actions/admin'

let Password = ({ handleSubmit, fetching }) => (
  <form onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-4">
        <h3 className="ita-page-title">Update your password</h3>
      </div>
      <div className="col-md-8 text-right">
        <button type="submit" className="btn btn-sm btn-primary btn-outline" disabled={fetching}>
          {fetching ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
    <hr />
    <div className="row">
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="form-horizontal">
              <div className="form-group">
                <div className="col-md-4">
                  <label className="control-label">Current Password</label>
                </div>
                <div className="col-md-8">
                  <Field name="currentPassword" required={true} type="password" className="form-control" component="input" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-4">
                  <label className="control-label">Password</label>
                </div>
                <div className="col-md-8">
                  <Field name="password" required={true} type="password" className="form-control" component="input" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-4">
                  <label className="control-label">Confirm Password</label>
                </div>
                <div className="col-md-8">
                  <Field name="passwordConfirmation" required={true} type="password" className="form-control" component="input" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
)

Password = reduxForm({
  form: 'adminUserProfile',
})(Password)

const mapStateToProps = state => ({
  fetching: state.activityIndicators.updatingAdmin,
  initialValues: state.admin,
})

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: e => {
      e.preventDefault()
      dispatch(updateInfo())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
