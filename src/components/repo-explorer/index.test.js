import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import axios from 'axios'
import RepoExplorer from './index'

const mockStore = configureMockStore()
let store = mockStore({})
const props = {
    setSearchValue: jest.fn(),
    setUsers: jest.fn(),
}
axios.get = jest.fn().mockResolvedValue({ data: {} })

describe('RepoExplorer component', () => {
    test('should render', () => {
        render(
            <Provider store={store}>
                <RepoExplorer {...props} />
            </Provider>)
        const search = 'Search'
        expect(screen.getByText(search)).toBeInTheDocument()
    })

    test('should invoke handleSearch when search form is submitted', async() => {
        store = mockStore({ searchValue: 'alex'})
        axios.get.mockResolvedValueOnce({ data: [] })
        const { getByPlaceholderText, getByTestId } = render(
            <Provider store={store}>
                <RepoExplorer {...props} />
            </Provider>)
        await act(async () => {
            const searchInput = getByPlaceholderText('Enter username')
            fireEvent.change(searchInput, { target: { value: "alex" } })
            fireEvent.submit(getByTestId("search-form"))
            const noUsersText = 'No users for alex'
            await waitFor(() => expect(screen.getByText(noUsersText)).toBeInTheDocument())
        })
    })

    test('should get inside catch block when api responds with error', async() => {
        axios.get.mockResolvedValueOnce(null)
        const { getByPlaceholderText, getByTestId } = render(
            <Provider store={store}>
                <RepoExplorer {...props} />
            </Provider>)
        await act(async () => {
            const searchInput = getByPlaceholderText('Enter username')
            fireEvent.change(searchInput, { target: { value: "ben" } })
            fireEvent.submit(getByTestId("search-form"))
            const errorText = 'Something went wrong. Please try later.'
            await waitFor(() => expect(screen.getByText(errorText)).toBeInTheDocument())
        })
    })
})
