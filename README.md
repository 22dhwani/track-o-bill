# 💸 Track-o-Bill — Smart Expense Tracking & Management Platform

Track-o-Bill is a **full-stack expense management web application** that simplifies how groups and individuals **track, split, and settle shared expenses**.  
Built with **React.js + Tailwind CSS** on the frontend and a **Django REST API** backend, fully containerized using **Docker** for seamless deployment and scalability.

---

## 🚀 Key Features

- 💰 **Expense Tracking:** Log, split, and manage group or individual expenses in real time.  
- 👥 **Group Management:** Create, join, and manage shared groups or events effortlessly.  
- ⚡ **Smart Settlements:** Automatically calculate who owes whom and how much.  
- 📱 **Responsive UI:** Built with **React.js**, **Context API**, and **Tailwind CSS** for a clean, dynamic interface.  
- 🐍 **Robust Backend:** Powered by **Django REST Framework**, ensuring secure API endpoints and efficient data handling.  
- 🐳 **Containerized Deployment:** Uses **Docker** to streamline local development and deployment across environments.  
- 🔐 **User Authentication:** JWT-based secure login, signup, and session management.  
- 🧩 **Scalable Architecture:** Designed for easy extension — add analytics, notifications, or payment gateways effortlessly.

---

## 🧱 Project Structure

track-o-bill/
│
├── frontend/ # React.js + Vite + Tailwind CSS
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Django REST Framework + PostgreSQL
│ ├── manage.py
│ ├── trackobill_api/
│ └── requirements.txt


## 🧠 Architecture Overview

```mermaid
graph TD
    A[Frontend: React + Vite + Tailwind] --> B[Backend: Django REST API]
    B --> C[(PostgreSQL Database)]
    B --> D[Docker Containers]
    D --> E[Deployment: Cloud / Local]
