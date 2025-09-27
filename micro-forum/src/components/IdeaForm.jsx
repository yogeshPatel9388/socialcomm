import React, { useState } from "react";

function IdeaForm({ addIdea }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!title || !description) return; // Validation
    addIdea({ title, description, upvotes: 0, comments: [] }); // Send idea to parent
    setTitle("");
    setDescription(""); // Clear form
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Idea Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Describe your idea..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>
        Post Idea
      </button>
    </form>
  );
}

export default IdeaForm;

