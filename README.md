 Movie Management (Movie Mgt)

This is a full-stack Movie Management application built using the **MERN stack** (MongoDB, Express, React, Node.js). The application allows users to register, log in, search for movies, and manage their favorite movies.

Folder Structure

 1. Movie Mgt (Main Folder)
The project is divided into two main folders:
- backend: Contains the server-side code and API endpoints.
- frontend: Contains the React application for the user interface.


 **Starting the Backend:**
To start the backend, follow these steps:
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Run the backend using **Nodemon**:
   ```bash
   npx nodemon index.js
   ```

---

### **Starting the Frontend:**
To start the frontend, follow these steps:
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Run the frontend using **Vite**:
   ```bash
   npm run dev
   ```

---

## Features

1. **User Authentication**: Users can register and log in using JWT-based authentication.
2. **Movie Search**: Users can search for movies using the iTunes API.
3. **Favorites Management**: Users can add, remove, and view their favorite movies.
4. **Persistent Data**: The list of favorite movies is persisted using **MongoDB**.

---

## Environment Variables

Create a `.env` file in the root of the backend directory and add the following:

```env
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
ITUNES_API_URL=<Your iTunes API URL>
```

---

## Technologies Used

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB (via Mongoose)
- **Styling**: CSS (custom)

---
## Conclusion

This project is a simple movie management application that allows users to manage their favorite movies while offering features such as authentication, searching, and CRUD operations on favorites. You can easily extend this project by adding more features like ratings, reviews, or social sharing.
