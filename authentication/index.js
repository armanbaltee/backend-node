const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 7000;
const filePath = path.join(__dirname, 'fileData.json');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.post('/signup', myMiddlewareFunSignUp, (req, res) => {
  const { name, email, password, confPassword } = req.body;
  let users = [];

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(fileContent) || [];
    }

    const isExisting = users.find(user => user.email === email);
    if (isExisting) {
      return res.status(409).send('User already exists');
    }

    const userData = { name, email, password, confPassword};
    users.push(userData);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.status(200).send('Successfully added user!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/login', myMiddlewareFunLogin, (req, res) => {
  const { email, password } = req.body;

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(400).send('No users found');
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent) || [];

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    res.status(200).send('Login Successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

function myMiddlewareFunSignUp(req, res, next) {
  const { name, email, password, confPassword } = req.body;

  if (!name || !email || !password || !confPassword) {
    return res.status(400).send('Please enter all fields!');
  }

  if (password !== confPassword) {
    return res.status(400).send('Passwords do not match!');
  }

  next();
}

function myMiddlewareFunLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Please enter email and password!');
  }

  next();
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
