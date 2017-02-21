import React, { PropTypes } from 'react'
import CountDown from 'canvas/trivia/components/CountDown'
import Question from 'canvas/trivia/components/Question'
import OptionList from 'canvas/trivia/components/OptionList'

const Index = ({ question, time, handleAnswer }) => (
	<div>
		<CountDown 
			time={time} />
		<Question 
			text={question.text} />
		<OptionList 
			options={question.options} 
			handleClick={(optionId, correct) => handleAnswer(question.id, optionId, correct)} />
	</div>
)

Index.propTypes = {
	question: PropTypes.object.isRequired,
	time: PropTypes.number.isRequired,
	handleAnswer: PropTypes.func.isRequired,
}

export default Index