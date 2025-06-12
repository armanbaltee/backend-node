const express = require("express");
const users = require("./MOCK_DATA.json");

const PORT = 8000;

const app = express();

app.get("/users",(req, res)=>{
    return res.json(users);
});

app.get("/users/:id", (req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id)
    return res.json(user);
})

app.get("/users", (req, res) => {
    const data = String(req.query.data);
    return res.json({ data });
});

app.listen(PORT, ()=>{
    console.log(`App running at PORT: ${PORT}`);
})