import React from "react";
import Markdown from "react-markdown";
const ClaudeRecipe: React.FC<any> = (props) => {
  return (
    <section className="suggested-recipe-container">
      <h2>Chef HF suggests</h2>
      <Markdown>{props.recipe}</Markdown>
    </section>
  );
};

export default ClaudeRecipe;
