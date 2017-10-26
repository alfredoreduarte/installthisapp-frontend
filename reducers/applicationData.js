const applicationData = (
  state = {
    shareLinkCopied: false,
    shareModalShown: false,
  },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_COPY_SHARE_LINK':
      return {
        ...state,
        shareLinkCopied: !state.shareLinkCopied,
      }
    case 'TOGGLE_SHARE_MODAL':
      return {
        ...state,
        shareModalShown: !state.shareModalShown,
      }
    default:
      return state
  }
}

export default applicationData
