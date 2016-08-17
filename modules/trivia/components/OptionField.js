import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap'
import { postNewQuestion } from 'modules/trivia/actions/questions'

const OptionField = ({ text, onChange, onToggle, onDelete, correct }) => (
	<FormGroup>
		<InputGroup>
			<FormControl type="text" value={text} onChange={onChange} />
			<InputGroup.Button>
				<Button 
					onClick={onToggle}
					className={correct ? 'btn-success' : 'btn-danger'}>
					{correct ? 'Correct' : 'Incorrect'}
				</Button>
				<Button 
					onClick={onDelete}
					className={'btn-info'}>
					Delete
				</Button>
			</InputGroup.Button>
		</InputGroup>
	</FormGroup>
)

export default OptionField