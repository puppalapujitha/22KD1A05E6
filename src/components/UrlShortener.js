import React, { useState } from "react";
import "./UrlShortener.css";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attemptsLeft <= 0) return;

    if (!url.trim()) return;

    const shortUrl = `short.ly/${Math.random().toString(36).substring(2, 8)}`;
    setShortUrls([...shortUrls, { original: url, short: shortUrl }]);
    setUrl("");
    setAttemptsLeft(attemptsLeft - 1);
  };

  return (
    <div className="url-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={attemptsLeft <= 0}
        />
        <button type="submit" disabled={attemptsLeft <= 0}>
          Shorten
        </button>
      </form>
      <p className="attempts">Attempts left: {attemptsLeft}</p>

      <div className="results">
        {shortUrls.map((item, index) => (
          <div key={index} className="url-item">
            <p>
              <strong>Original:</strong> {item.original}
            </p>
            <p>
              <strong>Short:</strong> <a href="/">{item.short}</a>
            </p>
          </div>
        ))}
      </div>

      {attemptsLeft === 0 && (
        <p className="limit-msg">⚠️ You have reached the maximum of 5 attempts!</p>
      )}
    </div>
  );
}
