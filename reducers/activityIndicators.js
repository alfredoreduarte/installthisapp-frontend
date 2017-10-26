// @flow
import type { GeneralActivityIndicators, Action } from 'types'
const activityIndicators = (
  state: GeneralActivityIndicators = {
    purchasing: false,
    globalIndicator: false,
    loadingPages: false,
    savingDesign: false,
    updatingAdmin: false,
    updatingApp: false,
    appCreation: false,
    appChecksumDashboardLoading: null,
    connectingToFacebook: false,
    installingFacebookTab: false,
  },
  action: Action
) => {
  switch (action.type) {
    case 'TOGGLE_ACTIVITY/PURCHASING':
      return Object.assign({}, state, {
        purchasing: !state.purchasing,
      })
    case 'TOGGLE_ACTIVITY/INSTALLING_TAB':
      return Object.assign({}, state, {
        installingFacebookTab: !state.installingFacebookTab,
      })
    case 'TOGGLE_ACTIVITY/CONNECTING_FACEBOOK':
      return Object.assign({}, state, {
        connectingToFacebook: !state.connectingToFacebook,
      })
    case 'TOGGLE_ACTIVITY/UPDATING_ADMIN':
      return Object.assign({}, state, {
        updatingAdmin: !state.updatingAdmin,
      })
    case 'TOGGLE_ACTIVITY/LOADING_PAGES':
      return Object.assign({}, state, {
        loadingPages: !state.loadingPages,
      })
    case 'TOGGLE_ACTIVITY/SAVING_DESIGN':
      return Object.assign({}, state, {
        savingDesign: !state.savingDesign,
      })
    case 'TOGGLE_ACTIVITY/UPDATING_APP':
      return Object.assign({}, state, {
        updatingApp: !state.updatingApp,
      })
    case 'TOGGLE_ACTIVITY_ON/GLOBAL':
      return Object.assign({}, state, {
        globalIndicator: true,
      })
    case 'TOGGLE_ACTIVITY_OFF/GLOBAL':
      return Object.assign({}, state, {
        globalIndicator: false,
      })
    case 'TOGGLE_ACTIVITY_ON/CREATING_APP':
      return Object.assign({}, state, {
        appCreation: true,
      })
    case 'TOGGLE_ACTIVITY_OFF/CREATING_APP':
      return Object.assign({}, state, {
        appCreation: false,
      })
    case 'TOGGLE_ACTIVITY_ON/LOADING_APP':
      return Object.assign({}, state, {
        appChecksumDashboardLoading: action.checksum,
      })
    case 'TOGGLE_ACTIVITY_OFF/LOADING_APP':
      return Object.assign({}, state, {
        appChecksumDashboardLoading: null,
      })
    default:
      return state
  }
}

export default activityIndicators
