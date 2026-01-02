# The Book Haven
A MERN + Firebase digital library where readers can explore, add, manage, and review books.

Live Site: https://a10frontend-seven.vercel.app/

## User-facing Features
- **Browse & discover**: Latest arrivals, top-rated lists, genres spotlight, book-of-the-week, author highlights, quick browse table, and related titles on detail pages.
- **Search, filter, sort**: Debounced search with genre/rating filters and sorting; pagination for large lists.
- **Details & reviews**: Public detail pages with gallery, key info, comments/reviews, and related suggestions.
- **Dashboard**: Protected dashboard with overview stats, genre chart, recent activity table, add/update/delete books, and “My Books” management.
- **Profile**: Editable name/photo with validation and success/error states.
- **Auth**: Email/password + Google login; demo user/admin autofill (env-driven); forgot password flow.
- **Contact & Help**: Contact form with validation/success feedback, Help/FAQ, and Privacy/Terms pages.
- **Accessibility & theming**: Light/dark theme, keyboard-friendly nav/dropdowns, strong focus states, and responsive layout across devices.

## Tech Stack
### Frontend
- React 19, Vite
- React Router 7
- Firebase Auth
- Axios
- React Hot Toast
- Custom CSS design system (light/dark themes)

### Backend
- Node.js + Express
- MongoDB Atlas
- CORS, dotenv

## Key Packages (frontend)
- `axios`
- `react-router-dom`
- `firebase`
- `react-hot-toast`
- `lucide-react` (icons)
- `animate.css` (hero animation)

## API Endpoints (used)
- `GET /all-books` – all books (listing, dashboard)
- `GET /books/latest` – latest books (home, related)
- `GET /books/top-rated` – top-rated (home)
- `GET /book-details/:id` – book details + comments
- `GET /myBooks?email=` – user’s books
- `POST /add-book` – create book
- `PUT /update-book/:id` – update book
- `DELETE /delete-book/:id` – delete book

## User Flows
- Register/login (email/password or Google), optional demo creds.
- Add/edit/delete your books from dashboard.
- View all books with search/filters/sort/pagination.
- Open book details, read summary/meta, browse gallery, post/edit/delete comments.
- Manage profile (name/photo).
- Submit contact form; read help/faq and privacy/terms.

## Deployment Notes
- Client: any static host (Netlify/Vercel/etc.)
- Server: Vercel/Render/Heroku
- Add deployed domain to Firebase Authentication authorized domains.  
