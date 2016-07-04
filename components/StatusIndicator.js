import React, { Component, PropTypes } from 'react'

const StatusIndicator = ({ active }) => (
	<i className={`ita-status-indicator ${active == true ? 'ita-status-indicator--on' : '' }`}></i>
)

export default StatusIndicator