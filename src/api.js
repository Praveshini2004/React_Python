import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE,
});

// Books
export const fetchBooks = (params) => api.get("/books/search-books", { params });
export const fetchBook = (id) => api.get(`/books/${id}`);
export const createBook = (data) => api.post("/books/", data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// Publishers
export const fetchPublishers = () => api.get("/publishers/");
export const fetchPublisher = (id) => api.get(`/publishers/${id}`);
export const createPublisher = (data) => api.post("/publishers/", data);
export const updatePublisher = (id, data) => api.put(`/publishers/${id}`, data);
export const deletePublisher = (id) => api.delete(`/publishers/${id}`);
