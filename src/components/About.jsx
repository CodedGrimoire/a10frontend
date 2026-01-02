import React from "react";
import "./main.css";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";

const infoBlocks = [
  {
    title: "Explore & Discover",
    copy:
      "Browse a growing library of genres — from timeless classics to modern mysteries and everything in between.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    title: "Share Your Favorites",
    copy:
      "Registered users can add their own books, write summaries, and recommend hidden gems to fellow readers.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
  },
  {
    title: "Connect & Grow",
    copy:
      "Engage with a passionate community of readers — rate, review, and discuss your favorite titles.",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
  },
];

const About = () => {
  return (
    <div className="about-shell surface">
      <SectionHeader
        title="About The Book Haven"
        description="Your digital sanctuary for stories, knowledge, and imagination. We connect readers and collectors through an elegant, user-friendly library."
      />

      <div className="about-grid">
        {infoBlocks.map((block) => (
          <Card key={block.title} className="about-card">
            <div className="about-image">
              <img src={block.image} alt={block.title} loading="lazy" />
            </div>
            <div className="about-card-body">
              <h3>{block.title}</h3>
              <p>{block.copy}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
