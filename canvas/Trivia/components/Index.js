import React, { Component } from 'react'
import { connect } from 'react-redux'
import CountDown from './CountDown'
import Question from './Question'
import OptionList from './OptionList'
import { advanceCountDown, toggleCountDown, postAnswers, setChecksum } from 'canvas/Trivia/actions'
import { getUnansweredQuestion, getQuestionWithOptions } from 'canvas/Trivia/selectors/questions'

class Index extends Component {
	componentDidMount() {
		let interval = setInterval(() => {
			if (this.props.time > 0 && this.props.countDownRunning) {
				this.props.startCounter()
			}
			else{
				this.props.toggleCountDown()
				this.props.postAnswers()
				clearInterval(interval)
			}
		}, 1000)
	}
	render(){
		const { time, question, loading } = this.props
		return (
			<div className="col-sm-12">
				{loading 
				? <h1>Loading</h1>
				: <div>
				<CountDown time={time} />
				<Question text={question.text} />
				<OptionList options={question.options} />
				</div>}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	const conOptions = getQuestionWithOptions(state)
	return {
		time: state.settings.timeOut,
		countDownRunning: state.settings.countDownRunning,
		question: getQuestionWithOptions(state),
		loading: state.settings.isFetching,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	console.log('elcheckcito', props.location.query.checksum)
	dispatch(setChecksum(props.location.query.checksum))
	return {
		startCounter: () => dispatch(advanceCountDown()),
		toggleCountDown: () => dispatch(toggleCountDown()),
		postAnswers: () => dispatch(postAnswers()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)