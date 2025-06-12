import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchBooks, deleteBook } from "../api";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const loadBooks = async () => {
    try {
      const params = {};
      if (searchTitle) params.title = searchTitle;
      if (searchAuthor) params.author = searchAuthor;

      const res = await fetchBooks(params);
      setBooks(res.data);
    } catch (error) {
      alert("Error loading books");
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setDeleteId(null);
      loadBooks();
    } catch (error) {
      alert("Error deleting book");
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Typography variant="h4" flexGrow={1}>
          Books
        </Typography>
        <Button variant="contained" component={Link} to="/books/new">
          Add Book
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search Title"
          variant="outlined"
          size="small"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <TextField
          label="Search Author"
          variant="outlined"
          size="small"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <Button variant="outlined" onClick={loadBooks}>
          Search
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No books found
              </TableCell>
            </TableRow>
          )}

          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>${book.price.toFixed(2)}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>{book.publisher?.name}</TableCell>
              <TableCell>
                <IconButton component={Link} to={`/books/edit/${book.id}`} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => confirmDelete(book.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteId !== null} onClose={cancelDelete}>
        <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button color="error" onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
