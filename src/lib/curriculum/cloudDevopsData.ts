import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// CLOUD & DEVOPS CURRICULUM
// 6 Sequential Sub-Courses with Deep Lessons, Assessments & Capstone
// =========================================================================

// --- SUB-COURSE 1: Linux Systems & Networking Essentials ---
const devopsMod1_1: CurriculumSubModule = {
  id: "mod-devops-1-1",
  subCourseId: "subcourse-devops-linux",
  title: "Linux Administration & Shell Automation",
  position: 1,
  duration: "3.5 hours",
  items: [
    {
      id: "devops-linux-001",
      moduleId: "mod-devops-1-1",
      moduleTitle: "Linux Administration & Shell Automation",
      modulePosition: 1,
      subCourseId: "subcourse-devops-linux",
      subCourseTitle: "Linux Systems & Networking Essentials",
      subCoursePosition: 1,
      title: "Linux Server Administration, Permissions & Process Management",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Operating System Foundations for Cloud Engineers",
      contentDescription: "Master Linux filesystem hierarchy, file permissions (chmod, chown, umask), systemd service daemon control, and process signals (kill, ps, top, htop).",
      sections: [
        {
          title: "Filesystem Hierarchy & Security Model",
          explanation: "In Linux, everything is treated as a file. System configurations reside in /etc, logs in /var/log, and application mounts in /opt or /var/www.",
          bullets: [
            "Octal Permissions: 4 (Read), 2 (Write), 1 (Execute). Example: chmod 755 sets rwxr-xr-x.",
            "Ownership: chown user:group filename changes file owner and group association.",
            "Systemd Services: systemctl daemon-reload, enable, start, status, and restart manage background enterprise services.",
            "Signals: SIGTERM (15) requests graceful shutdown; SIGKILL (9) forces immediate kernel termination."
          ],
          codeSnippet: {
            language: "bash",
            filename: "service_setup.sh",
            code: `# Create a secure systemd service for a Node or Python API
cat << 'EOF' | sudo tee /etc/systemd/system/blezex-api.service
[Unit]
Description=BlezeX Production API Service
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/opt/blezex-api
ExecStart=/usr/bin/node /opt/blezex-api/dist/server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production PORT=8080

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now blezex-api.service
sudo systemctl status blezex-api.service`
          }
        }
      ],
      questions: [
        {
          id: "q-devops-lx-1",
          prompt: "What does the permission 'chmod 644 app.log' confer on the target file?",
          options: [
            { id: "a", label: "Owner has read/write; group and others have read-only" },
            { id: "b", label: "Full execute permissions for all users" },
            { id: "c", label: "Read and write for everyone, no execute" },
            { id: "d", label: "Only root can access the file" }
          ],
          correctIndex: 0,
          explanation: "6 (4+2 = read+write for owner), 4 (read-only for group), 4 (read-only for others)."
        }
      ]
    },
    {
      id: "devops-linux-002",
      moduleId: "mod-devops-1-1",
      moduleTitle: "Linux Administration & Shell Automation",
      modulePosition: 1,
      subCourseId: "subcourse-devops-linux",
      subCourseTitle: "Linux Systems & Networking Essentials",
      subCoursePosition: 1,
      title: "Cloud Networking: DNS, TCP/IP, SSH & Nginx Reverse Proxy",
      duration: "40 mins",
      type: "cheatsheet",
      position: 2,
      contentHeading: "Network Architecture, TLS Termination & Nginx Reverse Proxying",
      contentDescription: "Understand the OSI model, DNS propagation, SSH key authentication, firewall management (UFW/iptables), and configuring Nginx as a reverse proxy with SSL.",
      sections: [
        {
          title: "Nginx Reverse Proxy Architecture",
          explanation: "A reverse proxy sits between public client traffic and backend application servers, handling SSL termination, rate limiting, and gzip compression.",
          codeSnippet: {
            language: "nginx",
            filename: "nginx.conf",
            code: `server {
    listen 80;
    server_name api.blezex.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.blezex.com;

    ssl_certificate /etc/letsencrypt/live/api.blezex.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.blezex.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
          }
        }
      ],
      questions: [
        {
          id: "q-devops-lx-2",
          prompt: "Why should backend microservices listen on 127.0.0.1 rather than 0.0.0.0 when positioned behind an Nginx reverse proxy?",
          options: [
            { id: "a", label: "Because Linux will not allow 0.0.0.0" },
            { id: "b", label: "To restrict access exclusively to localhost, preventing unauthorized direct internet traffic from bypassing Nginx security filters and SSL" },
            { id: "c", label: "To double the network bandwidth" },
            { id: "d", label: "Because Nginx only supports port 80" }
          ],
          correctIndex: 1,
          explanation: "Binding to 127.0.0.1 prevents attackers on the public network from bypassing Nginx firewall rules, rate limiting, and SSL termination."
        }
      ]
    },
    {
      id: "devops-linux-quiz-1",
      moduleId: "mod-devops-1-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-devops-linux",
      subCourseTitle: "Linux Systems & Networking Essentials",
      subCoursePosition: 1,
      title: "Sub-Course Assessment: Linux & Networking Mastery",
      duration: "30 mins",
      type: "quiz",
      position: 3,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Linux Engineering & Networking Protocols",
      contentDescription: "Test your knowledge of process management, Bash automation, reverse proxies, and system troubleshooting under enterprise conditions.",
      questions: [
        {
          id: "q-devops-exam-1",
          prompt: "Which command reveals which process is listening on port 8080 in Linux?",
          options: [
            { id: "a", label: "sudo ss -tulpn | grep 8080" },
            { id: "b", label: "cat /proc/cpuinfo" },
            { id: "c", label: "ping localhost 8080" },
            { id: "d", label: "traceroute 8080" }
          ],
          correctIndex: 0,
          explanation: "`ss -tulpn` shows listening TCP/UDP sockets with process names and PID identifiers."
        }
      ]
    }
  ]
};

export const devopsSubCourse1: CurriculumSubCourse = {
  id: "subcourse-devops-linux",
  title: "Linux Systems & Networking Essentials",
  position: 1,
  duration: "5 hours",
  description: "Master Linux administration, filesystem security, systemd daemon management, shell scripting, DNS resolution, SSH hardening, and Nginx reverse proxies.",
  modules: [devopsMod1_1],
  items: [...devopsMod1_1.items]
};

// --- SUB-COURSE 2: Containerization with Docker ---
const devopsMod2_1: CurriculumSubModule = {
  id: "mod-devops-2-1",
  subCourseId: "subcourse-devops-docker",
  title: "Docker Engine, Images & Compose Stacks",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "devops-docker-001",
      moduleId: "mod-devops-2-1",
      moduleTitle: "Docker Engine, Images & Compose Stacks",
      modulePosition: 1,
      subCourseId: "subcourse-devops-docker",
      subCourseTitle: "Containerization with Docker",
      subCoursePosition: 2,
      title: "Production Dockerfiles, Multi-Stage Builds & Image Optimization",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Container Architecture, Layer Caching & Minimal Images",
      contentDescription: "Understand cgroups and namespaces, container immutability, multi-stage builds that shrink image sizes from 1GB to 50MB, and non-root security.",
      sections: [
        {
          title: "Multi-Stage Build Pattern",
          explanation: "Separate build-time dependencies (compilers, npm build, Go build tools) from the final runtime container to eliminate attack surfaces and reduce deployment latency.",
          codeSnippet: {
            language: "dockerfile",
            filename: "Dockerfile",
            code: `# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Runtime Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER appuser
EXPOSE 3000
CMD ["node", "dist/server.js"]`
          }
        }
      ],
      questions: [
        {
          id: "q-devops-dk-1",
          prompt: "What is the primary benefit of copying `package.json` and running `npm ci` before copying the rest of the application source code in a Dockerfile?",
          options: [
            { id: "a", label: "It makes the Dockerfile shorter" },
            { id: "b", label: "It maximizes Docker layer caching so npm dependencies are not reinstalled unless package.json actually changed" },
            { id: "c", label: "It encrypts the node_modules folder" },
            { id: "d", label: "It automatically publishes the image to Docker Hub" }
          ],
          correctIndex: 1,
          explanation: "Docker evaluates layer caches sequentially. If package.json hasn't changed, Docker reuses the cached node_modules layer, speeding up CI builds."
        }
      ]
    },
    {
      id: "devops-docker-quiz-1",
      moduleId: "mod-devops-2-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-devops-docker",
      subCourseTitle: "Containerization with Docker",
      subCoursePosition: 2,
      title: "Sub-Course Assessment: Docker & Multi-Container Stacks",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Dockerfile Optimization & Compose Networking",
      contentDescription: "Evaluate your proficiency in volume persistence, bridge networks, healthchecks, and multi-service Docker Compose orchestration.",
      questions: [
        {
          id: "q-devops-dk-2",
          prompt: "In Docker Compose, how do containers within the same custom network discover and resolve each other?",
          options: [
            { id: "a", label: "By hardcoded public IP addresses" },
            { id: "b", label: "Using automatic internal DNS resolution matching service names defined in docker-compose.yml" },
            { id: "c", label: "Through the host machine's /etc/hosts file manually" },
            { id: "d", label: "Using Bluetooth broadcasting" }
          ],
          correctIndex: 1,
          explanation: "Docker's embedded DNS server automatically resolves container names to their internal IP addresses across user-defined bridge networks."
        }
      ]
    }
  ]
};

export const devopsSubCourse2: CurriculumSubCourse = {
  id: "subcourse-devops-docker",
  title: "Containerization with Docker",
  position: 2,
  duration: "5 hours",
  description: "Construct hardened, multi-stage production Docker images, optimize layer caching, manage persistent volumes, and coordinate multi-service architectures with Docker Compose.",
  modules: [devopsMod2_1],
  items: [...devopsMod2_1.items]
};

// --- SUB-COURSE 3: Amazon Web Services (AWS) Core Infrastructure ---
const devopsMod3_1: CurriculumSubModule = {
  id: "mod-devops-3-1",
  subCourseId: "subcourse-devops-aws",
  title: "VPC, IAM, EC2 & Cloud Architecture",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "devops-aws-001",
      moduleId: "mod-devops-3-1",
      moduleTitle: "VPC, IAM, EC2 & Cloud Architecture",
      modulePosition: 1,
      subCourseId: "subcourse-devops-aws",
      subCourseTitle: "Amazon Web Services (AWS) Core Infrastructure",
      subCoursePosition: 3,
      title: "Enterprise AWS Architecture: VPC, Subnets, IAM & S3",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Zero-Trust Cloud Architecture on Amazon Web Services",
      contentDescription: "Design resilient multi-AZ Virtual Private Clouds (VPCs), public and private subnet isolation, NAT gateways, IAM policies with least privilege, and S3 lifecycle rules.",
      sections: [
        {
          title: "Public vs Private Subnet Topology",
          explanation: "Production cloud databases (RDS) and internal application servers must live in private subnets with no public IP addresses, routing outbound internet traffic through a NAT Gateway.",
          bullets: [
            "VPC CIDR Block: Standard /16 allocation (e.g., 10.0.0.0/16 providing 65,536 addresses).",
            "Internet Gateway (IGW): Routes traffic between public subnets and the internet.",
            "NAT Gateway: Enables private subnet resources to pull OS updates while rejecting inbound traffic from the internet.",
            "Security Groups: Stateful virtual firewalls at the instance ENI level."
          ]
        }
      ],
      questions: [
        {
          id: "q-devops-aws-1",
          prompt: "What is the key functional difference between AWS Security Groups and Network ACLs (NACLs)?",
          options: [
            { id: "a", label: "Security Groups are stateful and operate at the instance level; NACLs are stateless and operate at the subnet boundary" },
            { id: "b", label: "NACLs only work with IPv6" },
            { id: "c", label: "Security Groups require payment per rule" },
            { id: "d", label: "NACLs can only be configured in the AWS root account" }
          ],
          correctIndex: 0,
          explanation: "Security Groups are stateful (inbound traffic automatically allows return outbound traffic). NACLs are stateless and evaluate rules at the entire subnet boundary."
        }
      ]
    },
    {
      id: "devops-aws-quiz-1",
      moduleId: "mod-devops-3-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-devops-aws",
      subCourseTitle: "Amazon Web Services (AWS) Core Infrastructure",
      subCoursePosition: 3,
      title: "Sub-Course Assessment: AWS Cloud Architecture",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Cloud Reliability, Security & Storage",
      contentDescription: "Validate your knowledge of IAM role assumption, S3 encryption, EC2 Auto Scaling Groups, and Multi-AZ database redundancy.",
      questions: [
        {
          id: "q-devops-aws-2",
          prompt: "Why should an application running on an EC2 instance access S3 via an IAM Instance Profile rather than hardcoded AWS access keys?",
          options: [
            { id: "a", label: "Because IAM roles automatically rotate temporary credentials via STS, eliminating credential leakage risk" },
            { id: "b", label: "Because S3 does not accept access keys" },
            { id: "c", label: "Because roles are 10 times faster" },
            { id: "d", label: "Because access keys expire every 5 minutes" }
          ],
          correctIndex: 0,
          explanation: "IAM roles provide temporary short-lived credentials via the EC2 instance metadata service, preventing permanent secret leakage in source control."
        }
      ]
    }
  ]
};

export const devopsSubCourse3: CurriculumSubCourse = {
  id: "subcourse-devops-aws",
  title: "Amazon Web Services (AWS) Core Infrastructure",
  position: 3,
  duration: "5.5 hours",
  description: "Architect high-availability cloud infrastructure on AWS utilizing VPCs, private subnets, NAT gateways, IAM least-privilege policies, S3, and RDS.",
  modules: [devopsMod3_1],
  items: [...devopsMod3_1.items]
};

// --- SUB-COURSE 4: CI/CD Pipelines with GitHub Actions ---
const devopsMod4_1: CurriculumSubModule = {
  id: "mod-devops-4-1",
  subCourseId: "subcourse-devops-cicd",
  title: "Automated Testing, Container Registries & Deployments",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "devops-cicd-001",
      moduleId: "mod-devops-4-1",
      moduleTitle: "Automated Testing, Container Registries & Deployments",
      modulePosition: 1,
      subCourseId: "subcourse-devops-cicd",
      subCourseTitle: "CI/CD Pipelines with GitHub Actions",
      subCoursePosition: 4,
      title: "Production GitHub Actions Workflows: Test, Build & Deploy",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Continuous Integration & Automated Delivery Pipelines",
      contentDescription: "Construct production CI/CD workflows with GitHub Actions: linting, unit testing, matrix builds, container registry publishing (GHCR/ECR), and SSH zero-downtime deployment.",
      sections: [
        {
          title: "Complete GitHub Actions Workflow",
          explanation: "Automate build verification on pull requests and trigger automated deployment upon merging into the main branch.",
          codeSnippet: {
            language: "yaml",
            filename: ".github/workflows/deploy.yml",
            code: `name: Production CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - name: Build and Push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest,ghcr.io/\${{ github.repository }}:\${{ github.sha }}`
          }
        }
      ],
      questions: [
        {
          id: "q-devops-ci-1",
          prompt: "What does the `needs: test` clause signify in a multi-job GitHub Actions workflow?",
          options: [
            { id: "a", label: "It runs the jobs in parallel" },
            { id: "b", label: "The build-and-push job will only execute if the test job completes successfully" },
            { id: "c", label: "It installs Jest" },
            { id: "d", label: "It deletes test artifacts" }
          ],
          correctIndex: 1,
          explanation: "Job dependencies defined via `needs` ensure that downstream deployment steps are blocked if any upstream unit test or lint check fails."
        }
      ]
    },
    {
      id: "devops-cicd-quiz-1",
      moduleId: "mod-devops-4-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-devops-cicd",
      subCourseTitle: "CI/CD Pipelines with GitHub Actions",
      subCoursePosition: 4,
      title: "Sub-Course Assessment: CI/CD Pipeline Engineering",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Continuous Integration & Automated Delivery",
      contentDescription: "Evaluate your capability to structure deployment pipelines, manage repository secrets, implement rollback hooks, and cache dependencies.",
      questions: [
        {
          id: "q-devops-ci-2",
          prompt: "How should sensitive deployment credentials (e.g. AWS access keys or SSH private keys) be handled in GitHub Actions?",
          options: [
            { id: "a", label: "Committed to git in a secrets.txt file" },
            { id: "b", label: "Stored in GitHub Encrypted Repository Secrets and referenced using the \${{ secrets.MY_SECRET }} syntax" },
            { id: "c", label: "Hardcoded directly into the YAML file" },
            { id: "d", label: "Sent over HTTP via curl" }
          ],
          correctIndex: 1,
          explanation: "GitHub Repository Secrets are encrypted at rest using libsodium and automatically masked from build execution logs."
        }
      ]
    }
  ]
};

export const devopsSubCourse4: CurriculumSubCourse = {
  id: "subcourse-devops-cicd",
  title: "CI/CD Pipelines with GitHub Actions",
  position: 4,
  duration: "5 hours",
  description: "Automate testing, linting, Docker image building, container registry publication, and zero-downtime server deployments with GitHub Actions.",
  modules: [devopsMod4_1],
  items: [...devopsMod4_1.items]
};

// --- SUB-COURSE 5: Infrastructure as Code with Terraform ---
const devopsMod5_1: CurriculumSubModule = {
  id: "mod-devops-5-1",
  subCourseId: "subcourse-devops-terraform",
  title: "Terraform HCL, Providers & State Management",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "devops-tf-001",
      moduleId: "mod-devops-5-1",
      moduleTitle: "Terraform HCL, Providers & State Management",
      modulePosition: 1,
      subCourseId: "subcourse-devops-terraform",
      subCourseTitle: "Infrastructure as Code with Terraform",
      subCoursePosition: 5,
      title: "Declarative Cloud Infrastructure, State Locks & Modules",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Reproducible Cloud Provisioning with HashiCorp Terraform",
      contentDescription: "Master HashiCorp Configuration Language (HCL), the Terraform state lifecycle, remote state locking with S3 and DynamoDB, and building modular infrastructure.",
      sections: [
        {
          title: "Terraform HCL Production Configuration",
          explanation: "Terraform provisions resources declaratively by calculating the delta between your desired state files and the real-world cloud environment.",
          codeSnippet: {
            language: "hcl",
            filename: "main.tf",
            code: `terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "blezex-terraform-state-prod"
    key            = "vpc/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "blezex-prod-vpc"
    Environment = "production"
  }
}`
          }
        }
      ],
      questions: [
        {
          id: "q-devops-tf-1",
          prompt: "What catastrophe does DynamoDB state locking prevent when multiple DevOps engineers run `terraform apply` concurrently?",
          options: [
            { id: "a", label: "It stops AWS from billing the account" },
            { id: "b", label: "It prevents race conditions and state file corruption by locking the state during active operations" },
            { id: "c", label: "It automatically translates HCL into Python" },
            { id: "d", label: "It restarts the EC2 instance" }
          ],
          correctIndex: 1,
          explanation: "Distributed state locking via DynamoDB ensures that only one person or CI pipeline can mutate infrastructure at any given moment, preventing corrupt state files."
        }
      ]
    },
    {
      id: "devops-tf-quiz-1",
      moduleId: "mod-devops-5-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-devops-terraform",
      subCourseTitle: "Infrastructure as Code with Terraform",
      subCoursePosition: 5,
      title: "Sub-Course Assessment: Infrastructure as Code",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Terraform Declarative Provisioning",
      contentDescription: "Test your mastery of Terraform plan, apply, destroy lifecycle, output values, data sources, and module parameterization.",
      questions: [
        {
          id: "q-devops-tf-2",
          prompt: "What does the command `terraform plan` do?",
          options: [
            { id: "a", label: "Provisions cloud resources immediately" },
            { id: "b", label: "Compares the desired configuration against the state file and existing cloud resources to generate an execution preview" },
            { id: "c", label: "Deletes all resources" },
            { id: "d", label: "Reinstalls the AWS CLI" }
          ],
          correctIndex: 1,
          explanation: "`terraform plan` performs a dry run, reading cloud provider state and detailing exact additions, modifications, and destructions without applying changes."
        }
      ]
    }
  ]
};

export const devopsSubCourse5: CurriculumSubCourse = {
  id: "subcourse-devops-terraform",
  title: "Infrastructure as Code with Terraform",
  position: 5,
  duration: "5 hours",
  description: "Provision reproducible, immutable cloud infrastructure using HashiCorp Terraform, HCL, remote S3 state backends, DynamoDB state locking, and reusable modules.",
  modules: [devopsMod5_1],
  items: [...devopsMod5_1.items]
};

// --- SUB-COURSE 6: Kubernetes Orchestration & Production SRE Capstone ---
const devopsMod6_1: CurriculumSubModule = {
  id: "mod-devops-6-1",
  subCourseId: "subcourse-devops-k8s",
  title: "Kubernetes, Monitoring & Production Capstone",
  position: 1,
  duration: "6.5 hours",
  items: [
    {
      id: "devops-k8s-001",
      moduleId: "mod-devops-6-1",
      moduleTitle: "Kubernetes, Monitoring & Production Capstone",
      modulePosition: 1,
      subCourseId: "subcourse-devops-k8s",
      subCourseTitle: "Kubernetes Orchestration & Production SRE",
      subCoursePosition: 6,
      title: "Kubernetes Architecture: Pods, Deployments, Services & Ingress",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Container Orchestration with Kubernetes (K8s) & Site Reliability",
      contentDescription: "Understand the Kubernetes control plane (kube-apiserver, etcd, scheduler), worker nodes (kubelet, kube-proxy), Pods, rolling update Deployments, ClusterIP/NodePort/LoadBalancer Services, and Prometheus metrics.",
      sections: [
        {
          title: "Declarative Kubernetes Deployment Manifest",
          explanation: "Deploy scalable, self-healing container workloads with rolling updates, liveness probes, and resource requests.",
          codeSnippet: {
            language: "yaml",
            filename: "deployment.yaml",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: blezex-backend
  labels:
    app: blezex-backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: blezex-backend
  template:
    metadata:
      labels:
        app: blezex-backend
    spec:
      containers:
      - name: api
        image: ghcr.io/blezex/api:v1.2.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "250m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10`
          }
        }
      ],
      questions: [
        {
          id: "q-devops-k8s-1",
          prompt: "What does Kubernetes do if a container's liveness probe repeatedly fails?",
          options: [
            { id: "a", label: "It notifies the developer by SMS" },
            { id: "b", label: "The kubelet restarts the container according to its restartPolicy to restore application health" },
            { id: "c", label: "It deletes the entire cluster" },
            { id: "d", label: "It ignores the failure" }
          ],
          correctIndex: 1,
          explanation: "Liveness probes detect deadlocks or frozen processes. When they fail, kubelet terminates and restarts the container to auto-heal."
        }
      ]
    },
    {
      id: "devops-capstone-assignment",
      moduleId: "mod-devops-6-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-devops-k8s",
      subCourseTitle: "Kubernetes Orchestration & Production SRE",
      subCoursePosition: 6,
      title: "Capstone Project: Production Microservices Infrastructure & CI/CD",
      duration: "4 hours",
      type: "assignment",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Capstone Project: Enterprise Production Cloud Infrastructure",
      contentDescription: "Design, provision, and deploy a production-grade multi-tier web application using Terraform for AWS infrastructure, Docker containerization, GitHub Actions CI/CD, and Kubernetes orchestration with monitoring.",
      assignmentPrompt: {
        instructions: "Deliver a complete Infrastructure-as-Code repository and deployment architecture: (1) Terraform code provisioning a VPC and EKS/EC2 cluster, (2) Multi-stage Dockerfiles, (3) GitHub Actions workflow testing and pushing images, (4) Kubernetes manifests with rolling updates and ingress, and (5) Prometheus/Grafana monitoring dashboard configuration.",
        deliverables: [
          "Terraform manifests (main.tf, vpc.tf, variables.tf) with S3 remote state.",
          "Optimized multi-stage Dockerfile adhering to non-root security best practices.",
          "Complete GitHub Actions CI/CD workflow (.github/workflows/pipeline.yml).",
          "Kubernetes Deployment and Service YAML manifests with resource limits and probes.",
          "Architecture diagram and operational runbook for disaster recovery."
        ],
        starterCode: `# DevOps Production Capstone Architecture Overview
# 1. Terraform provisions VPC (2 Public, 2 Private subnets + NAT Gateway)
# 2. GitHub Actions runs linter, tests, builds Docker image, pushes to GHCR
# 3. K8s deployment rolls out new image with zero downtime (maxUnavailable: 0)
# 4. Prometheus scrapes metrics endpoint; Grafana displays 99th percentile latency`
      }
    }
  ]
};

export const devopsSubCourse6: CurriculumSubCourse = {
  id: "subcourse-devops-k8s",
  title: "Kubernetes Orchestration & Production SRE",
  position: 6,
  duration: "7 hours",
  description: "Deploy scalable container clusters using Kubernetes, configure Ingress, horizontal pod autoscalers, Prometheus observability, and complete the Production Cloud Infrastructure capstone.",
  modules: [devopsMod6_1],
  items: [...devopsMod6_1.items]
};

export const CLOUD_DEVOPS_MODULES: CurriculumSubCourse[] = [
  devopsSubCourse1,
  devopsSubCourse2,
  devopsSubCourse3,
  devopsSubCourse4,
  devopsSubCourse5,
  devopsSubCourse6
];
