# DockerDemo

This project demonstrates a simple Dockerized application comprising a frontend and a backend, orchestrated using Docker Compose.

## Project Structure

* **frontend/**: Contains the frontend application code.
* **backend/**: Contains the backend application code.
* **docker-compose.yaml**: Defines services, networks, and volumes for Docker Compose.

## Prerequisites

* [Docker](https://www.docker.com/get-started) installed on your machine.
* [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mudassirl6/DockerDemo.git
   cd DockerDemo
   ```

2. **Build and run the containers**:

   ```bash
   docker-compose up --build
   ```

   This command builds the images and starts the containers as defined in `docker-compose.yaml`.

3. **Access the application**:

   * Frontend: [http://localhost:3000/form](http://localhost:3000/form)
   * Backend API: [http://localhost:5000/submit](http://localhost:5000/submit)

   *Note: The actual ports may vary depending on your `docker-compose.yaml` configuration.*

## Ports and Their Usage

| Service   | Container Port | Host Port | API Endpoint(s)         | Description                        |
|-----------|---------------|-----------|-------------------------|------------------------------------|
| Frontend  | 3000          | 3000*     | `/form`                 | Express app (user interface/form)  |
| Backend   | 5000          | 5000      | `/submit`               | Flask API server (form handler)    |

*If port 3000 is already in use on your host, you may need to change the host port mapping in `docker-compose.yaml` (e.g., `3001:3000`).

* **Frontend**: Accessible at `http://localhost:3000/form` (or your chosen host port).
* **Backend**: Accessible at `http://localhost:5000/submit`.

## Features

* **Modular Architecture**: Separate containers for frontend and backend for better scalability and maintenance.
* **Easy Orchestration**: Utilizes Docker Compose for simplified container management.
* **Isolation**: Ensures that the frontend and backend run in isolated environments.

## Technologies Used

* Docker: Containerization platform.
* Docker Compose: Tool for defining and running multi-container Docker applications.
* Python: Backend programming language.
* Flask: Backend web framework (Python).
* Express: Frontend web framework (Node.js).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

