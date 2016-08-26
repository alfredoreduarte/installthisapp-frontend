import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import IndexView from 'canvas/trivia/components/IndexView'
import { advanceCountDown, saveAnswer } from 'canvas/trivia/actions'
import { getQuestionWithOptions, hasAnsweredAllQuestions } from 'canvas/trivia/selectors/questions'

class Index extends Component {
	componentWillReceiveProps(nextProps) {
		const { runTime, loading, countDownRunning } = nextProps
		if (countDownRunning && !loading) {
			setTimeout(() => {
				runTime()
			}, 1000)
		}
	}
	render(){
		return (
			<IndexView { ...this.props } />
		)
	}
}

const mapStateToProps = state => {
	const question = getQuestionWithOptions(state)
	const { timeOut, countDownRunning, isFetching } = state.settings
	return {
		time: timeOut,
		loading: isFetching,
		question,
		countDownRunning,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveAnswer: (questionId, optionId, correct) => {
			dispatch(saveAnswer(questionId, optionId, correct))
		},
		runTime: () => dispatch(advanceCountDown())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)