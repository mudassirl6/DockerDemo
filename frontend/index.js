const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Proxy POST /submit to Flask backend (assumes it's on port 5000)
app.post('/submit', createProxyMiddleware({
  target: 'http://localhost:5000', // From Node.js to Flask within ECS
  changeOrigin: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/form', (req, res) => {
  res.send(`
    <form id="myForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <button type="submit">Submit</button>
    </form>
    <div id="result"></div>
    <script>
      document.getElementById('myForm').onsubmit = async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        try {
          const response = await fetch('/submit', {
            method: 'POST',
            body: formData
          });
          if (!response.ok) throw new Error('Backend error or not running');
          const data = await response.json();
          document.getElementById('result').innerText = data.message + 
            (data.name ? (' Name: ' + data.name) : '') + 
            (data.email ? (' Email: ' + data.email) : '') +
            (data.timestamp ? (' Timestamp: ' + data.timestamp) : '');
        } catch (err) {
          document.getElementById('result').innerText = 'Could not reach backend or backend error: ' + err.message;
        }
      };
    </script>
  `);
});

app.listen(port, () => {
  console.log(`Frontend running on http://localhost:${port}`);
});