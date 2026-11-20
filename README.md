# IT 360 Timesheet App

A basic Node.js and React timesheet app for the Week 4 lab. Enter an employee name and hours worked, submit the form, and view the saved entries.

## Run locally

Use Node.js 24 and npm. In one terminal run these commands from the project folder.

```bash
cd backend
npm ci
npm start
```

In a second terminal run these commands from the project folder.

```bash
cd frontend
npm ci
npm start
```

Open http://localhost:3000. The backend listens on port 5000.

## Run with Docker

Install Docker Engine and Docker Compose. Stop the local Node services first so their ports are free.

```bash
docker compose up --build -d
docker compose ps
docker compose logs backend
docker compose logs frontend
```

Open http://localhost:3000 and submit a sample entry. Reload the page to retrieve it again from the backend. Ports 3000 and 5000 are published on the local computer only.

The same images can also be built and started separately.

```bash
docker build -t it360-timesheet-backend:latest ./backend
docker build -t it360-timesheet-frontend:latest ./frontend
docker run -d --name timesheet-backend -p 127.0.0.1:5000:5000 it360-timesheet-backend:latest
docker run -d --name timesheet-frontend -p 127.0.0.1:3000:3000 it360-timesheet-frontend:latest
```

Use either Compose or the separate commands, since they use the same ports. Stop the Compose services with `docker compose down`. Stop and remove the separately started containers with `docker rm -f timesheet-backend timesheet-frontend`.

## API and checks

`POST /api/timesheet` accepts JSON with `employeeName` and `hours`. A successful request returns HTTP 201 and `Timesheet saved`. Names must contain text and be at most 100 characters. Hours must be a positive number. Invalid values return HTTP 400. `GET /api/timesheet` returns the saved array.

```bash
curl -i http://localhost:5000/api/timesheet \
  -H 'Content-Type: application/json' \
  -d '{"employeeName":"Sample Employee","hours":7.5}'
curl http://localhost:5000/api/timesheet
npm test --prefix backend
npm run build --prefix frontend
```

The frontend supports an optional `REACT_APP_API_URL` environment variable. Its default is `http://localhost:5000/api/timesheet`. A future deployment must set this to the backend address reachable by the user's browser before starting or building the frontend.

## Lab notes

The app follows the guide's Express API, Create React App scaffold, axios calls, two form fields, and two containers. Node 24 replaces the guide's unsupported Node 18 base image. Image names match between build and run commands. Lockfiles and `npm ci` make dependency installation repeatable. The containers run as the Node user.

Entries are stored in memory as shown in the guide. They survive page reloads while the backend runs. Restarting or recreating the backend clears them.

The frontend container runs the development server required by the guide. Create React App is deprecated and its dependency tree has known audit findings. This is a local lab demonstration. Before public production use, update the frontend tooling, serve its production build, add persistent storage and authentication, and restrict backend access. No cloud deployment or Docker Hub push is part of this lab.

Reference information is available in the [Node.js release table](https://nodejs.org/en/about/previous-releases) and [React's Create React App notice](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).
