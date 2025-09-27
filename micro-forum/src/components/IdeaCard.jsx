import React, { useState } from "react";

function IdeaCard({ idea, onUpvote, addComment, maxComments }) {
  const [commentText, setCommentText] = useState("");
  const isMostDiscussed =
    idea.comments.length === maxComments && maxComments > 0;

  const handleComment = () => {
    if (!commentText) return;
    addComment(idea._id, commentText);
    setCommentText("");
  };

  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-md mb-4 border-l-4 ${
        isMostDiscussed ? "border-yellow-400" : "border-transparent"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{idea.title}</h3>
        {isMostDiscussed && (
          <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-sm font-bold">
            Most Discussed
          </span>
        )}
      </div>
      <p className="text-gray-700 mb-3">{idea.description}</p>
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-500">
          💬 {idea.comments.length} comments
        </span>
        <button
          onClick={() => onUpvote(idea._id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          ⬆ Upvote {idea.upvotes}
        </button>
      </div>

      {/* Comments */}
      <div className="mb-3">
        {idea.comments.map((c, index) => (
          <div key={index} className="text-gray-600 text-sm mb-1">
            - {c.text}
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-l px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleComment}
          className="bg-blue-600 text-white px-4 py-1 rounded-r hover:bg-blue-700 transition"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default IdeaCard;

