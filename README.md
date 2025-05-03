# Bookshelf API

A RESTful API for managing a virtual bookshelf, built with Node.js and Hapi framework. This API allows you to create, read, update, and delete books, as well as filter books by various criteria.

## Features

- Store and manage books with rich metadata
- Create new books with validation
- Retrieve all books with optional filtering
- Get detailed information about specific books
- Update existing books
- Delete books
- In-memory data storage (no database setup required)

## Requirements

- Node.js (LTS 18.13.0 or newer recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository or download the source code:
   ```bash
   git clone https://github.com/kyyril/bookshelf-api.git
   cd bookshelf-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the server:
```bash
npm run start
```

For development with automatic restart on file changes:
```bash
npm run start-dev
```

The server will run on `http://localhost:9000`.

## Linting

Check code quality with ESLint:
```bash
npm run lint
```

## API Endpoints

### 1. Add Book
- **Method**: POST
- **URL**: `/books`
- **Request Body**:
  ```json
  {
    "name": "Book Name",
    "year": 2023,
    "author": "Author Name",
    "summary": "Book summary",
    "publisher": "Publisher Name",
    "pageCount": 200,
    "readPage": 50,
    "reading": true
  }
  ```
- **Success Response** (201):
  ```json
  {
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
      "bookId": "unique-id"
    }
  }
  ```

### 2. Get All Books
- **Method**: GET
- **URL**: `/books`
- **Query Parameters**:
  - `name`: Filter by book name (case insensitive)
  - `reading`: Filter by reading status (1 = reading, 0 = not reading)
  - `finished`: Filter by finished status (1 = finished, 0 = not finished)
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "books": [
        {
          "id": "unique-id",
          "name": "Book Name",
          "publisher": "Publisher Name"
        }
      ]
    }
  }
  ```

### 3. Get Book Detail
- **Method**: GET
- **URL**: `/books/{bookId}`
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "book": {
        "id": "unique-id",
        "name": "Book Name",
        "year": 2023,
        "author": "Author Name",
        "summary": "Book summary",
        "publisher": "Publisher Name",
        "pageCount": 200,
        "readPage": 50,
        "finished": false,
        "reading": true,
        "insertedAt": "timestamp",
        "updatedAt": "timestamp"
      }
    }
  }
  ```

### 4. Update Book
- **Method**: PUT
- **URL**: `/books/{bookId}`
- **Request Body**: Same as POST
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "message": "Buku berhasil diperbarui"
  }
  ```

### 5. Delete Book
- **Method**: DELETE
- **URL**: `/books/{bookId}`
- **Success Response** (200):
  ```json
  {
    "status": "success",
    "message": "Buku berhasil dihapus"
  }
  ```

## Error Responses

### 1. Missing Book Name
- **Status Code**: 400
- **Response**:
  ```json
  {
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
  }
  ```

### 2. ReadPage > PageCount
- **Status Code**: 400
- **Response**:
  ```json
  {
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
  }
  ```

### 3. Book Not Found
- **Status Code**: 404
- **Response**:
  ```json
  {
    "status": "fail",
    "message": "Buku tidak ditemukan"
  }
  ```

## Sample Usage

### Adding a Book

```bash
curl -X POST http://localhost:9000/books \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harry Potter and the Philosopher'\''s Stone",
    "year": 1997,
    "author": "J.K. Rowling",
    "summary": "The story of a young wizard who discovers his magical heritage on his eleventh birthday.",
    "publisher": "Bloomsbury",
    "pageCount": 223,
    "readPage": 100,
    "reading": true
  }'
```

### Getting All Books

```bash
curl http://localhost:9000/books
```

### Getting Books by Filter

```bash
curl "http://localhost:9000/books?name=potter&reading=1"
```

## Project Structure

```
bookshelf-api/
├── src/
│   ├── handler.js  # Request handlers for all endpoints
│   ├── routes.js   # API route definitions
│   ├── server.js   # Server configuration and startup
│   └── books.js    # In-memory data store
├── .eslintrc.json  # ESLint configuration
├── package.json    # Project metadata and dependencies
└── README.md       # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Built with [Hapi](https://hapi.dev/) - A rich framework for building applications and services
- Uses [nanoid](https://github.com/ai/nanoid) for generating unique IDs