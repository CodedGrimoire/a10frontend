# The Book Haven
A full-stack MERN + Firebase Authentication digital library where users can explore, add, manage, and review books.
Live Site: <YOUR LIVE URL HERE>

## Features
- Firebase Authentication (Email/Password + Google Login)
- CRUD operations for books
- User-specific “My Books” page
- Axios for all data fetching
- React Hot Toast for notifications (success/error)
- React Tooltip for hover-based hints
- Image upload using imgbb
- Dynamic homepage: Latest Books, Top Genres, Book of the Week
- Sorting books based on rating
- Fully responsive UI with custom loader and a 404 page

## Packages Used (Frontend)
- axios  
- react-hot-toast  
- react-tooltip  
- react-router-dom  
- firebase  
- dotenv (Vite env)  

## Packages Used (Backend)
- express  
- mongoose  
- cors  
- dotenv  
- nodemon (dev)

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- React Hot Toast
- React Tooltip
- Firebase Authentication
- Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- CORS
- dotenv


## Key Functionalities

### Authentication
- Register with name, email, photoURL, password
- Login with email/password or Google
- Proper redirects after login
- Error/success messages handled by React Hot Toast

### CRUD Operations
- Add Book (private route)
- View All Books
- Update Book (private route)
- Delete Book (private route)
- View books added by the logged-in user

### UI and UX
- Navbar and Footer on all pages
- Animated homepage banner
- Latest 6 books loaded dynamically
- Additional static sections (Top Genres, Book of the Week, About)
- Loading spinners while fetching
- Custom 404 page
- React Tooltip added on icons and user info


## API Endpoints

### Books
GET /books                -> All books  
GET /books/latest         -> Latest 6 books  
GET /books/top-rated      -> Top rated books  
GET /books/:id            -> Single book  
POST /books               -> Add book  
PUT /books/:id            -> Update book  
DELETE /books/:id         -> Delete book  
GET /myBooks              -> Books added by logged-in user  


## Deployment
- Client: Netlify, Surge, or Firebase Hosting
- Server: Vercel or Render
- Add deployed domain to Firebase Authentication > Authorized Domains

## Notes
- All notifications use React Hot Toast
- All API calls use Axios
- React Tooltip used for hover hints and user info
- Firebase Authentication preserves login state after reload
- Fully responsive layout across mobile, tablet, and desktop
live link - https://a10frontend-seven.vercel.app/
