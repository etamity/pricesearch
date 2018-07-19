import keyMirror from 'keymirror';
import { store } from 'App';

export const SearchActionTypes = keyMirror({
  UPDATE_RESULTS: null,
  APPEND_RESULTS: null,
  UPDATE_PAGINATION: null,
  UPDATE_ERROR: null,
  UPDATE_LOADING: null,
});

let initState = {
  loading: false,
  results: [],
  error: null,
  pagination: {}
}

export default function update(state = initState, action) {
  switch (action.type) {
    case SearchActionTypes.UPDATE_RESULTS:
      return Object.assign({}, state, {results: action.payload});
    case SearchActionTypes.APPEND_RESULTS:
      return Object.assign({}, state, {results: state.results.concat(action.payload)});
    case SearchActionTypes.UPDATE_PAGINATION:
      return Object.assign({}, state, {pagination: action.payload});
    case SearchActionTypes.UPDATE_ERROR:
      return Object.assign({}, state, {error: action.payload});
    case SearchActionTypes.UPDATE_LOADING:
      return Object.assign({}, state, {loading: action.payload});
    default:
      return state;
  }
}

export const SearchAction = {
  updateResults: (results) => {
    const action = {
      type: SearchActionTypes.UPDATE_RESULTS,
      payload: results
    }
    store.dispatch(action);
  },

  appendResults: (results) => {
    const action = {
      type: SearchActionTypes.APPEND_RESULTS,
      payload: results
    }
    store.dispatch(action);
  },

  updatePagination: (pagination)=>{
    const action = {
      type: SearchActionTypes.UPDATE_PAGINATION,
      payload: pagination
    }
    store.dispatch(action);
  },

  updateError: (error)=>{
    const action = {
      type: SearchActionTypes.UPDATE_ERROR,
      payload: error
    }
    store.dispatch(action);
  },
  
  updateLoading: (loading)=>{
    const action = {
      type: SearchActionTypes.UPDATE_LOADING,
      payload: loading
    }
    store.dispatch(action);
  }
}