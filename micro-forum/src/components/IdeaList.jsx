import React from "react";
import IdeaCard from "./IdeaCard";

function IdeaList({ ideas, onUpvote, addComment }) {
  const sortedIdeas = [...ideas].sort((a, b) => b.upvotes - a.upvotes);
  const maxComments = ideas.length
    ? Math.max(...ideas.map((idea) => idea.comments.length))
    : 0;

  return (
    <div>
      {sortedIdeas.map((idea) => (
        <IdeaCard
          key={idea._id}
          idea={idea}
          onUpvote={onUpvote}
          addComment={addComment}
          maxComments={maxComments}
        />
      ))}
    </div>
  );
}

export default IdeaList;
