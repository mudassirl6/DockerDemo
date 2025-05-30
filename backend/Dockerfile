# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app
# Copy the current directory contents into the container
COPY . .

# Upgrade pip to the latest version
RUN pip install --upgrade pip
# Install any needed packages specified in requirements.txt with increased timeout
COPY requirements.txt .
RUN pip install --default-timeout=100 --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]