import React, { Component, PropTypes } from 'react'

const StatusIndicator = ({ active, status = 'green' }) => (
  <i
    className={`ita-status-indicator ${active == true ? 'ita-status-indicator--on' : ''} ${status == 'red'
      ? 'ita-status-indicator--red'
      : ''}`}
  />
)

export default StatusIndicator
