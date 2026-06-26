# 📌 Job Application Tracker

A modern web-based **Job Application Tracker** built using **HTML, CSS, and JavaScript**. This project helps students organize and monitor internship and job applications through an interactive dashboard. It includes application management, analytics, login functionality, and cloud deployment using Microsoft Azure.

---

# 📖 Project Overview

Finding and tracking multiple internship and job applications during placement season can be difficult. This project provides a centralized dashboard where users can:

* Add new job applications
* Update application status
* Search applications
* Delete applications
* View dashboard statistics
* Analyze application progress using charts

The project also demonstrates cloud deployment using **Azure App Service**, **Azure Storage**, **Azure Monitor**, **Docker**, and **GitHub Version Control**.

---

# 🚀 Features

* 🔐 Login Page
* ➕ Add Job Applications
* 🔄 Update Application Status
* 🔍 Search Applications
* 🗑 Delete Applications
* 📊 Dashboard Summary Cards
* 📈 Application Analytics Chart
* 💾 Local Storage Support
* ☁ Azure Cloud Deployment

---

# 📌 Status Categories

* Applied
* Shortlisted
* Interview Scheduled
* Rejected
* Selected

---

# 🛠 Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Libraries

* Chart.js

### Browser Storage

* Local Storage

### Cloud Services

* Microsoft Azure App Service
* Azure Storage
* Azure Monitor

### DevOps

* Git
* GitHub
* Docker

---

# 📂 Project Structure

```
Job-Application-Tracker
│
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── .dockerignore
├── README.md
└── images
```

---

# 🏗 Project Architecture

```
User
   │
   ▼
Login Page
   │
   ▼
Job Application Dashboard
   │
   ▼
Browser Local Storage
   │
   ▼
Azure App Service
   │
   ▼
Azure Monitor
```

---

# 📊 Dashboard

The dashboard displays:

* Total Applications
* Interview Scheduled
* Rejected Applications
* Selected Applications

---

# 📈 Analytics

The application uses **Chart.js** to visualize:

* Applied
* Shortlisted
* Interview Scheduled
* Rejected
* Selected

---

# 💾 Data Storage

Current Version

* Browser Local Storage

Future Cloud Version

* Azure Storage Account

---

# 🐳 Docker Deployment

## Step 1: Install Docker Desktop

Download and install Docker Desktop.

---

## Step 2: Create Dockerfile

Create a file named:

```
Dockerfile
```

Add:

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
```

---

## Step 3: Create .dockerignore

```
.git
.vscode
```

---

## Step 4: Build Docker Image

```bash
docker build -t job-application-tracker .
```

---

## Step 5: Run Docker Container

```bash
docker run -d -p 8080:80 job-application-tracker
```

Open:

```
http://localhost:8080
```

---

# 🔄 GitHub Version Control

## Initialize Git

```bash
git init
```

## Add Files

```bash
git add .
```

## Commit Changes

```bash
git commit -m "Initial Commit"
```

## Create Main Branch

```bash
git branch -M main
```

## Add Remote Repository

```bash
git remote add origin https://github.com/yourusername/job-application-tracker.git
```

## Push to GitHub

```bash
git push -u origin main
```

---

# ☁ Azure Deployment

## Step 1

Create a Resource Group.

---

## Step 2

Create an Azure App Service Plan.

---

## Step 3

Create an Azure Web App.

Select:

* Linux
* Docker Container

---

## Step 4

Open **Deployment Center**.

Connect:

* GitHub Account
* Repository
* Branch (main)

Azure automatically builds and deploys the application.

---

## Step 5

Browse the Azure Web App URL.

Example:

```
https://jobapplicationtracker.azurewebsites.net
```

---

# 📊 Azure Services Used

## Azure App Service

* Hosts the web application
* Provides scalability
* Automatic deployment

---

## Azure Storage

* Stores application records
* Supports cloud-based persistence

---

## Azure Monitor

* Tracks application health
* Logs performance
* Displays metrics

---

# 🔮 Future Enhancements

* User Registration
* Azure SQL Database
* Azure Blob Storage Integration
* Email Notifications
* Responsive Mobile Design
* Dark/Light Theme
* Role-Based Authentication

---

# 👨‍💻 Developed By

**Syed Nadeem Ahmed A**

B.Tech – Artificial Intelligence & Data Science

---

# 📜 License

This project is developed for educational and learning purposes.
