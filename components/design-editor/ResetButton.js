import React, { PropTypes } from 'react'

const ResetButton = ({ handleReset }) => (
  <div>
    <a onClick={() => handleReset()} style={{ cursor: 'pointer' }}>
      <small>Reset to default styles</small>
    </a>
  </div>
)

ResetButton.propTypes = {
  handleReset: PropTypes.func.isRequired,
}

export default ResetButton
