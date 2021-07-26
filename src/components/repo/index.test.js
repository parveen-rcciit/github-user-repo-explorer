import { render, screen } from '@testing-library/react'
import RepoList from './index'

describe('Repo component', () => {
    test('should render no user repos when repo list is empty', () => {
        const props = {
            repos: []
        }
        render(<RepoList {...props} />);
        const noRepoFound = 'No repositories found for the user'
        expect(screen.getByText(noRepoFound)).toBeInTheDocument()
    })

    test('should render user repos when repo list has some repo', () => {
        const props = {
            repos: [
                {
                    'id': 12345,
                    'html_url': 'https://github.com/zakird/1password-teams-open-source',
                    'owner': {
                        'login': 'zakird',
                    },
                    'name': '1password-teams-open-source',
                    'description': 'Get a free 1Password Teams membership for your open source project',
                    'stargazers_count': 1,
                }
            ]
        }
        render(<RepoList {...props} />);
        const name = '1password-teams-open-source'
        const description = 'Get a free 1Password Teams membership for your open source project'
        expect(screen.getByText(name)).toBeInTheDocument()
        expect(screen.getByText(description)).toBeInTheDocument()
    })
})
