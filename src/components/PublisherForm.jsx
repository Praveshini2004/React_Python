import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPublisher, createPublisher, updatePublisher } from "../api";

export default function PublisherForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const loadPublisher = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetchPublisher(id);
      setFormData({
        name: res.data.name,
        country: res.data.country,
      });
    } catch {
      alert("Failed to load publisher");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isEdit) loadPublisher();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.country) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isEdit) {
        await updatePublisher(id, formData);
      } else {
        await createPublisher(formData);
      }
      navigate("/publishers");
    } catch {
      alert("Error saving publisher");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" mb={2}>
        {isEdit ? "Edit Publisher" : "Add Publisher"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/publishers")}>
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
