# TheAcquisitions – Cloud & DevOps Project

## 🚀 Overview
**TheAcquisitions** is a fully production‑grade DevOps + Cloud Engineering project showcasing the complete lifecycle of a modern backend application:

- Local Node.js development  
- Containerization with Docker  
- Vulnerability scanning with **Trivy**  
- CI/CD with **GitHub Actions** (build → test → scan → push → deploy)  
- Deployment to **Amazon Linux EC2** using Docker Compose  
- API served through an **AWS Application Load Balancer (ALB)**  
- Observability stack using **Prometheus + Grafana**  
- API documentation using **Swagger / OpenAPI**  
- PostgreSQL hosted on **Neon.tech**  
- Full infrastructure diagram included  

This is a **portfolio‑ready, job‑winning project** demonstrating practical cloud deployment, monitoring, automation, and backend engineering.

---

# 🏗️ Architecture Diagram

![Architecture](./TheAcquisitions-Cloud-DevOps-Archite-2025-11-29-030219.png)

---

# 🗂️ Folder Structure

```
TheAcquisitions/
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile
├── drizzle.config.js
├── jest.config.mjs
├── .env.example
├── src/
│   ├── app.js
│   ├── index.js
│   ├── server.js
│   ├── config/
│   │   ├── swagger.js
│   │   ├── logger.js
│   │   ├── metrics/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/
├── infra/
│   ├── monitoring/
│   │   ├── prometheus.yml
│   │   └── grafana/
│   └── terraform/
│       ├── main.tf
│       └── variables.tf
└── README.md
```

---

# ⚙️ Tech Stack

### **Backend**
- Node.js (Express)
- PostgreSQL (Neon)
- JWT Auth
- Helmet, CORS, Rate Limits, Arcjet security

### **DevOps & Cloud**
- Docker & Docker Compose  
- GitHub Actions CI/CD  
- Trivy Image Scanning  
- AWS EC2 (Amazon Linux 2023)  
- AWS ALB  
- Amazon ECR (image registry)  
- Prometheus  
- Grafana  

### **Monitoring Metrics**
- `up`  
- `theacquisitions_nodejs_active_requests_total`  
- `theacquisitions_nodejs_eventloop_lag_mean_seconds`  

### **Documentation**
- Swagger (OpenAPI 3.0)
- Postman collections

---

# 🔧 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-user>/TheAcquisitions.git
cd TheAcquisitions
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local Dev environment
```bash
docker compose -f docker-compose.dev.yml up --build
```

### 4. Access services
| Service | URL |
|--------|-----|
| API | http://localhost:3000 |
| Swagger Docs | http://localhost:3000/api/docs |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |

---

# 🐳 Docker Images

### Build image manually
```bash
docker build -t theacquisitions-app .
```

### Run container manually
```bash
docker run -p 3000:3000 theacquisitions-app
```

---

# 🔒 Trivy Vulnerability Scanning

### Scan Docker image
```bash
trivy image theacquisitions-app
```

Screenshots:

<!-- - `trivy_scan_1.png`
- `trivy_scan_2.png` -->

![Trivy Scan](./images/trivy_scan_1.png)

---

# ⚡ GitHub Actions CI/CD Pipeline

### Pipeline steps:
1. **Checkout repo**  
2. **Install dependencies**  
3. **Run tests & linting**  
4. **Build Docker image**  
5. **Run Trivy security scan**  
6. **Push image to Amazon ECR**  
7. **SSH into EC2 → pull & restart containers**  

### Workflow File
Located in `.github/workflows/main.yml`.

Screenshot:
- `workflow.png`
- `successful_github_actions.png`

---

# ☁️ AWS Deployment (Production)

### Infrastructure:
- **Amazon Linux EC2**
- Docker + Docker Compose installed via startup scripts
- ALB → EC2 Target Group → Node.js Container
- ECR hosts images built by CI/CD

### Deployment Steps (Automated via CI/CD)

#### 1. SSH into EC2
```bash
ssh -i <pem-file> ec2-user@<EC2_PUBLIC_IP>
```

#### 2. Pull updated images from ECR
```bash
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-2.amazonaws.com
docker compose -f docker-compose.prod.yml pull
```

#### 3. Restart services
```bash
docker compose -f docker-compose.prod.yml up -d
```

Screenshots:
- `ALB_Health_Check_URL_Working.png`
- `running_docker_compose.png`
- `ECR_Repository_with_Image_Tags.png`
- `ECS_Service_Task_Running.png`

---

# 📊 Monitoring (Prometheus + Grafana)

### Prometheus scrape targets
```
- job_name: "theacquisitions-app"
  static_configs:
    - targets: ["app:3000"]
```

### Grafana Dashboard
A custom dashboard was built showing:
- Uptime (up metric)
- Active Requests
- Event Loop Lag

Screenshots:
- `prometheus_target.png`
- `prometheus_graph.png`
- `TheAcquisitions_Monitoring.png`

---

# 📘 Swagger API Documentation

Available at:

```
http://localhost:3000/api/docs
https://<ALB_DNS>/api/docs
```

Endpoints include:
- POST `/api/auth/sign-up`
- POST `/api/auth/sign-in`
- POST `/api/auth/sign-out`
- GET `/api/users`
- GET `/api/users/{id}`
- PATCH `/api/users/{id}`
- DELETE `/api/users/{id}`
- GET `/health`

Screenshot:
- `Screenshot_2025-11-28_swagger.png`

---

# 🧪 Testing

Run all Jest tests:

```bash
npm test
```

Supports:
- Unit tests
- Integration tests

---

# 📦 Environment Variables

Create `.env` using `.env.example`

```
NODE_ENV=development
PORT=3000
DATABASE_URL=<Neon_DB_URL>
JWT_SECRET=<your-secret>
ARCJET_KEY=<your-key>
```

---

# 🏁 Conclusion

This project demonstrates:
- Cloud deployment on AWS  
- CI/CD automation  
- Docker orchestration  
- Application monitoring  
- Production‑grade API with security & documentation  

It’s a **strong portfolio piece** suitable for:
- DevOps Engineer  
- Cloud Engineer  
- SRE  
- Backend Engineer  
- Platform Engineer  

---

# ⭐ Author
**Gerard Eklu**  
DevOps & Cloud Engineer

---

# 📄 License
MIT  
