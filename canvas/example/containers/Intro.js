import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as IntroView from 'canvas/example/components/Intro'

class Intro extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IntroView { ...this.props } /> : <p>Loading...</p>
	}
}

const mapStateToProps = state => {
	return {
		image: state.images.intro,
		linkUrl: `/${window.canvasId}/${window.checksum}/login`
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)