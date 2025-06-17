const myMiddlewareFunSignUp = (req, res, next)=> {
  const { name, email, password, confPassword } = req.body;

  if (!name || !email || !password || !confPassword) {
    return res.status(400).send('Please enter all fields!');
  }

  if (password !== confPassword) {
    return res.status(400).send('Passwords do not match!');
  }

  next();
}

const myMiddlewareFunLogin = (req, res, next)=> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Please enter email and password!');
  }

  next();
}

module.exports = {
    myMiddlewareFunSignUp,
    myMiddlewareFunLogin
}