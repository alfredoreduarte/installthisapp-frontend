import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'
import { postNewQuestion } from 'modules/trivia/actions/questions'

const OptionField = ({ text, onChange, onToggle, onDelete, correct }) => (
	<FormGroup>
		<InputGroup>
			<InputGroup.Button>
				<Button 
					onClick={onToggle}
					className={correct ? 'btn-outline btn-success' : 'btn-outline btn-default'}>
					{correct ? 'Correct' : 'Incorrect'}
				</Button>
			</InputGroup.Button>
			<FormControl type="text" value={text || ''} onChange={onChange} />
			<InputGroup.Button>
				<Button 
					onClick={onDelete}
					className={'btn-danger btn-outline'}>
					<Glyphicon glyph="trash" />
				</Button>
			</InputGroup.Button>
		</InputGroup>
	</FormGroup>
)

export default OptionField