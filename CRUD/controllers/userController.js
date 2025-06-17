const fs = require("fs");
const path = require("path");

const file_path = path.join(__dirname, "../data.json");

const createUser = (req, res) => {
    let userList = [];

    const { name, email, password } = req.body;

    if (fs.existsSync(file_path)) {
        const fileData = fs.readFileSync(file_path, 'utf-8');
        userList = JSON.parse(fileData) || [];
    }

    const existingUser = userList.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).send("Email already exists!");
    }

    const userData = { id: Date.now(), name, email, password };
    userList.push(userData);
    fs.writeFileSync(file_path, JSON.stringify(userList, null, 2));
    res.status(201).send("User created successfully!");
};

const viewUser = (req, res) => {
    if (fs.existsSync(file_path)) {
        const fileData = fs.readFileSync(file_path, 'utf-8');
        const userData = JSON.parse(fileData) || [];

        if (userData.length === 0) {
            return res.status(404).send("No users found.");
        }

        res.send(userData);
    } else {
        res.status(404).send("Data file not found.");
    }
};

const deleteUser = (req, res) => {
    const { id } = req.body;

    if (fs.existsSync(file_path)) {
        let userData = JSON.parse(fs.readFileSync(file_path, 'utf-8')) || [];
        const index = userData.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).send("User not found.");
        }

        userData.splice(index, 1);
        fs.writeFileSync(file_path, JSON.stringify(userData, null, 2));
        res.send("User deleted successfully!");
    } else {
        res.status(404).send("Data file not found.");
    }
};

const updateUser = (req, res) => {
    const { id, name, email, password } = req.body;

    if (fs.existsSync(file_path)) {
        let userData = JSON.parse(fs.readFileSync(file_path, 'utf-8')) || [];
        const index = userData.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).send("User not found.");
        }

        if (name) userData[index].name = name;
        if (email) userData[index].email = email;
        if (password) userData[index].password = password;

        fs.writeFileSync(file_path, JSON.stringify(userData, null, 2));
        res.send("User updated successfully!");
    } else {
        res.status(404).send("Data file not found.");
    }
};

module.exports = {
    createUser,
    viewUser,
    deleteUser,
    updateUser
};
