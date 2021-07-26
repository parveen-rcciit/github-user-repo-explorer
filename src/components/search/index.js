import React from 'react';
import { func } from 'prop-types'

import './_style.css'

const Search = (props) => {
    const { handleSubmit, setSearchInput } = props
    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit} data-testid='search-form'>
                <input
                    required
                    type='text'
                    className='input-text'
                    placeholder='Enter username'
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className='search-btn' type='submit'>Search</button>
            </form>
        </div>
    );
};

Search.propTypes = {
    handleSubmit: func.isRequired,
    setSearchInput: func.isRequired,
}

export default Search;