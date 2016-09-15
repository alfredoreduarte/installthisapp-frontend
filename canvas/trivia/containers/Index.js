import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { advanceCountDown, saveAnswer } from 'canvas/trivia/actions'
import { getQuestionWithOptions, hasAnsweredAllQuestions } from 'canvas/trivia/selectors/questions'
import Loading from 'canvas/trivia/components/Loading'
import IndexView from 'canvas/trivia/components/Index'

let primeravez = false

class Index extends Component {
	componentWillReceiveProps(nextProps) {
		const { runTime, loading, countDownRunning, time } = nextProps
		console.log('lol', this.props.time, nextProps)
		if (countDownRunning && !loading && this.props.time > nextProps.time) {
			console.log('va a correr', nextProps)
			if (!primeravez) {
				primeravez = true
			}
			setTimeout(() => {
				runTime()
			}, 1000)
		}
		// CHANCHITO
		if (!this.props.question) {
			this.props.handleAnswer()
		}
	}
	render(){
		const { loading, question } = this.props
		return !loading && question ? <IndexView { ...this.props } /> : <Loading />
	}
}

const mapStateToProps = state => {
	const question = getQuestionWithOptions(state)
	const { timeOut, countDownRunning, isFetching } = state.settings
	return {
		time: countDownRunning && !isFetching ? timeOut - 1 : timeOut,
		loading: isFetching,
		question,
		countDownRunning,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleAnswer: (questionId, optionId, correct) => {
			dispatch(saveAnswer(questionId, optionId, correct))
		},
		runTime: () => dispatch(advanceCountDown())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)