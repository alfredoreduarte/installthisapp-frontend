import React from 'react'
import { connect } from 'react-redux'
import { getAnswersForCurrentApp } from 'modules/trivia/selectors/answers'
import { getQuestionsForCurrentApp } from 'modules/trivia/selectors/questions'
import Summary from 'modules/trivia/components/Summary'

const Dashboard = ({ checksum, type, entries, hasQuestions }) => (
	<Summary checksum={checksum} type={type} entries={entries} hasQuestions={hasQuestions} />
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getAnswersForCurrentApp(state).slice(0,5),
		hasQuestions: getQuestionsForCurrentApp(state, props).length > 0,
	}
}

export default connect(mapStateToProps)(Dashboard)