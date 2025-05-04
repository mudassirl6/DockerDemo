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

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend API: [http://localhost:5000](http://localhost:5000)

   *Note: The actual ports may vary depending on your `docker-compose.yaml` configuration.*

## Features

* **Modular Architecture**: Separate containers for frontend and backend for better scalability and maintenance.
* **Easy Orchestration**: Utilizes Docker Compose for simplified container management.
* **Isolation**: Ensures that the frontend and backend run in isolated environments.

## Technologies Used

* Docker: Containerization platform.
* Docker Compose: Tool for defining and running multi-container Docker applications.
* Python: Backend programming language.
* \[Specify Frontend Technology]: Frontend framework/library used.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
