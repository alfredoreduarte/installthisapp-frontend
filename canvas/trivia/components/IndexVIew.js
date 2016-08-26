import React from 'react'
import Loading from 'canvas/trivia/components/Loading'
import CountDown from 'canvas/trivia/components/CountDown'
import Question from 'canvas/trivia/components/Question'
import OptionList from 'canvas/trivia/components/OptionList'

const IndexView = ({ loading, question, time, saveAnswer }) => (
	<div className="col-sm-12">
		{loading ? <Loading /> : null }
		{!loading && question ? 
		<div>
			<CountDown 
				time={time} />
			<Question 
				text={question.text} />
			<OptionList 
				options={question.options} 
				handleClick={(optionId, correct) => saveAnswer(question.id, optionId, correct)} />
		</div>
		:
		null
		}
	</div>
)

export default IndexView