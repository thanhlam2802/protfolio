// WavyText.jsx
import React from "react";
import "./App.css";

function WavyText({ text }) {
  return (
    <p className="intro">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}

export default WavyText;
