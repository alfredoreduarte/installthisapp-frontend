import React from 'react'
import Frame from 'react-frame-component'
import TiMediaPlayReverse from 'react-icons/lib/ti/media-play-reverse'
import TiMediaPlay from 'react-icons/lib/ti/media-play'
import PlatformSelector from 'components/form-editor/PlatformSelector'

const style = '.btn-primary{background: red}'

const EditorPreview = ({
  platform,
  handleScreenChange,
  screensLength,
  currentScreenIndex,
  currentScreenLabel,
  availableScreens,
  previews,
  styles,
}) => (
  <div className={`editor-preview-column ${platform}`}>
    <Frame
      className={`editor-preview-frame ${platform}`}
      head={<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />}>
      <div className="styles" dangerouslySetInnerHTML={{ __html: styles }} />
      {previews}
    </Frame>
    <div className="editor-preview-navigation">
      {false && <PlatformSelector />}
      <div className="editor-preview-title text-center">{currentScreenLabel}</div>
      <div className="editor-preview-navigation-buttons">
        {currentScreenIndex > 0 && (
          <TiMediaPlayReverse
            size={20}
            className="editor-preview-navigation-arrow"
            onClick={() => handleScreenChange(currentScreenIndex - 1)}
          />
        )}
        <div className="editor-preview-page-number">
          {currentScreenIndex + 1} of {availableScreens.length}
        </div>
        {currentScreenIndex < screensLength - 1 && (
          <TiMediaPlay
            size={20}
            className="editor-preview-navigation-arrow"
            onClick={() => handleScreenChange(currentScreenIndex + 1)}
          />
        )}
      </div>
    </div>
  </div>
)

export default EditorPreview
