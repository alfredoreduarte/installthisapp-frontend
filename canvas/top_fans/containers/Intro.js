import React, { Component } from 'react'
import IntroView from 'canvas/top_fans/components/Intro'

class Intro extends Component {
	render(){
		const { loading } = this.props
		return !loading ? <IntroView { ...this.props } /> : <p>Loading...</p>
	}
}

export default Intro