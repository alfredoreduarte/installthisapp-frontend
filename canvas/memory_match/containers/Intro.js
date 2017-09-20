import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntroView from 'canvas/memory_match/components/Intro'

class Intro extends Component {
	render(){
		return !this.props.loading ? <IntroView { ...this.props } /> : <p>Loading...</p>
	}
}

const mapStateToProps = state => {
	return {
		image: state.images.intro,
		// linkUrl: `/${window.canvasId}/${window.checksum}/login`
		linkUrl: `/memory_match/${window.checksum}/login`
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)