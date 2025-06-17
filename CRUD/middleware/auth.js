const submitData = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send("Enter correct email!");
    }
    console.log("Login successful!");
    next();
};

const deleteData = (req, res, next) => {
    const { id } = req.body;
    if (id === undefined) {
        return res.status(400).send("No specific ID provided.");
    }
    next();
};

const updateUser = (req, res, next) => {
    const { id } = req.body;
    if (id === undefined) {
        return res.status(400).send("No specific ID provided.");
    }
    next();
};

module.exports = {
    submitData,
    deleteData,
    updateUser
};
