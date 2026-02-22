Terminal Commands for Student API

Since your server is running on http://localhost:3000, you can use these curl commands in your terminal to manipulate the data without using the browser.

1. GET - Retrieve All Students

This command fetches the current list of students.

curl http://localhost:3000/api/students


2. GET - Retrieve a Specific Student

To get a single student (for example, the first student with ID 1), append the ID to the end of the URL.

curl http://localhost:3000/api/students/1


3. POST - Create a New Student

This command sends a JSON object to add a new student. Note the -H (Header) to tell the server we are sending JSON, and -d (Data) for the content.

curl -X POST http://localhost:3000/api/students \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "course": "Cyber Security"}'


4. PUT - Update an Existing Student

To update a student, replace {id} with the actual ID number (e.g., 1). This command updates the student with that specific ID.

curl -X PUT http://localhost:3000/api/students/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Alice Thompson (Updated)", "course": "Advanced Computer Science"}'


5. DELETE - Remove a Student

This command deletes the student record associated with the ID provided in the URL.

curl -X DELETE http://localhost:3000/api/students/2
