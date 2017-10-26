import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import App from 'components/App'

const AppGrid = ({ apps }) => (
  <div className="col-md-12" style={styles.grid}>
    <div
      className={''}
      style={{
        width: '22%',
        margin: '0px 1.5% 5%',
      }}>
      <Link to="/d/apps/create" className="ita-dashboard-cta">
        <h1>
          <span className="glyphicon glyphicon-file" />
        </h1>
        <h3>New App</h3>
      </Link>
    </div>
    {apps.map(a => (
      <App
        key={a.checksum}
        gridSize="3"
        title={a.title}
        applicationType={a.applicationType}
        id={a.id}
        // facebookPageIdentifier={a.fbPage.identifier}
        checksum={a.checksum}
        updatedOn={a.updatedOn}
        status={a.status}
      />
    ))}
  </div>
)

const styles = {
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}

export default AppGrid
