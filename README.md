# 🌐 ConnectHub

> A clean and modern **professional networking platform** inspired by LinkedIn.  
> Built with **React**, **Tailwind CSS**, **Node.js**, and **MongoDB**, ConnectHub lets users create accounts, share text-only posts, view profiles, and explore a public feed in real-time.

---

## 🚀 Live Demo

- 🔗 **Frontend**: [https://minilinkedin-flame.vercel.app/](https://minilinkedin-flame.vercel.app/) 
- 🔗 **Backend**: [https://linkedinbackerd.vercel.app/](https://linkedinbackerd.vercel.app/)

- 🔗 **Video**: [https://youtu.be/BgScljC5Z6o?si=RAfL_5L063CXD7tK/](https://youtu.be/BgScljC5Z6o?si=RAfL_5L063CXD7tK/)

---

## ✨ Features

### ✅ User Authentication
- Register & login with email + password  
- Secure session using **JWT**  
- User profile includes **name**, **email**, and **bio**

### 📰 Public Post Feed
- Text-only post creation  
- Displays all users’ posts in a **real-time feed**  
- Shows **author name** and **timestamp**
- User can **like** and **comment** on Other Post.

### 👤 Profile Page
- View any user’s public profile  
- See their **bio** , **list of posts** , **Comments**

### Extra Features

- **Update** and **Delete** the posts.
- Only the **author** of the post can **edit** or **delete** it.
- User can **like** and **comment** on Other Post.
- **Deletion** is secure and includes proper **authorization** checks.
- Users can **update** the content in-place, similar to LinkedIn’s inline editing.
- Profile Picture Upload .


---


## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, Vite, Tailwind CSS           |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB + Mongoose                  |
| Auth      | JWT, bcrypt.js                      |
| Hosting   | Vercel (frontend & backend)         |

---

## ⚙️ Getting Started

### 🧩 Clone Both Repositories

#### 🔷 Frontend

```bash
git clone https://github.com/your-username/connecthub.git
cd client
npm install
npm run dev
```

#### 🔷 Backend

```bash 
cd server
npm install
npm run dev
