export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_USERS = 'SET_USERS'
export const SET_USER_REPOS = 'SET_USER_REPOS'

export const setSearchValue = (searchValue) => {
    return { type: SET_SEARCH_VALUE, searchValue };
}

export const setUsers = (users) => {
  return { type: SET_USERS, users }
}

export const setUserRepos = (user, repos) => {
    return { type: SET_USER_REPOS, user, repos }
}

