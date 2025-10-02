# Book Review Platform

A fullstack MERN application for book reviews with user authentication, CRUD operations, and pagination.

## Features

- User authentication (signup/login) with JWT
- Book management (add, edit, delete, view) with pagination
- Review system with ratings and comments
- Protected routes for authenticated users
- Responsive UI with Tailwind CSS

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React, React Router, Axios, Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```
   The app will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books (paginated)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (auth required)
- `PUT /api/books/:id` - Update book (auth required, owner only)
- `DELETE /api/books/:id` - Delete book (auth required, owner only)

### Reviews
- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `POST /api/reviews` - Add review (auth required)
- `PUT /api/reviews/:id` - Update review (auth required, reviewer only)
- `DELETE /api/reviews/:id` - Delete review (auth required, reviewer only)

## Project Structure

```
book-review-platform/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Signup.js
│   │   │   ├── Login.js
│   │   ├── BookList.js
│   │   ├── BookDetails.js
│   │   ├── AddBook.js
│   │   ├── EditBook.js
│   │   └── Profile.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Usage

1. Sign up or log in to access the platform
2. View the list of books on the home page
3. Click on a book to view details and reviews
4. Add new books if logged in
5. Leave reviews and ratings for books
6. Edit or delete your own books and reviews
7. View your profile to see your books and reviews

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
