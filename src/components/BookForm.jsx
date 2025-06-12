// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Stack,
//   MenuItem,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchBook, createBook, updateBook, fetchPublishers } from "../api";

// export default function BookForm() {
//   const { id } = useParams();
//   const isEdit = Boolean(id);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [publishers, setPublishers] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     price: "",
//     stock: "",
//     publisher_id: "",
//   });

//   const loadPublishers = async () => {
//     try {
//       const res = await fetchPublishers();
//       setPublishers(res.data);
//     } catch {
//       alert("Failed to load publishers");
//     }
//   };

//   const loadBook = async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const res = await fetchBook(id);
//       const book = res.data;
//       setFormData({
//         title: book.title,
//         author: book.author,
//         price: book.price,
//         stock: book.stock,
//         publisher_id: book.publisher_id,
//       });
//     } catch {
//       alert("Failed to load book");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadPublishers();
//     if (isEdit) loadBook();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((f) => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.publisher_id) {
//       alert("Please select a publisher");
//       return;
//     }

//     try {
//       if (isEdit) {
//         await updateBook(id, {
//           price: parseFloat(formData.price),
//           stock: parseInt(formData.stock, 10),
//         });
//       } else {
//         await createBook({
//           title: formData.title,
//           author: formData.author,
//           price: parseFloat(formData.price),
//           stock: parseInt(formData.stock, 10),
//           publisher_id: parseInt(formData.publisher_id, 10),
//         });
//       }
//       navigate("/books");
//     } catch (error) {
//       alert("Error saving book. Check console.");
//       console.error(error);
//     }
//   };

//   if (loading) return <CircularProgress />;

//   return (
//     <>
//       <Typography variant="h4" mb={2}>
//         {isEdit ? "Edit Book" : "Add Book"}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         {!isEdit && (
//           <>
//             <TextField
//               label="Title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Author"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//             />
//           </>
//         )}
//         <TextField
//           label="Price"
//           name="price"
//           type="number"
//           inputProps={{ step: "0.01", min: 0 }}
//           value={formData.price}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Stock"
//           name="stock"
//           type="number"
//           inputProps={{ min: 0 }}
//           value={formData.stock}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />

//         <TextField
//           select
//           label="Publisher"
//           name="publisher_id"
//           value={formData.publisher_id}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         >
//           {publishers.map((pub) => (
//             <MenuItem key={pub.id} value={pub.id}>
//               {pub.name} ({pub.country})
//             </MenuItem>
//           ))}
//         </TextField>

//         <Stack direction="row" spacing={2} mt={3}>
//           <Button variant="contained" type="submit">
//             {isEdit ? "Update" : "Create"}
//           </Button>
//           <Button variant="outlined" onClick={() => navigate("/books")}>
//             Cancel
//           </Button>
//         </Stack>
//       </form>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBook, createBook, updateBook, fetchPublishers } from "../api";

export default function BookForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [publishers, setPublishers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    publisher_id: "",
  });

  const loadPublishers = async () => {
    try {
      const res = await fetchPublishers();
      setPublishers(res.data);
    } catch {
      alert("Failed to load publishers");
    }
  };

  const loadBook = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetchBook(id);
      const book = res.data;
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price,
        stock: book.stock,
        publisher_id: book.publisher_id.toString(),
      });
    } catch {
      alert("Failed to load book");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPublishers();
    if (isEdit) loadBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.publisher_id) {
      alert("Please select a publisher");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        publisher_id: parseInt(formData.publisher_id, 10),
      };

      if (isEdit) {
        await updateBook(id, payload);
      } else {
        await createBook(payload);
      }
      navigate("/books");
    } catch (error) {
      alert("Error saving book. Check console.");
      console.error(error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" mb={2}>
        {isEdit ? "Edit Book" : "Add Book"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={false}
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={false}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          inputProps={{ step: "0.01", min: 0 }}
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          inputProps={{ min: 0 }}
          value={formData.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Publisher"
          name="publisher_id"
          value={formData.publisher_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {publishers.map((pub) => (
            <MenuItem key={pub.id} value={pub.id.toString()}>
              {pub.name} ({pub.country})
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/books")}>
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
