import React, { useEffect, useState } from "react";
import axios from "axios";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";

function App() {
  const [ideas, setIdeas] = useState([]);

  const API_URL = "http://localhost:5000/api/ideas"; // Backend URL

  // Fetch ideas from backend
  const fetchIdeas = async () => {
    try {
      const res = await axios.get(API_URL);
      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Add new idea
  const addIdea = async (idea) => {
    try {
      const res = await axios.post(API_URL, idea);
      setIdeas((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // Upvote an idea
  const upvoteIdea = async (id) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}/upvote`);
      setIdeas((prev) =>
        prev.map((idea) => (idea._id === id ? res.data : idea))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Add comment
  const addComment = async (id, text) => {
    try {
      const res = await axios.post(`${API_URL}/${id}/comment`, { text });
      setIdeas((prev) =>
        prev.map((idea) => (idea._id === id ? res.data : idea))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        💡 Micro-Forum
      </h1>
      <IdeaForm addIdea={addIdea} />
      <IdeaList ideas={ideas} onUpvote={upvoteIdea} addComment={addComment} />
    </div>
  );
}

export default App;
