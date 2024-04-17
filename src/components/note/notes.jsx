import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function NoteList({ searchQuery }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (noteId, event) => {
    event.preventDefault();
    navigate(`/edit-note/${noteId}`);
  };

  const handleDelete = async (noteId, event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== noteId));
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const filteredNotes = searchQuery
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: { xs: 600, md: 800, lg: 1000 },
            width: "100%",
            margin: "0 auto",
            paddingX: { xs: 0, md: "20px" },
            paddingY: "20px",
            fontFamily: "Helvetica, sans-serif",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              marginTop: "10px",
              textAlign: "center",
              fontSize: "45px",
              marginBottom: "40px",
            }}
          >
            NOTES
          </Typography>

          <Grid container spacing={2}>
            {filteredNotes.map((note) => (
              <Grid key={note._id} item xs={12} sm={6} md={4}>
                <Link
                  to={`/note/${note._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      marginBottom: "20px",
                      boxShadow: 3,
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardContent sx={{ height: 160 }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        noWrap
                        sx={{ textAlign: "center" }}
                        gutterBottom
                        marginBottom="2rem"
                      >
                        {note.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        noWrap
                        sx={{ textAlign: "center" }}
                      >
                        {note.content}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "8px",
                        marginRight: "8px",
                      }}
                    >
                      <Button
                        onClick={(event) => handleEdit(note._id, event)}
                        color="primary"
                        startIcon={<EditIcon />}
                        sx={{
                          mr: 1,
                          "&:hover": { backgroundColor: "transparent" },
                        }} // Override button styles
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={(event) => handleDelete(note._id, event)}
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
            <Button
              component={Link}
              to="/new-note"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: "50px",
                padding: "15px 30px",
                fontWeight: "bold",
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "#1976D2",
                },
              }}
            >
              Add Note
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default NoteList;
