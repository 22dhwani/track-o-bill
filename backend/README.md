# Backend Deployment with Docker

This guide will help you deploy the frontend of the project using Docker and Docker Compose, run it locally, and modify it by adding new libraries if needed.

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)

## Setup Instructions

### 1. Change directory to frontend

```bash
cd track-o-bill/backend
```

### 2. Build and Run the Frontend Docker Container

To build and run the frontend in a Docker container, use the following command in the `frontend` directory where the `docker-compose.yml` file is located:

```bash
docker-compose up --build -d
```

This will:

- Build the Docker image for the frontend based on the `Dockerfile`.
- Install all the necessary dependencies mentioned in `backend/requirements.txt.`
- Expose the Django app on port `8000` on your local machine.

### 3. Access the Frontend on Your Local Machine

Once the container is running, you can access the Django app by navigating to the following URL in your browser:

```
http://localhost:8000
```

### 4. Stopping the Containers

To stop the running container, you can use:

```bash
docker-compose down
```

This will stop and remove the running containers.

## Troubleshooting

- If you encounter issues with permissions or access, make sure Docker is properly installed and running.
- If you cannot access the frontend on `http://localhost:8080`, check that the container is running with `docker ps` and that there are no firewall or network restrictions on your machine.
