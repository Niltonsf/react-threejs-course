import React from "react";

export default function BackendSkills() {
  return (
    <div className="skills_content">
      <h3 className="skills_title">Backend Developer</h3>

      <div className="skills_box">
        <div className="skills_group">
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">NodeJS</h3>
              <span className="skills_level">Advanced</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">Firebase</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">SQL</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>
        </div>

        <div className="skills_group">
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">Python</h3>
              <span className="skills_level">Basic</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">NestJS</h3>
              <span className="skills_level">Advanced</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">NoSQL</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}