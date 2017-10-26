import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { IndexLink } from 'react-router'
import { logOut } from 'actions/admin'
import FbPhoto from 'components/FbPhoto'
import StatusIndicator from 'components/StatusIndicator'

const AppNavBar = ({ adminId, name, identifier, logout, subscription, remainingTrialDays, showLeadgen }) => (
  <div className="AppNavBar">
    <a className="AppNavBar-IndexLink" href="/leadgen">
      <img src="/images/pipelead/logo-lila.png" style={{ height: '28px' }} />
    </a>
    <div className="AppNavBar-MenuBar">
      <ul className="list-unstyled AppNavBar-MenuList" />
      <ul className="nav navbar-nav navbar-right AppNavBar-MenuList">
        {showLeadgen ? (
          <li className={subscription ? 'hide' : null}>
            <a href="?offer=trial-ended" className="link-no-underline text-success">
              <small>{remainingTrialDays} | UPGRADE</small>
            </a>
          </li>
        ) : null}
        <NavDropdown
          eventKey={3}
          id="account-dropdown"
          title={
            identifier ? (
              <FbPhoto identifier={parseInt(identifier)} width={42} height={42} className="img-circle" />
            ) : (
              <img src={`/images/user-placeholders/${adminId % 8}.png`} width="42px" height="42px" />
            )
          }>
          <MenuItem eventKey={3.3} href="/d/account">
            <span>
              My Account
              {name ? (
                <span />
              ) : (
                <span style={{ marginLeft: '5px' }}>
                  <StatusIndicator active={true} status={'red'} />
                </span>
              )}
            </span>
          </MenuItem>
          <MenuItem eventKey={3.2} href="javascript:void(0)" onClick={logout}>
            Logout
          </MenuItem>
        </NavDropdown>
      </ul>
    </div>
  </div>
)

const mapStateToProps = state => {
  const timeDifference = 7 - moment().diff(moment(state.admin.createdAt), 'days')
  const remainingTrialDays = timeDifference > 0 ? <b>{timeDifference} days remaining</b> : <b>Free trial expired</b>
  return {
    name: state.admin.name,
    adminId: state.admin.id,
    subscription: state.admin.subscription,
    identifier: state.admin.fbProfile ? state.admin.fbProfile.identifier : null,
    remainingTrialDays,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar)
