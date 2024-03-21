import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const BookList = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: "",
    image: "",
  });

  useEffect(() => {
    getBooks();
  }, []);

  const baseURL = "http://localhost:8000";
  const getBooks = async () => {
    try {
      const response = await axios.get(baseURL);
      console.log(response);
      setFormData(response.data.result.rows);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  const handleEdit = (book) => {
    navigate(`/edit/${book.id}`, { state: { formData: book } });
  };

  const handleDelete = async (rowToDelete) => {
    // Handle delete operation
    try {
      await axios.delete(`http://localhost:8000/books/${rowToDelete.id}`);
      const updatedData = formData.filter((row) => row.id !== rowToDelete.id);
      setFormData(updatedData);
      toastSuccessNotify("Succesfully deleted");
    } catch (err) {
      console.error("Error deleting book:", err);
      toastErrorNotify("Oops, Something went wrong!");
    }
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 40,
      maxWidth: 70,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) =>
        new Date(row.createdAt).toLocaleDateString("uk-UK"),
    },
    {
      field: "title",
      headerName: "Title",
      headerAlign: "center",
      align: "center",
      flex: 3,
      minWidth: 150,
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 2,
    },

    {
      field: "ISBN",
      headerName: "ISBN",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            sx={{ color: "yellow" }}
            onClick={() => handleEdit(row)}
          />

          <GridActionsCellItem
            icon={<DeleteForeverIcon />}
            label="Delete"
            sx={{ color: "red" }}
            onClick={() => handleDelete(row)}
          />
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        marginTop: "5rem",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Button
        type="submit"
        variant="contained"
        sx={{ display: "flex", alignItems: "flex-start" }}
        onClick={() => navigate("/new")}
      >
        ADD A NEW BOOK
      </Button>

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight
          rows={formData}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          sx={{
            boxShadow: 4,
          }}
        />
      </Box>
    </Box>
  );
};

export default BookList;
