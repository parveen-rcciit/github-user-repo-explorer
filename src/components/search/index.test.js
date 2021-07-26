import { render, screen, fireEvent } from '@testing-library/react'
import Search from './index'

const props = {
    handleSubmit: jest.fn(e => e.preventDefault),
    setSearchInput: jest.fn(),
}

describe('Search component', () => {
    test('should render', () => {
        render(<Search {...props} />);
        const search = 'Search'
        expect(screen.getByText(search)).toBeInTheDocument()
    })

    test('should invoke setSearchInput and handleSubmit when user clicks on search', () => {
        const { getByPlaceholderText, getByTestId } = render(<Search {...props} />)
        const searchInput = getByPlaceholderText('Enter username')

        fireEvent.change(searchInput, { target: { value: "alex" } })
        fireEvent.submit(getByTestId("search-form"))
        expect(props.setSearchInput).toHaveBeenCalled()
        expect(props.handleSubmit).toHaveBeenCalled()
    })
})
