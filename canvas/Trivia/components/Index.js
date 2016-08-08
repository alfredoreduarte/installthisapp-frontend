import React, { Component } from 'react'
import { connect } from 'react-redux'
import CountDown from './CountDown'
import Question from './Question'
import OptionList from './OptionList'
import { advanceCountDown, toggleCountDown, saveAnswer, postAnswers, answerQuestion } from 'canvas/Trivia/actions'
import { getQuestionWithOptions } from 'canvas/Trivia/selectors/questions'

class Index extends Component {
	componentDidMount() {
		const { countDownRunning, time, toggleCountDown, question, postAnswers } = this.props
		let interval = setInterval(() => {
			if (!countDownRunning) return false
			if (time > 0) {
				// this.props.startCounter()
			}
			else{
				toggleCountDown()
				// this.props.postAnswers()
				clearInterval(interval)
			}
		}, 1000)	
	}
	render(){
		const { time, question, loading, saveAnswer, postAnswers } = this.props
		console.log('viene question', question)
		if (!question && !loading) {
			postAnswers()
		}
		return (
			<div className="col-sm-12">
				{loading || !question
				? <h1>Loading</h1>
				: <div>
				<CountDown time={time} />
				<Question text={question.text} />
				<OptionList 
					options={question.options} 
					handleClick={(optionId, correct) => saveAnswer(question.id, optionId, correct)}  />
				</div>}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		time: state.settings.timeOut,
		countDownRunning: state.settings.countDownRunning,
		question: getQuestionWithOptions(state),
		loading: state.settings.isFetching,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		startCounter: () => dispatch(advanceCountDown()),
		toggleCountDown: () => dispatch(toggleCountDown()),
		saveAnswer: (questionId, optionId, correct) => {
			dispatch(saveAnswer(questionId, optionId, correct))
			dispatch(answerQuestion(questionId))
		},
		postAnswers: () => dispatch(postAnswers()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)