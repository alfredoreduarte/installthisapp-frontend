import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Integrations = ({ type, checksum }) => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <h3 className="ita-page-title">Integrations</h3>
      </div>
    </div>
    <hr />
    <div className="col-md-3 text-center">
      <div className="thumbnail">
        <Link to={`/d/apps/${type}/${checksum}/integrations/facebook`}>
          <img src="/images/facebook-logo.png" style={{ marginTop: '20px', height: '100px' }} />
        </Link>
        <div className="caption">
          <h4>Facebook Tab</h4>
          <h6 className="text-uppercase text-success">
            <b>Available</b>
          </h6>
        </div>
      </div>
    </div>
    <div className="col-md-3 text-center">
      <div className="thumbnail">
        <img src="/images/mailchimp-logo.png" className="img-grayscale" style={{ marginTop: '20px', height: '100px' }} />
        <div className="caption">
          <h4>Mailchimp</h4>
          <h6 className="text-uppercase">
            <b>Coming soon</b>
          </h6>
        </div>
      </div>
    </div>
    <div className="col-md-3 text-center">
      <div className="thumbnail">
        <img src="/images/pushido-logo.png" className="img-grayscale" style={{ marginTop: '20px', height: '100px' }} />
        <div className="caption">
          <h4>Pushido notifications</h4>
          <h6 className="text-uppercase">
            <b>Coming soon</b>
          </h6>
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  checksum: ownProps.params.checksum,
  type: ownProps.params.type,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)
