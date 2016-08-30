import React from 'react'
import CountDown from 'canvas/trivia/components/CountDown'
import Question from 'canvas/trivia/components/Question'
import OptionList from 'canvas/trivia/components/OptionList'

const IndexView = ({ question, time, saveAnswer }) => (
	<div className="col-sm-12">
		<CountDown 
			time={time} />
		<Question 
			text={question.text} />
		<OptionList 
			options={question.options} 
			handleClick={(optionId, correct) => saveAnswer(question.id, optionId, correct)} />
	</div>
)

export default IndexView