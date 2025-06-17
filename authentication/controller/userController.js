const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data.json");

const signUp = (req, res)=> {
  const { name, email, password, confPassword } = req.query;
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
}

const logIn =(req, res)=> {
  const { email, password } = req.query;

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
}

module.exports = {
    signUp,
    logIn
};
