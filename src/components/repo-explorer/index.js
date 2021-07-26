import React, { useState } from 'react'
import axios from 'axios'
import Search from '../search'
import Users from '../users'
import { useDispatch } from 'react-redux'
import { setSearchValue, setUsers } from '../../store/actions'
import './_style.css'

const RepoExplorer = () => {
    const [searchQuery, setSearchInput] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [showSearchMessage, setShowSearchMessage] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSearch = async (e) => {
        e.preventDefault()
        setIsFetching(true)
        setError('')
        dispatch(setSearchValue(searchQuery))
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}&per_page=5`)
            const { data: { items = [] } } = response
            dispatch(setUsers(items))
            setIsFetching(false)
            setShowSearchMessage(true)
        } catch (err) {
            setIsFetching(false)
            setError('Something went wrong. Please try later.')
        }
    }

    return (
        <div className='repo-explorer-container'>
            <div className='repo-explorer'>
                <Search
                    setSearchInput={setSearchInput}
                    handleSubmit={handleSearch}
                />
                {isFetching ? <div className='loader'></div> : <Users showSearchMessage={showSearchMessage}></Users>}
                {error ? <div className='error'> {error} </div> : null}
            </div>
        </div>
    )
}

export default RepoExplorer