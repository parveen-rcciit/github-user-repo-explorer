import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import axios from 'axios'
import Users from './index'

const mockStore = configureMockStore()
const setUserRepos = jest.fn()

const props = {
    setUserRepos,
    showSearchMessage: true,
    error: '',
}

axios.get = jest.fn().mockResolvedValue({ data: {} })

describe('Users component', () => {
    test('should render without any users', () => {
        const store = mockStore({ users: [], searchValue: 'alex' })
        const { getByText } = render(
            <Provider store={store}>
                <Users {...props} />
            </Provider>)
        const noUsers = 'No users for alex'
        expect(getByText(noUsers)).toBeInTheDocument()
    })

    test('should render with users', () => {
        const store = mockStore({
            users: [
                {
                    id: 'abc123',
                    login: 'ABC'
                },
                {
                    id: 'xyz123',
                    login: 'XYZ'
                }
            ],
            searchValue: 'alica',
        })
        const { getByText } = render(
            <Provider store={store}>
                <Users {...props} />
            </Provider>)
        const showUsers = 'Showing users for alica'
        expect(getByText(showUsers)).toBeInTheDocument()
    })

    test('should invoke fetchRepos for user', async () => {
        const store = mockStore({
            users: [
                {
                    id: 'alica',
                    login: 'Alica'
                },
                {
                    id: 'xyz123',
                    login: 'XYZ'
                }
            ],
            searchValue: 'alica',
        })
        axios.get.mockResolvedValueOnce({ data: [] })
        const { getByTestId } = render(
            <Provider store={store}>
                <Users {...props} />
            </Provider>)
        await act(async () => {
            const user = await screen.findByTestId('user-alica')
            fireEvent.click(user)
            await waitFor(() => expect(getByTestId('loader')).toBeInTheDocument())
        })
    })

    test('should get inside catch block when repo api responds with error', async() => {
        axios.get.mockResolvedValueOnce(null)
        const store = mockStore({
            users: [
                {
                    id: 'alica',
                    login: 'Alica'
                }
            ],
            searchValue: 'alica',
        })
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <Users {...props} />
            </Provider>)
        await act(async () => {
            fireEvent.click(getByTestId('user-alica'))
            const errorText = 'Something went wrong. Please try later.'
            await waitFor(() => expect(getByText(errorText)).toBeInTheDocument())
        })
    })
})
