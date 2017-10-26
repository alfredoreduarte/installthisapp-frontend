// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

export type Id = number

export type Text = string

export type GeneralActivityIndicators = {
  purchasing: boolean,
  globalIndicator: boolean,
  loadingPages: boolean,
  savingDesign: boolean,
  updatingAdmin: boolean,
  updatingApp: boolean,
  appCreation: boolean,
  appChecksumDashboardLoading: ?string,
  connectingToFacebook: boolean,
  installingFacebookTab: boolean,
}

// export type Todo = {
// 	+id: Id,
// 	+text: Text,
// 	+completed: boolean
// }

// export type VisibilityFilter =
// 		'SHOW_ALL'
// 	| 'SHOW_ACTIVE'
// 	| 'SHOW_COMPLETED'

// export type Todos = Array<Todo>

// export type State = {
// 	+todos: Todos,
// 	+visibilityFilter: VisibilityFilter
// }

export type Action = { type: 'TOGGLE_ACTIVITY/PURCHASING' }
// | { type: 'TOGGLE_TODO', +id: Id }
// | { type: 'SET_VISIBILITY_FILTER', +filter: VisibilityFilter }

// export type Store = ReduxStore<State, Action>

// export type Dispatch = ReduxDispatch<Action>
