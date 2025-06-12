import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import PublisherList from "./components/PublisherList";
import PublisherForm from "./components/PublisherForm";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Book Inventory
          </Typography>
          <Button color="inherit" component={Link} to="/books">
            Books
          </Button>
          <Button color="inherit" component={Link} to="/publishers">
            Publishers
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />

          <Route path="/publishers" element={<PublisherList />} />
          <Route path="/publishers/new" element={<PublisherForm />} />
          <Route path="/publishers/edit/:id" element={<PublisherForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
