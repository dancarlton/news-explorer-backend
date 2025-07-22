# 🧠 NewsExplorer – Backend

The backend for the NewsExplorer app is a secure, RESTful Node.js + Express API that supports user authentication, article storage, and communication with third-party news services. It’s built with scalability and modularity in mind, and connects to a MongoDB database.

---

## 🔐 Features

- User registration and login (with JWT)
- Token-based authentication for protected routes
- Save and delete articles to user profile
- Input validation with Celebrate + Joi
- Secure password hashing with bcrypt
- Centralized error handling

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Validation:** Celebrate (Joi)
- **Auth:** bcrypt, JWT
- **CORS + Security:** Helmet, rate limiter
- **Logging:** Winston

---

## 📁 Folder Structure

```
📦 backend
 ┣ 📂 controllers
 ┣ 📂 models
 ┣ 📂 routes
 ┣ 📂 middlewares
 ┣ 📂 utils
 ┣ 📜 app.js
 ┣ 📜 index.js
 ┗ 📜 .env
```

---

## 📄 API Endpoints

### Auth

- `POST /signup` – Create new user
- `POST /signin` – Login existing user

### Users

- `GET /users/me` – Get current user info

### Articles

- `GET /articles` – Get saved articles
- `POST /articles` – Save an article
- `DELETE /articles/:articleId` – Delete saved article by ID

---

## 🛠️ Setup & Run Locally

1. **Clone the repo**
   ```
   git clone https://github.com/dancarlton/news-explorer-backend.git
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root:

   ```
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/newsexplorer
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**
   ```
   npm run dev
   ```

---

## 🔐 Security

- Passwords hashed using bcrypt before storing
- JWTs used for session management
- All sensitive routes are protected via `auth` middleware
- Rate limiting + Helmet headers for added security
