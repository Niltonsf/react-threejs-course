import React from "react";
import "./index.css";
import Info from "../../components/Info";

export default function About() {
  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My introduction</span>

      <div className="about_container container grid">
        <img src={""} alt="" className="about_img"></img>

        <div className="about_data">
          <Info />

          <p className="about_description">
            Developing and colaborating on a wide variety of projects for
            companies. I have experience working with software-related projects
            across several lines of business such as healthcare, entertainment,
            IoT, ground transportation, and education. Always focusing on clean,
            professional, responsive applications.
          </p>
        </div>
      </div>
    </section>
  );
}
