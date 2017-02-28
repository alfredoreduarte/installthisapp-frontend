import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'
import update from 'react-addons-update'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { postNewQuestion, postNewQuestionWithReduxForm } from 'modules/trivia/actions/questions'
import QuestionCreator from 'modules/trivia/components/QuestionCreator'

const QuestionsCreate = ({show, close, handleSubmit, initialQuestion }) => (
	<Modal show={show} onHide={close}>
		<Modal.Header closeButton>
			<Modal.Title>New question</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<QuestionCreator initialQuestion={initialQuestion} />
		</Modal.Body>
		<Modal.Footer>
			<Button 
				className="btn btn-lg btn-success" 
				onClick={handleSubmit}>
				Save Question
			</Button>
		</Modal.Footer>
	</Modal>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		close: () => browserHistory.push(props.closeUrl),
		handleSubmit: () => dispatch(postNewQuestionWithReduxForm()).then(() => browserHistory.push(props.closeUrl)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsCreate)