const defaultState = {
  submittingImageWithFieldName: null,
  activeFieldIndex: null,
  editorSteps: null,
  editorScreens: null,
  step: 0,
  screen: 0,
  platform: 'mobile',
  defaultStylesheet: null,
}

const formEditorUI = (state = defaultState, action) => {
  switch (action.type) {
    case 'EDITOR/RESET':
      return {
        ...defaultState,
        // These two stay the same to avoid exceptions onLeave because components
        // do not get unmounted fast enough
        editorSteps: state.editorSteps,
        editorScreens: state.editorScreens,
      }
    case 'EDITOR/SET_ACTIVE_FIELD':
      return {
        ...state,
        activeFieldIndex: action.index,
      }
    case 'EDITOR/SET_BUSY_IMAGE_UPLOADER':
      return {
        ...state,
        submittingImageWithFieldName: action.name,
      }
    case 'EDITOR/SET_STEP':
      return {
        ...state,
        step: action.step,
      }
    case 'EDITOR/SET_SCREEN':
      return {
        ...state,
        screen: action.screen,
      }
    case 'EDITOR/INITIALIZE_STEPS_AND_SCREENS':
      return {
        ...state,
        editorSteps: action.editorSteps,
        editorScreens: action.editorScreens,
      }
    case 'EDITOR/INITIALIZE_STYLESHEET':
      return {
        ...state,
        defaultStylesheet: action.payload,
      }
    default:
      return state
  }
}

export default formEditorUI
