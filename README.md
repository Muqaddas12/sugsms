# 🎓 Student Application Portal (React Native + DigiCampus API)

This is a secure mobile application built with React Native that allows students to upload their documents and track application status. Only students authenticated via the DigiCampus API can access this portal. Each student is allowed to upload **one file only**, and can check their current application status.

---

## 🚀 Features

* 🔐 **DigiCampus Login** — Only authenticated students can access the app.
* 📄 **One-time Upload** — Each student can upload a document only once.
* 📃 **Track Application** — Students can view the status of their application (Pending, Accepted, Rejected).
* 🗾 **PDF Viewer** — View uploaded file as PDF.
* ☁️ **Cloud Upload** — Uploads are stored securely in the backend.

---

## 💠 Tech Stack

| Tech           | Use                           |
| -------------- | ----------------------------- |
| React Native   | Mobile frontend               |
| Axios / Fetch  | API communication             |
| DigiCampus API | Authentication system         |
| Express.js     | Backend (Node.js & REST API)  |
| MongoDB        | Database for storing metadata |
| Multer         | Handling file uploads         |
| JWT            | Secure session management     |

---

## 📁 Folder Structure

```
📆 student-application-app
┣ 📂 backend
┃ ┣ 📄 server.js
┃ ┣ 📄 routes/
┃ ┣ 📄 models/
┃ ┗ 📄 middlewares/
┣ 📂 frontend (React Native)
┃ ┣ 📂 components/
┃ ┣ 📂 screens/
┃ ┣ 📄 App.js
┃ ┗ 📄 services/
```

---

## 📡 API Endpoints (Backend)

### Auth

* `POST /api/login` → Authenticate using DigiCampus

### Application

* `GET /api/application/me` → Fetch current student’s application
* `POST /api/application/upload` → Upload a new application (PDF only)

---

## 🚧 Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend (React Native)

```bash
cd frontend
npm install
npx react-native run-android # or run-ios
```

> ⚠️ Make sure to connect both backend & frontend using your local IP or a secure server address.

---

## 👥 User Flow

1. Student logs in with DigiCampus credentials.
2. JWT token is saved locally.
3. On dashboard:

   * If no file uploaded: Upload screen is shown.
   * If file uploaded: Application status is shown.
4. Student cannot upload again until status is updated by admin.

---

## 📉 Status Codes

* **Pending** — File uploaded, not reviewed yet.
* **Accepted** — Application is approved.
* **Rejected** — Application is declined (student can re-upload).

---

## 🎉 Contribution

Feel free to fork and contribute via pull requests!

### To Contribute:

* Fork this repo
* Create a feature branch
* Make changes
* Submit a PR

---

## 🚩 License

This project is licensed under the MIT License.
