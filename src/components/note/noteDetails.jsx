import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
} from "@mui/material";

function NoteDetailsPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNote(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching note details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Note Details
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper
            elevation={0}
            style={{ padding: 20, backgroundColor: "#f5f5f5" }}
          >
            {" "}
            <Typography variant="h5" gutterBottom>
              {note.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {note.content}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default NoteDetailsPage;
