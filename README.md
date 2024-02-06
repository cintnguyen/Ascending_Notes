# Ascending Notes Documentation

# Introduction

This documentation aims to ensure that our components function according to CRUD and reliably in our Ascending Notes application. Users will also have the ability to save their note, star it to mark its importance and also delete notes.

Our target audience are fellow students, developers, QA engineers who are interested in using and testing our notes application. 

Unit tests are essential and play a crucial role in the overall testing strategy by focusing on individual units or components of a software system. Unit tests for React components are there to help catch bugs early in the development process and ensure that each component behaves as expected. Testing is necessary for the following reasons: bug detection and prevention, enhanced user experience, increased confidence in releases, cost savings, maintaining business reputation, adaptability and scalability, and regulatory compliance.

# Test Environment Set Up

Before running any tests, ensure you have the following dependencies installed: 
- Node.js (version 12 or higher)
- npm (Node Package Manager)


We utilized Jest version 29.7.0 and also React Testing Library version 14.2.1. 

Dependencies we have in our package.json file: 

      "devDependencies": {
        "@babel/preset-env": "^7.23.9",
        "@babel/preset-react": "^7.23.3",
        "@testing-library/jest-dom": "^6.4.1",
        "@testing-library/react": "^14.2.1",
        "@testing-library/user-event": "^14.5.2",
        "@types/react": "^18.2.43",
        "@types/react-dom": "^18.2.17",
        "@vitejs/plugin-react": "^4.2.1",
        "eslint": "^8.55.0",
        "eslint-plugin-react": "^7.33.2",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.5",
        "jest": "^29.7.0",
        "jest-environment-jsdom": "^29.7.0",
        "postcss": "^8.4.33",
        "postcss-preset-mantine": "^1.12.3",
        "postcss-simple-vars": "^7.0.1",
        "vite": "^5.0.8"
      }

More information regarding how to configure Jest (https://jestjs.io/docs/configuration) and React Testing Library (https://testing-library.com/docs/react-testing-library/setup/) can be found on the official documentation website. 

Test Files for Jest: 
The jest.setup.js file allows you to set up any global configurations, custom matchers, or setup code that you want to run before each test suite in your Jest environment. It acts as a setup file for Jest, hence the name.
The jest.config.js file is used to configure Jest's behavior and options for your project. It allows you to specify various settings such as test environment, test match patterns, setup files, coverage configurations, and more.

#Test File Structure

Our files are organized according to components. Each component has its own file and the respective test in the same folder.
client > src > components > note

<img width="299" alt="Screenshot 2024-02-05 at 8 57 02 PM" src="https://github.com/StacyLafume/Ascending_Notes/assets/102008028/45b37871-b31d-4475-946b-1403629e0699">



# Testing

Option 1: 
1. Open the test you want to run in their respective folder
2. Open your terminal or another option is to open the terminal in VSCode using Ctrl + `
3.Command: npm run test 

OR 

Option 2:
VSCode Extension: download "Jest Run It" VSCode extension and then click on the "Run" button 

<img width="683" alt="Screenshot 2024-02-05 at 8 03 17 PM" src="https://github.com/manderscode/Ascending_Notes/assets/102008028/65c49c8f-d81a-40cf-97c3-aa3401aed3cc">

Components Testing: 

Test Case 1: Adding a New Note - Tests the ability to add a new note to the app.

Test Steps:
Render the app.
Simulate user input to add a new note.
Verify that the new note is displayed in the notes list.
Expected Outcome: The new note should be successfully added to the app.
Read Operation

Test Case 2: Displaying Existing Notes - Tests the ability to display existing notes in the app.

Test Steps:
Render the app with existing notes.
Verify that all existing notes are displayed in the notes list.
Expected Outcome: All existing notes should be correctly displayed.
Update Operation

Test Case 3: Editing an Existing Note - Tests the ability to edit an existing note.

Test Steps:
Render the app with existing notes.
Simulate user input to edit a specific note.
Verify that the edited note is updated in the notes list.
Expected Outcome: The edited note should be successfully updated.
Delete Operation

Test Case 4: Removing a Note - Tests the ability to remove a note from the app.
Test Steps:
Render the app with existing notes.
Simulate user action to delete a specific note.
Verify that the deleted note is removed from the notes list.
Expected Outcome: The deleted note should be successfully removed from the app.

Backend Testing: 

Test 1: GET /api/notes
Description: This test verifies that the endpoint responds with JSON data retrieved from the database.
Expected Behavior: A successful response with status code 200 and content type "application/json".

Test Steps: Send a GET request to "/api/notes".
Expect a status code of 200.
Expect the response content type to be "application/json".
Additional Information: The test logs the length of the response body.

Test 2: POST /api/createNote
Description: This test verifies that the endpoint successfully creates a new note in the database.
Expected Behavior: A successful response with status code 201 and content type "application/json".

Test Steps: Send a POST request to "/api/createNote" with a sample note object.
- Expect a status code of 201.
- Expect the response content type to be "application/json".

Error Handling: If an incomplete note is posted, the endpoint should respond with status code 400 and an error message indicating the missing field.

Test 3: PUT /api/notes/:id
Description: This test verifies that the endpoint updates an existing note in the database.
Expected Behavior: A successful response with status code 200 and content type "application/json".
Test Steps:
- Create a new note by sending a POST request to "/api/createNote".
- Send a PUT request to "/api/notes/:id" to update the created note.
- Expect a status code of 200.
- Expect the response content type to be "application/json".
  
Error Handling: If the provided note ID does not exist, the endpoint should respond with status code 404 and an error message indicating the unknown endpoint.
Additional Information: The test compares the updated note's ID and important status with the original note's ID and opposite important status.

Test 4: DELETE /api/notes/:id
Description: This test verifies that the endpoint deletes a note from the database.
Expected Behavior: A successful response with status code 200.

Test Steps:
- Create a new note by sending a POST request to "/api/createNote".
- Send a DELETE request to "/api/notes/:id" to delete the created note.
- Expect a status code of 200.
- 
Error Handling: If the provided note ID does not exist, the endpoint should still respond with status code 404.
Additional Information: None.

Test 5: afterAll Hook
Description: This hook executes after all tests and is responsible for cleaning up the test data and closing the Mongoose connection.
Expected Behavior: All test data should be cleared from the database, and the Mongoose connection should be closed without errors.

Test Steps:
- Send a DELETE request to "/api/cleartests".
- Close the Mongoose connection.




