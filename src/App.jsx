import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import NoteList from "./components/note/notes";
import NoteDetailsPage from "./components/note/noteDetails";
import NewNote from "./components/note/newNote";
import EditNote from "./components/note/editNote";
import React, { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div>
        <NavBar setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<NoteList searchQuery={searchQuery} />} />
          <Route
            path="/note/:id"
            element={<NoteDetailsPage searchQuery={searchQuery} />}
          />
          <Route path="/new-note/" element={<NewNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
