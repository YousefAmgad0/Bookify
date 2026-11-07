# Bookify 📚

A book discovery app that lets you search for books, explore their details, and save them to your personal library.

**[Live Demo](https://bookify-dusky.vercel.app)** · **[GitHub Repository](https://github.com/YousefAmgad0/Bookify)**

## About

Bookify is a multi-page web application built with Vanilla JavaScript.

It uses the Open Library API to fetch book data. You can search for books, view information about each title, and save books to your personal library.

The application has three pages: Home, Explore, and My Library. Book details appear in a Bootstrap modal, while saved books are stored in the browser using LocalStorage.

## Features

- View featured books and book categories on the Home page.
- Search for books using the Open Library API.
- View book details, including author, description, and available subjects.
- Add books to your personal library.
- Remove books from your library.
- Prevent duplicate books from being added.
- Keep your saved books after refreshing the page.
- Display loading, empty, and error states during book searches.
- Handle loading and errors when fetching book details.
- Responsive layout for different screen sizes.

## Pages

| Page           | Description                                  |
| -------------- | -------------------------------------------- |
| **Home**       | Displays featured books and book categories. |
| **Explore**    | Search for books and view their details.     |
| **My Library** | View and manage your saved books.            |

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- Vite
- Open Library API
- LocalStorage

## Project Structure

```text
Bookify/
├── src/
│   ├── css/
│   │   ├── global.css
│   │   ├── home.css
│   │   ├── explore.css
│   │   └── library.css
│   └── js/
│       ├── components/
│       │   ├── bookCard.js
│       │   ├── bookModal.js
│       │   ├── footer.js
│       │   └── navbar.js
│       ├── modules/
│       │   ├── api.js
│       │   ├── bookActions.js
│       │   ├── books.js
│       │   ├── storage.js
│       │   └── ui.js
│       └── pages/
│           ├── home.js
│           ├── explore.js
│           └── library.js
├── index.html
├── explore.html
├── library.html
├── package.json
└── vite.config.js
```

## Getting Started

To run Bookify locally, make sure you have [Node.js](https://nodejs.org/) installed.

**1. Clone the repository**

```bash
git clone https://github.com/YousefAmgad0/Bookify.git
```

**2. Navigate to the project folder**

```bash
cd Bookify
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

## API

Bookify uses the [Open Library API](https://openlibrary.org/developers/api) to search for books and retrieve book and author information.

Saved books are stored locally in the browser, so the application does not require an account or a backend database.

## Author

**Yousef Amgad**

[GitHub Profile](https://github.com/YousefAmgad0)
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
