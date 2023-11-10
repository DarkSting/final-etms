import React, { useState, useEffect } from "react";
import axios from "../../middleware/axios";
import OrganizersNavigationBar from "../../components/OrganizersNavigationBar";
import Footer from "../../components/Footer";
import "./OrganizersCounterStrikeNews.css";

const OrganizersCounterStrikeNews = () => {
  // State to hold fetched news data
  const [news, setNews] = useState([]);

  // Fetch news data when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch news data from the server using axios
        const response = await axios.get("/api/news/counter-strike");
        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="counter-strike-news-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <div className="counter-strike-news-container">
        {/* Heading */}
        <h2 className="counter-strike-news-heading">Counter-Strike News</h2>
        {/* List of news articles */}
        <ul className="counter-strike-news-list">
          {news.map((item, index) => (
            <li className="counter-strike-news-item" key={index}>
              {/* Link to the full news article */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="counter-strike-news-title"
              >
                {item.title}
              </a>
              {/* News description */}
              <p className="counter-strike-news-description">
                {item.description}
              </p>
              {/* News publication time */}
              <p className="counter-strike-news-time">
                {new Date(item.time).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default OrganizersCounterStrikeNews;
