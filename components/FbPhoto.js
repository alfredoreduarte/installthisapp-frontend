import React, { PropTypes } from 'react'

const FbPhoto = ({ className, identifier, width, height, style }) => (
  <span>
    {identifier ? (
      <img
        className={className}
        src={`https://graph.facebook.com/${identifier}/picture?width=100&height=100`}
        style={{ ...style, width: width, height: height }}
      />
    ) : (
      <img
        className={className}
        src={`https://dummyimage.com/100x100/cccccc/fff.jpg&text=IA`}
        style={{ ...style, width: width, height: height }}
      />
    )}
  </span>
)

FbPhoto.propTypes = {
  className: PropTypes.string,
  identifier: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
}

export default FbPhoto
