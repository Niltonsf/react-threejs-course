import React from "react";
import QualificationData from "../../components/QualificationData";
import "./index.css";

export default function Qualification() {
  return (
    <section className="qualification section" id="qualification">
      <h2 className="section__title">Qualifications</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification_container container">
        <div className="qualification_tabs">
          <div className="qualification_button qualification_active button--flex">
            <i className="uil uil-graduation-cap qualification_icon"></i>{" "}
            Education
          </div>

          <div className="qualification_button button--flex">
            <i className="uil uil-briefcase-alt qualification_icon"></i>{" "}
            Experience
          </div>
        </div>

        <div className="qualification_sections">
          <div className="qualification_content qualification_content-active">
            <QualificationData
              left={true}
              title={"Midlevel React Native Developer"}
              location={"Curitiba/Brazil as 100% remote"}
              company={"Univision"}
              companyWebsite={"https://univision.net.br/"}
              state={"Employee"}
              calendar={"dezember 2022 - Present"}
            />

            <QualificationData
              title={"Junior Full Stack Developer"}
              location={"London/England as 100% remote"}
              company={"Crowdform"}
              companyWebsite={"https://crowdform.studio/"}
              state={"Freelancer"}
              calendar={"october 2021 - dezember 2022"}
            />

            <QualificationData
              left={true}
              title={"Computer Engineer Internship"}
              location={"Curitiba/Brazil as 50% remote and 50% physical"}
              company={"Alta Rail Technology"}
              companyWebsite={"https://alta-rt.com/pt-br/"}
              state={"Employee"}
              calendar={"april 2021 - october 2021"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
