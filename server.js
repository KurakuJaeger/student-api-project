const express = require('express');
const cors = require('cors'); // Required to allow the frontend to talk to the backend
const server = express();
const PORT = 3000;

// Middleware
server.use(cors()); // Enable Cross-Origin Resource Sharing
server.use(express.json()); // Enable parsing of JSON in request bodies

// 1. Data Store (In-Memory)
// This simulates a database. It holds multiple records.
let students = [
    { id: 1, name: "Alice Thompson", course: "Computer Science" },
    { id: 2, name: "Bob Richards", course: "Information Technology" }
];

// 2. GET Endpoint: Retrieve all students (READ)
server.get('/api/students', (req, res) => {
    console.log('GET /api/students - Fetching student list');
    // Using optional chaining as a best practice, though students is defined here
    res.status(200).json(students?.map(s => s) ?? []);
});

// 3: GET Endpoint: Retrieve a specific student by ID
server.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params?.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        console.log(`GET /api/students/${id} - Not Found`);
        return res.status(404).json({ error: "Student not found" });
    }

    console.log(`GET /api/students/${id} - Found: ${student.name}`);
    res.status(200).json(student);
});


// 4. POST Endpoint: Create a new student (CREATE)
server.post('/api/students', (req, res) => {
    // Optional chaining and nullish coalescing for safer input handling
    const name = req.body?.name ?? "Unknown Student";
    const course = req.body?.course ?? "General Education";

    const newStudent = {
        id: (students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1),
        name,
        course
    };

    students.push(newStudent); 
    console.log(`POST /api/students - Added: ${name}`);
    res.status(201).json(newStudent);
});

// 5. PUT Endpoint: Update an existing student (UPDATE)
server.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params?.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    // Update fields using nullish coalescing to keep old values if new ones are missing
    students[index].name = req.body?.name ?? students[index].name;
    students[index].course = req.body?.course ?? students[index].course;

    console.log(`PUT /api/students/${id} - Updated record`);
    res.status(200).json(students[index]);
});

// 6. DELETE Endpoint: Remove a student (DELETE)
server.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params?.id);
    const initialLength = students.length;
    
    // Filter out the student with the matching ID
    students = students.filter(s => s.id !== id);

    if (students.length === initialLength) {
        return res.status(404).json({ error: "Student not found" });
    }

    console.log(`DELETE /api/students/${id} - Removed record`);
    res.status(200).json({ message: `Student with ID ${id} deleted successfully.` });
});

// Start the server
server.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`API Server running at http://localhost:${PORT}`);
    console.log(`Endpoints available:`);
    console.log(`GET    /api/students`);
    console.log(`POST   /api/students`);
    console.log(`PUT    /api/students/:id`);
    console.log(`DELETE /api/students/:id`);
    console.log(`========================================`);
});
