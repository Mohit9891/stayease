# 🏠 StayEase

> A full-stack Airbnb-inspired vacation rental platform built with the MERN stack. Browse listings, view property details, and manage your stays — all in one place.

![StayEase Banner](https://via.placeholder.com/1200x400?text=StayEase+–+Find+Your+Perfect+Stay)

---

## 🚀 Live Demo

- **Frontend:** [stayease.vercel.app](https://stayease.vercel.app) *(update with your URL)*
- **Backend API:** [stayease-api.onrender.com](https://stayease-api.onrender.com) *(update with your URL)*

---

## ✨ Features

- 🔍 Browse and search property listings
- 🏡 View detailed property pages with images and amenities
- 📅 Booking flow with date selection
- 👤 User authentication (JWT-based login & registration)
- 🛒 Host dashboard to create and manage listings
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | React.js, React Router, Tailwind CSS |
| Backend     | Node.js, Express.js                  |
| Database    | MongoDB Atlas, Mongoose              |
| Auth        | JWT, bcryptjs                        |
| Deployment  | Vercel (frontend), Render (backend)  |

---

## 📁 Project Structure

```
StayEase/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.jsx
├── server/                  # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/stayease.git
cd stayease
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Push `client/` to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set `VITE_API_URL` in Vercel environment variables
4. Deploy

### Backend → Render

1. Push `server/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`)
4. Set build command: `npm install` and start command: `node index.js`

---

## 🔮 Upcoming Features

- [ ] Google OAuth login
- [ ] Payment integration (Razorpay)
- [ ] Reviews and ratings
- [ ] Map view with location pins
- [ ] Email notifications

---

## 📸 Screenshots

> *(Add screenshots here)*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/your-username">Mohit</a></p>
