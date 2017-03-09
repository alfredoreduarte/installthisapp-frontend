import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntroView from 'canvas/photo_contest/components/Intro'

class Intro extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IntroView { ...this.props } /> : <p>Loading...</p>
	}
}

const mapStateToProps = state => {
	return {
		loading: state.images.intro === undefined,
		intro: state.images.intro,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)