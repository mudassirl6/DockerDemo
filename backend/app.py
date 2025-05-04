from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

@app.route('/submit', methods=['POST'])
def handle_form_submission():
    # Handle form-encoded data
    name = request.form.get('name')
    email = request.form.get('email')
    # Process the data here
    response = {
        "message": "Form submitted successfully",
        "name": name,
        "email": email
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)