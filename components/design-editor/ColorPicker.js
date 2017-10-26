import React, { PropTypes } from 'react'
import _ from 'lodash'
import { SketchPicker } from 'react-color'

const colorObjectToRgb = color => 'rgba(' + color.rgb.r + ', ' + color.rgb.g + ', ' + color.rgb.b + ', ' + color.rgb.a + ')'

const processResult = result => colorObjectToRgb(result)

const ColorPicker = ({ value, property, onChange }) => (
  <div>
    <div className="ita-sidebar-col-50">
      <label>{_.capitalize(_.replace(property, '-', ' '))}</label>
    </div>
    <input type="checkbox" className="ita-color-picker-trigger-input hide" id={property} />
    <label htmlFor={property} className="ita-sidebar-col-50 text-right ita-color-picker-label">
      <div className="ita-color-picker-trigger" style={{ backgroundColor: value }}>
        <i
          className="glyphicon glyphicon-remove ita-color-picker-icon"
          style={{
            lineHeight: 1.5,
          }}
        />
      </div>
    </label>
    <div
      className="ita-color-picker-container"
      style={{
        background: 'white',
        padding: '0px',
        marginBottom: '10px',
        marginTop: '13px',
        position: 'relative',
      }}>
      <span className="glyphicon glyphicon-triangle-top" style={{ position: 'absolute', top: '-10px', right: '17px' }} />
      <div className="ita-color-picker-tool-override">
        <SketchPicker color={value} onChange={val => onChange(processResult(val))} />
      </div>
    </div>
  </div>
)

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ColorPicker
