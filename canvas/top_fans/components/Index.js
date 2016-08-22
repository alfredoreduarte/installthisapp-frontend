import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import Loading from 'canvas/trivia/components/Loading'
// import CountDown from 'canvas/trivia/components/CountDown'
// import Question from 'canvas/trivia/components/Question'
// import OptionList from 'canvas/trivia/components/OptionList'
// import { advanceCountDown, saveAnswer } from 'canvas/trivia/actions'
// import { getQuestionWithOptions, hasAnsweredAllQuestions } from 'canvas/trivia/selectors/questions'

class Index extends Component {
	componentDidMount() {
		// const { runTime } = this.props
		// this.interval = setInterval(() => {
		// 	runTime()
		// }, 1000)
	}
	componentWillUnmount() {
		// clearInterval(this.interval)
	}
	render(){
		// const { time, question, loading, saveAnswer } = this.props
		return (
			<div className="col-sm-12">
				Top Fans!
			</div>
		)
	}
}

const mapStateToProps = state => {
	// const question = getQuestionWithOptions(state)
	// const { timeOut, countDownRunning, isFetching } = state.settings
	return {
		// time: timeOut,
		// finished: hasAnsweredAllQuestions(state),
		// loading: isFetching,
		// question,
		// countDownRunning,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// saveAnswer: (questionId, optionId, correct) => {
		// 	dispatch(saveAnswer(questionId, optionId, correct))
		// },
		// runTime: () => dispatch(advanceCountDown())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)