import React, { PropTypes } from 'react'

const PlatformSelector = ({ platform, handlePlatformChange }) => (
  <div className="btn-group ita-btn-group-editor" role="group" data-toggle="buttons">
    <button
      type="button"
      className={`btn btn-sm btn-default ${platform == 'desktop' ? 'active' : ''}`}
      onClick={() => handlePlatformChange('desktop')}>
      <span className="glyphicon glyphicon-king hide" />
      DESKTOP
    </button>
    <button
      type="button"
      className={`btn btn-sm btn-default ${platform == 'facebook' ? 'active' : ''}`}
      onClick={() => handlePlatformChange('facebook')}>
      <span className="glyphicon glyphicon-king hide" />
      FB PAGE
    </button>
    <button
      type="button"
      className={`btn btn-sm btn-default ${platform == 'mobile' ? 'active' : ''}`}
      onClick={() => handlePlatformChange('mobile')}>
      <span className="glyphicon glyphicon-phone hide" />
      MOBILE
    </button>
  </div>
)

PlatformSelector.propTypes = {
  handlePlatformChange: PropTypes.func.isRequired,
  platform: PropTypes.string.isRequired,
}

export default PlatformSelector
