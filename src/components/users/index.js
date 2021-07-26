import React, { useState } from 'react'
import axios from 'axios'
import { MdExpandMore } from 'react-icons/md'
import RepoList from '../repo'
import { useDispatch, useSelector } from 'react-redux'
import { setUserRepos } from '../../store/actions'
import { bool } from 'prop-types'
import './_style.css'

const Users = (props) => {
    const [isFetching, setIsFetching] = useState(false)
    const [userId, setUserId] = useState(0)
    const [repos, setRepos] = useState([])
    const [error, setError] = useState('')
    const searchValue = useSelector(state => state.searchValue || '')
    const users = useSelector(state => state.users || [])
    const dispatch = useDispatch()

    const handleExpand = (id) => {
        id === userId ? setUserId(0) : setUserId(id)
    }

    const fetchRepos = async (login) => {
        setIsFetching(true)
        setError('')
        try {
            const response = await axios.get(`https://api.github.com/users/${login}/repos`)
            const { data = [] } = response
            setRepos(data)
            dispatch(setUserRepos(login, data))
            setIsFetching(false)
        } catch (err) {
            setError('Something went wrong. Please try later.')
            setIsFetching(false)
        }
    }

    const showRepos = isFetching ? (<div className='loader' data-testid='loader'></div>) : (<RepoList repos={repos}></RepoList>)
    const searchMessage = users.length ? `Showing users for ${searchValue}` : `No users for ${searchValue}`
    
    const handleClick = (user) => {
        setIsFetching(true)
        handleExpand(user.id)
        if(user.id !== userId) fetchRepos(user.login)
    }
    const { showSearchMessage } = props
    return (
        <div className='user-container'>
            {showSearchMessage ?
                <div className='search-message'>
                    <span> {searchMessage} </span>
                </div>
                : null}
            {users.map((user) => (
                <div key={user.id}>
                    <div className='user-info' onClick={() => handleClick(user)} data-testid={`user-${user.id}`}>
                        <span>{user.login}</span>{' '}
                        <MdExpandMore className={userId === user.id ? 'expand' : 'collapse'} />
                    </div>
                    <div className={userId === user.id ? 'accordion-active' : 'accordion'}>
                        {userId === user.id && !error ? showRepos : null}
                        {userId === user.id && error ? <div className='error'> {error} </div> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

Users.propTypes = {
    showSearchMessage: bool,
}

Users.defaultProps = {
    showSearchMessage: false,
}

export default Users