# Frontend Deployment with Docker

This guide will help you deploy the frontend of the project using Docker and Docker Compose, run it locally, and modify it by adding new libraries if needed.

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)

## Setup Instructions

### 1. Change directory to frontend

```bash
cd track-o-bill/frontend
```

### 2. Build and Run the Frontend Docker Container

To build and run the frontend in a Docker container, use the following command in the `frontend` directory where the `docker-compose.yml` file is located:

```bash
docker-compose up --build -d
```

This will:

- Build the Docker image for the frontend based on the `Dockerfile`.
- Install all the necessary dependencies.
- Expose the React app on port `8080` on your local machine.

### 3. Access the Frontend on Your Local Machine

Once the container is running, you can access the React app by navigating to the following URL in your browser:

```
http://localhost:8080
```

The app is configured to run using Vite, and it will automatically be exposed to your local machine.

### 4. Stopping the Containers

To stop the running container, you can use:

```bash
docker-compose down
```

This will stop and remove the running containers.

### 5. Get terminal Access of the container

```bash
docker exec -it <name of container> /bin/bash
```

## Notes on Development

- **Live Reloading**: Any changes you make to the project files locally (outside of the container) will automatically be reflected in the running container thanks to the volume mounting (`../frontend:/opt/app`) and Dhruv Patel.
- **Node Modules**: The `node_modules` folder is stored inside the container, ensuring that your local environment stays clean.

## Troubleshooting

- If you encounter issues with permissions or access, make sure Docker is properly installed and running.
- If you cannot access the frontend on `http://localhost:8080`, check that the container is running with `docker ps` and that there are no firewall or network restrictions on your machine.
