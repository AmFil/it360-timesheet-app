# Timesheet app

Week 4 Kubernetes lab. The React frontend calls a Next.js backend through Nginx.
The backend stays inside the cluster. The frontend has a public service.

## Run locally

```bash
docker compose up --build
```

Open http://localhost:3000. Press Ctrl+C to stop, then run `docker compose down`.

## Deploy to Kubernetes

```bash
docker compose build
docker compose push
kubectl apply -f k8s/
kubectl get deployments,pods,services
```

Use a connected cluster and open the frontend service's external IP.
Images use Docker Hub account 12moshikamj. Sign in with `docker login` before pushing.

Node 24 and Next.js 16.4.6 replace the older guide versions. The frontend uses React 19 and a production build served by Nginx.
This lab returns the guide's backend message. It does not save timesheet entries or provide sign in or HTTPS.
