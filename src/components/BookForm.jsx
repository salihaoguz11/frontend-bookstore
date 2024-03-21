import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { Box, Button, TextField, Typography } from "@mui/material";

const BookForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000", formData);
      console.log(response.data);
      toastSuccessNotify("Succesfully Added");
      navigate("/");
    } catch (err) {
      console.error("Error creating books:", err);
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
        align="left"
        sx={{ fontWeight: 900, marginTop: "1.5rem" }}
      >
        ADD A BOOK
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />

      <TextField
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />

      <TextField
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />

      <TextField
        label="ISBN"
        name="ISBN"
        value={formData.ISBN}
        onChange={handleChange}
        type="text"
        variant="outlined"
        sx={{ width: "30%" }}
      />
      <Button type="submit" variant="contained">
        ADD A NEW BOOK
      </Button>
    </Box>
  );
};

export default BookForm;
