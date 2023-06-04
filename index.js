import express from 'express';

const app = express();
const PORT = 8000;

import path from 'path';
import fs from 'fs';
const _dirname = path.resolve();

const fn = _dirname + '/userList.csv';

// middleware
app.use(express.urlencoded());

app.get('/registration', (req, res) => {
  res.sendFile(_dirname + '/src/regForm.html');
});

app.post('/registration', (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const str = `${email},${password}\n`;
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error.message) : console.log('added to file.');
  });

  //   res.send(`<h1>You are in registered.</h1>`);

  res.sendFile(_dirname + '/src/regForm.html');
});

app.get('/login', (req, res) => {
  res.sendFile(_dirname + '/src/login.html');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const str = `${email},${password}`;
  console.log(str);

  // readfile

  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);
    // console.log(data.toString());
    const userStr = data.toString();
    const userArg = userStr.split('\n');

    if (userArg.includes(str)) {
      res.send('<H1>Login successful.</H1>');
    } else {
      res.send('<h1>Invalid login</h1>');
    }
  });
});

// root router, home page

app.get('/', (req, res) => {
  console.log('received req to home router');
  res.send(`<h1>You are in home page.</h1>
  <a href="/registration">
  <button>Register</button></a>
  <a href="/login">
  <button>Login</button></a>`);
});

// make our server available on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server is serving at htttp://localhost:${PORT}`);
});
