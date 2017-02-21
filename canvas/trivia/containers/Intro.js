import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntroView from 'canvas/trivia/components/Intro'

class Intro extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IntroView { ...this.props } /> : <p>Loading...</p>
	}
}

const mapStateToProps = state => {
	return {
		...state.images,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)