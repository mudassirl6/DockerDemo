const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/form', (req, res) => {
  res.send(`
    <form action="http://localhost:5000/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`Thank you, ${name}. We have received your email: ${email}.`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});