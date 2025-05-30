const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Proxy POST /submit to Flask backend (assumes it's on port 5000)
const target = process.env.API_URL || 'http://localhost:5000';

app.post('/submit', createProxyMiddleware({
  target,
  changeOrigin: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/form', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AWS Flask Demo Form</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f7fafc; margin: 0; padding: 0; }
          .container { max-width: 400px; margin: 60px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px; }
          h2 { color: #232f3e; text-align: center; }
          label { display: block; margin-top: 16px; font-weight: bold; }
          input { width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #ccc; border-radius: 4px; }
          button { margin-top: 24px; width: 100%; padding: 10px; background: #ff9900; color: #fff; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
          button:hover { background: #f90; }
          #result { margin-top: 24px; padding: 12px; border-radius: 4px; background: #e6f7ff; color: #232f3e; min-height: 24px; text-align: center; }
          .aws-logo { display: block; margin: 0 auto 16px auto; width: 80px; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" class="aws-logo" alt="AWS Logo" />
          <h2>Welcome to AWS Flask Demo</h2>
          <p style="text-align: center; margin-bottom: 20px;">Submit your information below. All submissions are stored and can be viewed.</p>
          <form id="myForm">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <button type="submit">Submit</button>
          </form>
          <div id="result"></div>
        </div>
        
        <script>
          document.getElementById('myForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const result = document.getElementById('result');
            
            result.innerHTML = 'Processing...';
            
            // Get the API URL from environment or default to the backend container name in Docker network
            const apiUrl = '/submit';
            console.log('Submitting form to:', apiUrl);
            
            fetch(apiUrl, {
              method: 'POST',
              body: formData,
              // No need to set Content-Type header when using FormData, browser will set it with proper boundary
            })
            .then(response => response.json())
            .then(data => {
              // Format the response as HTML for better display
              const formattedResponse = 
                '<div style="text-align:left">' +
                  '<h3>Form Submission Successful!</h3>' +
                  '<p><strong>Name:</strong> ' + data.name + '</p>' +
                  '<p><strong>Email:</strong> ' + data.email + '</p>' +
                  '<p><strong>Timestamp:</strong> ' + data.timestamp + '</p>' +
                  '<p><a href="http://localhost:5000/submissions" target="_blank">View All Submissions</a></p>' +
                '</div>';
              result.innerHTML = formattedResponse;
              console.log("Backend response:", data);
            })
            .catch(error => {
              result.innerHTML = 'Could not reach backend or backend error: ' + error.message;
              console.error('Error:', error);
              // Log additional details to help with debugging
              console.log('Target URL:', apiUrl);
              console.log('Environment API_URL:', process.env.API_URL || 'Not set');
            });
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Frontend running on http://localhost:${port}`);
});