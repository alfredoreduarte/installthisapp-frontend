import React from 'react'
import { connect } from 'react-redux'

const Loading = React.createClass({
	render: function() {
		if (this.props.activityIndicators.globalIndicator) {
			return (
				<div
					style={{
						position: 'fixed',
						backgroundColor: 'white',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
						zIndex: 9999,
					}}
				>
					<h4>Loading...</h4>
				</div>
			)
		} else {
			return (
				<div
					style={{
						display: 'none',
						position: 'fixed',
						backgroundColor: 'white',
						// display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
						zIndex: 9999,
					}}
				>
					<h1>Loaded</h1>
				</div>
			)
		}
	}
})

export default connect(state => state)(Loading)