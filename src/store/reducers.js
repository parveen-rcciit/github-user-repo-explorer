import * as actionTypes from './actions';

const initialState = {
  searchValue: '',
  users: [],
  repos: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_VALUE:
        return {
          ...state,
          searchValue: action.searchValue,
        };
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case actionTypes.SET_USER_REPOS:
        return {
            ...state,
            repos: {
                ...state.repos,
                [action.user]: action.repos
            }
        }
    default:
      return state;
  }
};

export default reducer;