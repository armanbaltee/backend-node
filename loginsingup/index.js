const fs = require("fs");
const express = require("express");
const PORT = 7000;
const app = express();

app.use(express.json());


const dataFile = './data.json'

function getAllData(){
    const data = fs.readFileSync(dataFile, 'utf-8')
    return JSON.parse(data)
}

function setData(user){
    fs.writeFileSync(dataFile, JSON.stringify(user, null, 2))
}

app.get('/signup', (req, res) => {
    const { name, email, password } = req.query;
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    const users = getAllData();
    const checkUser = users.find(u => u.email === email);
    if (checkUser) {
        return res.status(400).send("User already exists.");
    }

    users.push({ name, email, password });
    setData(users);
    res.send("Successful sign up!");
});

app.get('/login', (req, res) => {
    const { email, password } = req.query;
    if (!email || !password) {
        return res.status(400).send("All fields are required.");
    }

    const users = getAllData();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.send("Login successful");
    } else {
        res.status(400).send("Invalid email or password.");
    }
});



app.listen(PORT,()=>{
    console.log(`File Runnuing at PORT ${PORT}`);
})
