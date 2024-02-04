import React, { useState, useEffect } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from './components/Note.jsx'
import userEvent from '@testing-library/user-event'


test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('clicking the button that pins notes and makes it important', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('make important')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('clicking the delete button and it actually deletes', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('delete')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(0)
  })

  const FetchDataComponent = ({ fetchData }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDataFromApi = async () => {
        try {
          const result = await fetchData();
          setData(result);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchDataFromApi();
    }, [fetchData]);
  
    return (
      <div>
        {error ? (
          <div data-testid="error-message">Error: {error.message}</div>
        ) : (
          <div data-testid="data">{data}</div>
        )}
      </div>
    );
  };
  
  export default FetchDataComponent;