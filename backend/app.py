from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

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
    # Process the data here
    response = {
        "message": "Form submitted successfully",
        "name": name,
        "email": email,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    return jsonify(response)

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
    app.run(debug=True, host='0.0.0.0',port=8000)