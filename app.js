const express = require('express');
const cors = require('cors'); // Required to allow the frontend to talk to the backend
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON in request bodies

// 1. Data Store (In-Memory)
// This simulates a database. It holds multiple records.
let students = [
    { id: 1, name: "Alice Thompson", course: "Computer Science" },
    { id: 2, name: "Bob Richards", course: "Information Technology" }
];

// 2. GET Endpoint: Retrieve all students
// Responds with the current list of students
app.get('/api/students', (req, res) => {
    console.log('GET /api/students - Fetching student list');
    res.status(200).json(students);
});

// 3. POST Endpoint: Create a new student
// Demonstrates how multiple inserts reflect on the server side
app.post('/api/students', (req, res) => {
    const { name, course } = req.body;

    // Basic Validation
    if (!name || !course) {
        return res.status(400).json({ error: "Name and Course are required" });
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        course: course
    };

    students.push(newStudent); // Data is updated on the server
    console.log(`POST /api/students - Added: ${name}`);
    
    res.status(201).json(newStudent);
});

// Start the server
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`API Server running at http://localhost:${PORT}`);
    console.log(`Endpoints available:`);
    console.log(`GET  http://localhost:3000/api/students`);
    console.log(`POST http://localhost:3000/api/students`);
    console.log(`========================================`);
});