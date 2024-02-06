import React from 'react';
import { render, screen, waitFor, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import App from '../client/src/App';

// Mocking fetch requests
beforeAll(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ notes: [] }), // Mocking empty notes array for GET /api/notes
      ok: true,
    });
  });
  
  afterAll(() => {
    global.fetch.mockRestore(); // Restore fetch mock after all tests are finished
  });

  describe('Backend API Tests', () => {
    it('should render all notes from the database', async () => {
      render(<App />);
      const notesElement = await screen.findByTestId('notes');
      expect(notesElement).toBeInTheDocument();
    });
  
    // it('should create a new note in the database', async () => {
    //   render(<App />);
    //   const contentInput = screen.getByPlaceholderText('Enter note content');
    //   const addButton = screen.getByText('Add Note');
  
    //   userEvent.type(contentInput, 'Test Note Content');
    //   fireEvent.click(addButton);
  
    //   await waitFor(() => {
    //     expect(global.fetch).toHaveBeenCalledWith('/api/createNote', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ content: 'Test Note Content' }),
    //     });
    //   });
    // });
  
    // it('should update the importance status of a note in the database', async () => {
    //   render(<App />);
    //   const noteElement = await screen.findByText('Test Note Content');
    //   const toggleButton = within(noteElement.parentElement).getByText('Toggle Importance');
  
    //   fireEvent.click(toggleButton);
  
    //   await waitFor(() => {
    //     expect(global.fetch).toHaveBeenCalledWith('/api/notes/123456789', {
    //       method: 'PUT',
    //     });
    //   });
    // });
  
    // it('should delete a note from the database', async () => {
    //   render(<App />);
    //   const noteElement = await screen.findByText('Test Note Content');
    //   const deleteButton = within(noteElement.parentElement).getByText('Delete');
  
    //   fireEvent.click(deleteButton);
  
    //   await waitFor(() => {
    //     expect(global.fetch).toHaveBeenCalledWith('/api/notes/123456789', {
    //       method: 'DELETE',
    //     });
    //   });
    // });
  });
