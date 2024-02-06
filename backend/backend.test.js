const request = require('supertest');
const app = require('./app.js');
const Note = require('./models/notes.js'); // Assuming you have a Note model

describe('DELETE /api/notes/:id', () => {
  it('should delete a note by id', async () => {
    // Mocking the findById method of Note model to return a sample note
    const sampleNote = { _id: 'sampleId', title: 'Sample Title', content: 'Sample Content' };
    Note.findById = jest.fn().mockResolvedValue(sampleNote);

    const response = await request(app).delete('/api/notes/sampleId');

    // Check if Note.findById was called with the correct id
    expect(Note.findById).toHaveBeenCalledWith('sampleId');
    
    // Check if Note.findByIdAndDelete was called with the correct id
    expect(Note.findByIdAndDelete).toHaveBeenCalledWith('sampleId');

    // Check if the response status is 200
    expect(response.status).toBe(200);

    // Check if the response body contains the correct message
    expect(response.body).toEqual({ message: "Note deleted successfully" });
  });

  it('should return 404 if note is not found', async () => {
    // Mocking the findById method of Note model to return null (note not found)
    Note.findById = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/api/notes/nonExistentId');

    // Check if Note.findById was called with the correct id
    expect(Note.findById).toHaveBeenCalledWith('nonExistentId');

    // Check if the response status is 404
    expect(response.status).toBe(404);

    // Check if the response body contains the correct message
    expect(response.body).toEqual({ message: "Note not found" });
  });

  it('should return 500 if an error occurs during deletion', async () => {
    // Mocking the findById method of Note model to throw an error
    Note.findById = jest.fn().mockRejectedValue(new Error('Some error occurred'));

    const response = await request(app).delete('/api/notes/errorId');

    // Check if Note.findById was called with the correct id
    expect(Note.findById).toHaveBeenCalledWith('errorId');

    // Check if the response status is 500
    expect(response.status).toBe(500);

    // Check if the response body contains the correct message
    expect(response.body).toEqual({ message: "Error deleting note" });
  });
});
