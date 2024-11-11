import express from 'express';
import json from 'body-parser';
import cors from 'cors';
import { createConnection } from 'mysql2';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '246472', // Replace with your actual MySQL password
  database: 'mydatabase'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rohitsinghpanwar108@gmail.com',
    pass: 'arcw fsns zwwy kecp' // Use the app-specific password if 2-Step Verification is enabled
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'rohitsinghpanwar108@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

app.post('/api/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error: ' + err.message);
      return;
    }
    sendEmail(email, 'Signup Successful', `Hello ${name}! Your signup was successful.We welcome you in our community and we would love to help you out and don't forget to remember that when it is about your studies we always got your back`);
    res.status(200).send('User registered successfully');
  });
});

app.post('/api/signin', (req, res) => {
  const { name, password } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  db.query(sql, [name, password], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error: ' + err.message);
      return;
    }
    if (results.length > 0) {
      sendEmail(results[0].email, 'Signin Successful', `Hello ${name}, you have successfully sign in KnowledgeHub.`);
      res.status(200).send('Signin successful');
    } else {
      res.status(401).send("Invalid credentials or You haven't created your account yet!");
    }
  });
});


app.post('/api/forgotpassword', (req, res) => {
  const { email, password } = req.body;
  const sqlcheck = 'SELECT * FROM users WHERE email = ?';
  db.query(sqlcheck, [email], (err, results) => {
    if (err) {
      console.log('Error Checking email', err);
      res.status(500).send('Server error: ' + err.message);
      return;
    }
    if (results.length > 0) {
      const sqlUpdate = 'UPDATE users SET password= ? WHERE email = ?';
      db.query(sqlUpdate, [password, email], (err, result) => {
        if (err) {
          console.log('error updating password', err);
          res.status(500).send('Server error: ' + err.message);
          return;
        }
        sendEmail(email, 'Password Reset Successful', 'Your password has been reset successfully.👍👍👍👍');
        res.status(200).send('Password reset successfully');
      });
    } else {
      res.status(404).send('Email not found. Please signup.');
    }
  });
});

app.post('/api/questions', (req, res) => {
  const { title } = req.body;
  const sql = 'INSERT INTO questions (title) VALUES (?)';
  db.query(sql, [title], (err, result) => {
    if (err) {
      console.error('Error inserting question:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send({ id: result.insertId, title });
  });
});

app.get('/api/questions', (req, res) => {
  const sql = 'SELECT * FROM questions';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send(results);
  });
});

app.post('/api/questions/:id/answers', (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  const sql = 'INSERT INTO answers (question_id, content) VALUES (?, ?)';
  db.query(sql, [id, content], (err, result) => {
    if (err) {
      console.error('Error inserting answer:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send({ id: result.insertId, content });
  });
});

app.get('/api/questions/:id/answers', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM answers WHERE question_id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching answers:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send(results);
  });
});

// Delete a question
app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM questions WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting question:', err);
      res.status(500).send('Server error: ' + err.message);
      return;
    }
    res.status(200).send('Question deleted successfully');
  });
});

// Delete an answer
app.delete('/api/questions/:questionId/answers/:answerId', (req, res) => {
  const { questionId, answerId } = req.params;
  const sql = 'DELETE FROM answers WHERE id = ? AND question_id = ?';
  db.query(sql, [answerId, questionId], (err, result) => {
    if (err) {
      console.error('Error deleting answer:', err);
      res.status(500).send('Server error: ' + err.message);
      return;
    }
    res.status(200).send('Answer deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
