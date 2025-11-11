// src/api/comments.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// get all comments for a specific book
export async function getCommentsByBookId(bookId) {
  const res = await axios.get(`${API_URL}/books/${bookId}/comments`);
  return res.data || [];
}

// create a comment
export async function createComment({ bookId, userEmail, userName, comment }) {
  const res = await axios.post(`${API_URL}/comments`, {
    bookId,
    userEmail,
    userName,
    comment,
  });
  return res.data;
}

// update a comment
export async function updateComment(commentId, commentText) {
  const res = await axios.put(`${API_URL}/comments/${commentId}`, {
    comment: commentText,
  });
  return res.data;
}

// delete a comment
export async function deleteComment(commentId) {
  const res = await axios.delete(`${API_URL}/comments/${commentId}`);
  return res.data;
}
