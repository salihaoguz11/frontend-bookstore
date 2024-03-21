import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { Box, Button, TextField, Typography } from "@mui/material";

const EditBookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { formData } = location.state;

  const [editFormData, setEditFormData] = useState(formData);

  const baseURL = `http://localhost:8000/books/${id}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(baseURL, editFormData);
      console.log(response.data);
      navigate("/");
      toastSuccessNotify("Succesfully Updated");
    } catch (err) {
      console.log(err);
      toastErrorNotify("Oops, Something went wrong!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
      }}
      component="form"
      width="100%"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h5"
        color="primary"
        align="left"
        sx={{ fontWeight: 900, marginTop: "1.5rem" }}
      >
        Edit Book
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={editFormData.title}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />

      <TextField
        label="Author"
        name="author"
        value={editFormData.author}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />

      <TextField
        label="Genre"
        name="genre"
        value={editFormData.genre}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />

      <TextField
        label="ISBN"
        name="ISBN"
        value={editFormData.ISBN}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />
      {/* Other TextField components follow */}
      <Button type="submit" variant="contained" color="primary">
        SUBMIT
      </Button>
    </Box>
  );
};

export default EditBookForm;
