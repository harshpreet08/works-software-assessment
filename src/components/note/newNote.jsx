import React, { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/notes";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTitle("");
        setContent("");
        // Navigate to the notes list page or any other desired destination after successful submission
        navigate("/");
      } else {
        console.error("Failed to create new note");
      }
    } catch (error) {
      console.error("Error creating new note:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
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
        New Note
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={10}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            required
            sx={{ fontFamily: "Helvetica, sans-serif", fontSize: "18px" }} // Adjust font size
          />
        </Box>
        <Box mt={4}>
          <TextField
            label="Content"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            multiline
            rows={6}
            required
            sx={{ fontFamily: "Helvetica, sans-serif", fontSize: "18px" }} // Adjust font size
          />
        </Box>
        <Box mt={4} sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontFamily: "Helvetica, sans-serif", fontSize: "18px" }} // Adjust font size
          >
            Create Note
          </Button>
        </Box>
      </form>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Success! Note Created."
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#38a13c",
          },
        }}
      />
    </Box>
  );
}

export default NewNote;
