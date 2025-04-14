const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'yatan',
  database: process.env.DB_NAME || 'portfolio_db'
});

// Create database if it doesn't exist
db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'portfolio_db'}`, (err) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }
  console.log(`Database ${process.env.DB_NAME || 'portfolio_db'} created or already exists`);
  
  // Create tables
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      technologies VARCHAR(255),
      image_url VARCHAR(255),
      project_url VARCHAR(255),
      github_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];
  
  createTablesQueries.forEach(query => {
    db.query(query, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      }
    });
  });
  
  console.log('All tables created successfully');
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connection successful');
});

// API Routes
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      return res.status(500).json({ message: 'Error fetching projects' });
    }
    res.json(results);
  });
});

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  
  const query = 'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ message: 'Error saving message' });
    }
    res.status(201).json({ message: 'Message sent successfully' });
  });
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the portfolio`);
});
