import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';

test('renders learn react link', () => {
  const mockStore = configureMockStore()
  const store = mockStore({})
  render(
        <Provider store={store}>
            <App />
      </Provider>)
  const linkElement = screen.getByText('Search')
  expect(linkElement).toBeInTheDocument()
})
