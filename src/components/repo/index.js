import React from 'react';
import { arrayOf, shape, string, number } from 'prop-types'
import './_style.css'

const RepoList = ({ repos }) => {
    return (
        repos.length > 0 ? (
            repos.map((repo) => (
                <div className='repo-container' key={repo.id}>
                    <a
                        href={repo.html_url}
                        target='_blank'
                        rel='noreferrer'
                        title={`Github repo ${repo.owner.login}/${repo.name}`}
                    >
                        <div className='repo-details'>
                            <div className='repo-info'>
                                <h4>{repo.name}</h4>
                                <p className='repo-description'>{repo.description}</p>
                            </div>
                            <div>
                                <h4 className='repo-stargazers'>{repo.stargazers_count} &#9733;</h4>
                            </div>
                        </div>
                    </a>
                </div>
            ))) : (
            <div className='no-repo'>
                <p>No repositories found for the user</p>
            </div>
        ))
}

RepoList.propTypes = {
    repos: arrayOf(shape({
        'id': number,
        'html_url': string,
        'owner': shape({
            'login': string,
        }),
        'name': string,
        'description': string,
        'stargazers_count': number,
    })),
}

RepoList.defaultProps = {
    repos: []
}

export default RepoList;