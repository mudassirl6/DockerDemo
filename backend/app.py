from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

# In-memory storage for form submissions
submissions = []

@app.route('/', methods=['GET'])
def health_check():
    return "<h1>Backend is running</h1><br><p>API is healthy</p><br><h1>AWS HOSTED APPLICATION</h1>", 200

@app.route('/submit', methods=['GET', 'POST'])
def handle_form_submission():
    if request.method == 'GET':
        return jsonify({"message": "GET method on /submit is for testing only."}), 200

    # Handle form-encoded data
    name = request.form.get('name')
    email = request.form.get('email')
    
    # Print received data to console for debugging
    print(f"Received form data: Name={name}, Email={email}")
    
    # Create submission record
    submission = {
        "name": name,
        "email": email,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    
    # Add to the in-memory storage
    submissions.append(submission)
    
    # Process the data here
    response = {
        "message": "Form submitted successfully",
        "name": name,
        "email": email,
        "timestamp": submission["timestamp"]
    }
    return jsonify(response)

@app.route('/submissions', methods=['GET'])
def view_submissions():
    # HTML template for displaying submissions
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Form Submissions</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
            h1 { color: #333; }
            table { border-collapse: collapse; width: 100%; background-color: white; }
            th, td { text-align: left; padding: 12px; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            th { background-color: #232f3e; color: white; }
            .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Form Submissions</h1>
            <p>Total submissions: {{ submissions|length }}</p>
            <p><a href="http://localhost:3000/form" style="color: #ff9900; text-decoration: none; font-weight: bold;">Back to Form</a></p>
            
            {% if submissions %}
            <table border="1">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Timestamp</th>
                </tr>
                {% for sub in submissions %}
                <tr>
                    <td>{{ loop.index }}</td>
                    <td>{{ sub.name }}</td>
                    <td>{{ sub.email }}</td>
                    <td>{{ sub.timestamp }}</td>
                </tr>
                {% endfor %}
            </table>
            {% else %}
            <p>No submissions yet.</p>
            {% endif %}
        </div>
    </body>
    </html>
    """
    return render_template_string(html_template, submissions=submissions)

@app.route('/api/users', methods=['GET'])
def get_users():
    # Example data for users
    users = [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"},
        {"id": 3, "name": "Charlie"}
    ]
    return jsonify(users)

@app.route('/api/products', methods=['GET'])
def get_products():
    # Example data for products
    products = [
        {"id": 101, "name": "Laptop", "price": 999.99},
        {"id": 102, "name": "Smartphone", "price": 499.99},
        {"id": 103, "name": "Tablet", "price": 299.99}
    ]
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)