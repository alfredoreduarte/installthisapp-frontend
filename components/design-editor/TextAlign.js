import React, { PropTypes } from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

const TextAlign = ({ options, value, onChange }) => (
  <ButtonToolbar>
    <ButtonGroup className="ita-btn-group-editor">
      {options.map(o => (
        <Button key={o} className={`${value == o ? 'active' : null}`} onClick={() => onChange(o)}>
          <Glyphicon glyph={`align-${o}`} />
        </Button>
      ))}
    </ButtonGroup>
  </ButtonToolbar>
)

TextAlign.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextAlign.defaultProps = {
  options: ['left', 'center', 'right', 'justify'],
}

export default TextAlign
