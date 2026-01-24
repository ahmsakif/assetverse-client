# 🚀 AssetVerse | Corporate Asset Management System

![AssetVerse Banner](https://i.ibb.co.com/Zp5QZp3D/image.png)

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://your-live-site-link.com)
[![Repo](https://img.shields.io/badge/GitHub-Repo-blue?style=for-the-badge)](https://github.com/your-username/assetverse)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

</div>

## 📖 About The Project

**AssetVerse** is a modern, full-stack web application designed to help HR Managers and Businesses track their physical assets (laptops, chairs, equipment) and manage employee assignments.

Built with a **Premium Dark SaaS Aesthetic**, it features role-based access control (HR vs. Employee), real-time tracking, PDF reporting, and Stripe payment integration for subscription packages.

---

## ✨ Key Features

### 🏢 For HR Managers (Admin)
* **Asset Lifecycle:** Add, update, and delete company assets.
* **Request Management:** Approve or reject asset requests from employees.
* **Team Management:** View My Team, add employees, and track individual asset history.
* **Subscription System:** Upgrade employee limits using **Stripe Payment Gateway**.
* **Reports:** Generate printable PDF reports for inventory audits.
* **Visual Dashboard:** Charts and stats for stock availability and item types.

### 👨‍💻 For Employees
* **Self-Service Portal:** Browse available company assets and request items.
* **My Assets:** View currently assigned equipment and approval status.
* **History:** Track request history and returnable/non-returnable status.
* **Profile:** Manage profile details.

### 🎨 UI/UX Highlights
* **Glassmorphism Design:** Modern, translucent UI elements with blur effects.
* **Bento Grid Layouts:** Trendy, grid-based feature showcases.
* **Animations:** Smooth transitions using **Framer Motion**.
* **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS, DaisyUI
* **Animations:** Framer Motion
* **State/Data:** TanStack Query (React Query), Axios
* **Forms:** React Hook Form
* **Visualization:** Recharts, React-PDF
* **Notifications:** React Hot Toast

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (CRUD Operations, Aggregations)
* **Authentication:** JWT (JSON Web Tokens) & Firebase Auth

### Third-Party Services
* **Auth:** Firebase (Google & Email/Password)
* **Payments:** Stripe
* **Image Hosting:** ImgBB API

---

## 📸 Screenshots

| Landing Page | Dashboard |
|:---:|:---:|
| ![Landing](https://i.ibb.co.com/Zp5QZp3D/image.png) | ![Dashboard](https://i.ibb.co.com/GQr129mx/image.png) |

| Pricing Section | Asset List |
|:---:|:---:|
| ![Pricing](https://i.ibb.co.com/bMZmnFrK/image.png) | ![List](https://placehold.co/600x400/1e293b/white?text=Asset+List) |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v16+)
* MongoDB URI
* Firebase Project
* Stripe Account

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/assetverse.git](https://github.com/your-username/assetverse.git)
    cd assetverse
    ```

2.  **Install Dependencies (Client)**
    ```bash
    cd client
    npm install
    ```

3.  **Install Dependencies (Server)**
    ```bash
    cd server
    npm install
    ```

4.  **Configure Environment Variables**
    Create a `.env.local` file in the **client** folder:
    ```env
    VITE_APIKey=your_firebase_api_key
    VITE_AuthDomain=your_firebase_auth_domain
    VITE_ProjectId=your_firebase_project_id
    VITE_StorageBucket=your_firebase_storage_bucket
    VITE_MessagingSenderId=your_firebase_sender_id
    VITE_AppId=your_firebase_app_id
    VITE_IMAGE_BB_API_KEY=your_imgbb_key
    VITE_API_URL=http://localhost:5000
    VITE_STRIPE_PUBLIC_KEY=your_stripe_pk
    ```

    Create a `.env` file in the **server** folder:
    ```env
    DB_USER=your_mongo_user
    DB_PASS=your_mongo_pass
    ACCESS_TOKEN_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_sk
    ```

5.  **Run the Project**
    * **Server:** `nodemon index.js` (or `node index.js`)
    * **Client:** `npm run dev`

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/your-username">Your Name</a>
</p>