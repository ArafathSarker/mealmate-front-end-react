import React from "react";
import "../style/About.css"; 

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">About Meal Mate</h2>
        <p className="about-text">
          <strong>Meal Mate</strong> is your personal assistant for tracking and managing your meals.
          Whether you're planning your next dish or trying to stay within a budget,
          Meal Mate helps you calculate the cost of the meals you've consumed with ease.
        </p>
        <p className="about-text">
          We believe that knowing what you eat and how much it costs shouldn't be complicated.
          Our goal is to make meal tracking simple, fast, and stress-free — so you can focus more
          on enjoying your food and less on crunching numbers.
        </p>
        <p className="about-text">
          Built with care for food lovers, home cooks, students, and anyone who wants to take
          control of their meals.
        </p>
      </div>
    </section>
  );
};

export default About;
