const fs = require("fs");
const cors = require('cors');
const express = require("express");
const PORT = 7000;
const app = express();

app.use(express.json());
app.use(cors());


const dataFile = './data.json'

function getAllData(){
    const data = fs.readFileSync(dataFile, 'utf-8')
    return JSON.parse(data)
}

function setData(user){
    fs.writeFileSync(dataFile, JSON.stringify(user, null, 2))
}

app.post('/signup',myMiddlewareFunSignUp, (req, res) => {
    const { name, email, password } = req.body;
    const users = getAllData();
    users.push({ name, email, password });
    setData(users);
    res.send("Successful sign up!");
});

app.post('/login',myMiddlewareFunLogIn, (req, res) => {
    const { email, password } = req.body;
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


function myMiddlewareFunSignUp(req, res, next){
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send("Email & password must be requied");
    }else{
        const users = getAllData();
        const checkUser = users.find(u => u.email === email);
        if (checkUser) {
            return res.status(400).send("User already exists.");
        }else{
            next();
        }
    }
}

function myMiddlewareFunLogIn(req, res, next){
    const {email, password } = req.body;
    if(!email || !password){
        res.status(400).send("Enter email or password!");
    }
    next();
}