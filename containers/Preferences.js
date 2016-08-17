import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'

class Preferences extends Component {
	render(){
		const {
			children,
			checksum,
			title,
			updateApp,
		} = this.props
		if (title) {
			return (
				<div className="">
					{React.cloneElement(children, { checksum, title })}
				</div>		
			)
		}
		else{
			return <h1>Loading</h1>
		}
	}
}

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentApp(state, props) || {}
	console.log('currenapp', currentApp)
	return {
		title: currentApp.title,
		checksum: currentApp.checksum,
	}
}

const mapDispatchToProps = (state, props) => {
	return {
		updateApp: () => {

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)