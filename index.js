import express from 'express';

const app = express();
const PORT = 8000;

import path from 'path';
import fs from 'fs';
const _dirname = path.resolve();

const fn = _dirname + '/userList.csv';
console.log(_dirname);

// middleware

app.use(express.urlencoded());

app.get('/registration', (req, res) => {
  console.log(req.query);
  //   res.send(`<h1>You are in registration page.</h1>`);

  res.sendFile(_dirname + '/src/regForm.html');
});
app.post('/registration', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const str = `${email},${password} \n`;
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error.message) : console.log('added to file.');
  });

  //   res.send(`<h1>You are in registered.</h1>`);

  res.sendFile(_dirname + '/src/regForm.html');
});

app.get('/login', (req, res) => {
  console.log('received req to login');
  res.send('<h1>You are in login page</h1>');
});

// root router, home page

app.get('/', (req, res) => {
  console.log('received req to home router');
  res.send(`<h1>You are in home page.</h1>
  <a href="/registration">
  <button>Register</button></a>`);
});

// make our server available on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server is serving at htttp://localhost:${PORT}`);
});
