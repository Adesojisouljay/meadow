import { Link } from "react-router-dom";
import React from "react";
import "./index.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="title">MEADOW</h1>
        <p className="subtitle">Raising Purposeful Leaders</p>
        <Link to="/register-invasion" className="btn">
            Register for Invasion 2025
        </Link>
      </header>

      {/* Vision, Mission, Motto */}
      <section className="info-section">
        <div className="card">
          <h2 className="card-title">Vision</h2>
          <p>
            To raise purposeful leaders who live fully for God, influence their
            generation, and transform society through faith and dedicated service.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">Mission</h2>
          <p>
            By teaching them how to have a personal relationship with God and
            hear from Him.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">Motto</h2>
          <p>Raising purposeful leaders</p>
        </div>
      </section>

      {/* About Invasion 2025 */}
      <section className="about">
        <h2 className="about-title">What is Invasion 2025?</h2>
        <p>
          Meadow began as a strictly online community, raising purposeful leaders
          and equipping young people through virtual gatherings and teachings.
        </p>
        <p>
          In time, God led us into physical gatherings. The first was held on
          Friday, 15th December 2023 at Ibadan, themed "Voice of the Spirit"—a
          meeting that stirred hunger for God and deepened our commitment to
          purposeful living.
        </p>
        <p>
          Now, we are stepping into our second physical gathering, themed Invasion
          2025, taking place in Sagamu on Saturday, September 27th, 2025.
        </p>
        <p>
          Invasion 2025 is more than a program, it is a divine movement to equip
          young people for purpose, ignite spiritual fire and raise leaders who
          will shine God’s light in every sphere of life.
        </p>
        <p>
          Through worship, drama, talk sessions, and the ministry of seasoned
          gospel ministers, it will be a life-changing encounter.
        </p>
        {/* <button className="btn">Be part of this movement – Register Today</button> */}
        <Link to="/register-invasion" className="btn">
            Be part of this movement – Register Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Meadow Ministry. All rights reserved.
      </footer>
    </div>
  );
}
