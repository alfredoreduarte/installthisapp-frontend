import React, { PropTypes } from 'react'
import HeaderImage from 'canvas/top_fans/components/HeaderImage'
import CountDown from 'canvas/trivia/components/CountDown'
import Question from 'canvas/trivia/components/Question'
import OptionList from 'canvas/trivia/components/OptionList'

const Index = ({ header, footer, question, time, handleAnswer }) => (
	<div>
		<div className="row">
			<HeaderImage source={header} />
		</div>
		<CountDown 
			time={time} />
		<Question 
			text={question.text} />
		<OptionList 
			options={question.options} 
			handleClick={(optionId, correct) => handleAnswer(question.id, optionId, correct)} />
		<div className="row">
			<HeaderImage source={footer} />
		</div>
	</div>
)

Index.propTypes = {
	question: PropTypes.object.isRequired,
	time: PropTypes.number.isRequired,
	handleAnswer: PropTypes.func.isRequired,
}

export default Index