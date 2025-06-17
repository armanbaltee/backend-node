const express = require("express");
const cors = require("cors");
const routes = require("./routes/user_data_routes");

const app = express();
const PORT = 7000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at port: http://localhost:${PORT}`);
});
