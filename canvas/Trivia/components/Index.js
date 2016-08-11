import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CountDown from 'canvas/trivia/components/CountDown'
import Question from 'canvas/trivia/components/Question'
import OptionList from 'canvas/trivia/components/OptionList'
import { 
	advanceCountDown, 
	toggleCountDown, 
	saveAnswer, 
	postAnswers, 
	answerQuestion
} from 'canvas/trivia/actions'
import { getQuestionWithOptions } from 'canvas/trivia/selectors/questions'

class Index extends Component {
	componentDidMount() {
		const { countDownRunning, time, toggleCountDown, question, goToAlreadyPlayed, loading } = this.props
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
		if (question == null && !loading) {
			console.log('ALREADY PLAYED')
			goToAlreadyPlayed()
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('nextProps')
		console.log(nextProps)
		if (nextProps.finished) {
			this.props.goToThanks()
		}
		else if (nextProps.question == null && !nextProps.loading) {
			console.log('ALREADY PLAYED')
			nextProps.goToAlreadyPlayed()
		}
	}
	render(){
		const { time, question, loading, saveAnswer } = this.props
		return (
			<div className="col-sm-12">
				{loading || question == null
				? <h1 className="text-center" style={{color: 'white'}}>Loading</h1>
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
		finished: Object.keys(state.entities.questions).length == state.answeredQuestions.length,
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
		goToThanks: () => {
			dispatch(postAnswers())
			dispatch(push(`/${window.canvasId}/${window.checksum}/thanks`))
		},
		goToAlreadyPlayed: () => {
			dispatch(push(`/${window.canvasId}/${window.checksum}/already-played`))	
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)