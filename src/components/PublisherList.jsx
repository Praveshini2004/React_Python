import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchPublishers, deletePublisher } from "../api";

export default function PublisherList() {
  const [publishers, setPublishers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadPublishers = async () => {
    try {
      const res = await fetchPublishers();
      setPublishers(res.data);
    } catch {
      alert("Error loading publishers");
    }
  };

  useEffect(() => {
    loadPublishers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePublisher(id);
      setDeleteId(null);
      loadPublishers();
    } catch {
      alert("Error deleting publisher");
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Typography variant="h4" flexGrow={1}>
          Publishers
        </Typography>
        <Button variant="contained" component={Link} to="/publishers/new">
          Add Publisher
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {publishers.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No publishers found
              </TableCell>
            </TableRow>
          )}

          {publishers.map((pub) => (
            <TableRow key={pub.id}>
              <TableCell>{pub.name}</TableCell>
              <TableCell>{pub.country}</TableCell>
              <TableCell>
                <IconButton component={Link} to={`/publishers/edit/${pub.id}`} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => confirmDelete(pub.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteId !== null} onClose={cancelDelete}>
        <DialogTitle>Are you sure you want to delete this publisher?</DialogTitle>
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
