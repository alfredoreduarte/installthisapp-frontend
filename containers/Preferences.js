import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentAppByState } from 'selectors/apps'

class Preferences extends Component {
	render(){
		const {
			children,
			currentApp,
			updateApp,
		} = this.props
		if (currentApp) {
			return (
				<div className="">
					{React.cloneElement(children, { currentApp })}
				</div>		
			)
		}
		else{
			return <h1>Loading</h1>
		}
	}
}

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	return {
		currentApp,
	}
}

const mapDispatchToProps = (state, props) => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)