import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Snackbar } from "@mui/material";

function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const API_URL = "http://localhost:3000/notes";

  useEffect(() => {
    fetch(API_URL + `/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [id]);

  useEffect(() => {
    if (!showSuccess) return;
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [showSuccess, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Failed to update note:", response.status);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          paddingX: { xs: 0, md: "20px" },
          paddingY: "20px",
          fontFamily: "Helvetica, sans-serif",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", fontSize: "45px" }}
        >
          Edit Note
        </Typography>
        <Box mt={10}>
          <TextField
            label="Title"
            name="title"
            required
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ width: "100%", fontSize: "18px" }}
          />
        </Box>
        <Box mt={4}>
          <TextField
            label="Content"
            name="content"
            multiline
            rows={8}
            required
            fullWidth
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            sx={{ width: "100%", fontSize: "18px" }}
          />
        </Box>

        <Box mt={4} sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Note
          </Button>
        </Box>
        <Snackbar
          open={showSuccess}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="Success! Note Updated."
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#182633",
            },
          }}
        />
      </Box>
    </>
  );
}

export default EditNote;
