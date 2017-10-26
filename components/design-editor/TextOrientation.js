import React, { PropTypes } from 'react'
import Select from 'react-select'

const TextOrientation = ({ values, value, onChange }) => (
  <div>
    <label>Text orientation</label>
    <br />
    <Select clearable={false} value={value} options={values} onChange={e => onChange(e.value)} />
  </div>
)

TextOrientation.propTypes = {
  values: PropTypes.array,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextOrientation.defaultProps = {
  values: [{ value: 'ltr', label: 'Left to Right' }, { value: 'rtl', label: 'Right to Left' }],
}

export default TextOrientation
