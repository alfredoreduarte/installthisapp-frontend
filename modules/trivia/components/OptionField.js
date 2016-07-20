import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap'
import { postNewQuestion } from 'modules/trivia/actions/questions'

const OptionField = ({ text, onChange, onToggle, correct }) => (
	<FormGroup>
		<InputGroup>
			<FormControl type="text" value={text} onChange={onChange} />
			<InputGroup.Button>
				<Button 
					onClick={onToggle}
					className={correct ? 'btn-success' : 'btn-danger'}>
					{correct ? 'Correct' : 'Incorrect'}
				</Button>
			</InputGroup.Button>
		</InputGroup>
	</FormGroup>
)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleSubmit: () => dispatch(postNewQuestion())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionField)