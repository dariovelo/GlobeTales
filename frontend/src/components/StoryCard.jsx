import React from "react";
import { connect } from "react-redux";

function StoryCard({ title, author, content }) {
  return (
    <article class="story-article" lang="en">
      <h1 class="story-title">{title}</h1>
      <h2 class="story-author">by {author}</h2>
      <section class="story-context" aria-label="Context">
        <p>{content}</p>
      </section>
    </article>
  );
}

export default StoryCard;
