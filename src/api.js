const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export async function getAllBooks(sort) {
  const url = sort ? `${BASE_URL}/all-books?sort=${sort}` : `${BASE_URL}/all-books`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function getLatestBooks() {
  const res = await fetch(`${BASE_URL}/books/latest`);
  if (!res.ok) throw new Error("Failed to fetch latest books");
  return res.json();
}

export async function getBookDetails(id) {
  const res = await fetch(`${BASE_URL}/book-details/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book details");
  return res.json();
}

export async function addBook(book) {
  const res = await fetch(`${BASE_URL}/add-book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
}

export async function updateBook(id, payload) {
  const res = await fetch(`${BASE_URL}/update-book/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/delete-book/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
}

export async function getMyBooks(email) {
  const res = await fetch(`${BASE_URL}/myBooks?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Failed to fetch user books");
  return res.json();
}

export async function getTopRatedBooks() {
  const res = await fetch(`${BASE_URL}/books/top-rated`);
  if (!res.ok) throw new Error("Failed to fetch top rated books");
  return res.json();
}
