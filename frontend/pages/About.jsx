import React from "react";

function About() {
  return (
    <div class="about-container">
      <div class="about-card">
        <div class="about-content">
          <h1 class="about-title">Welcome, fellow travellers!</h1>
          <p class="about-description">
            This app is designed to unite travel enthusiasts by allowing you to
            share your travel experiences from the countries you’ve visited. By
            contributing your insights, recommendations, tips, and warnings, you
            help others who are planning their own adventures. Once you log in
            with your personal credentials, you'll be presented with a list of
            European countries. You can filter posts based on your country of
            interest. Below the filtering options, you'll find a button to add
            and share your own experiences. All posts are public and can be
            viewed by everyone, and you have the ability to edit or delete your
            published content. For a more personalized touch, click the Profile
            button in the top left corner. This will take you to a world map
            where you can track and showcase the countries you’ve visited.
            Others can see your travel history, giving you a chance to brag
            about your adventures while sharing your experiences with the
            community.
            <div>
              <a href="mailto:velodario@outlook.com" class="about-link">
                Contact me
              </a>{" "}
              if you have any questions or just want to connect!
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
