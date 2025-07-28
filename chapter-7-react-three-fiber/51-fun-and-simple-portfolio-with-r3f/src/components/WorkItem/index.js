import React from "react";

export default function WorkItem({ item }) {
  return (
    <div className="work_card" key={item.id}>
      <img src={item.image} alt="" className="work_img" />
      <h3 className="work_title">{item.title}</h3>
      <span className="work_subtitle">{item.description}</span>
      <span className="work_difficulty">
        <br></br>
        Difficulty: {item.difficulty}
      </span>
      <a
        href={item.projectLink}
        className="work_button"
        target="_blank"
        rel="noreferrer"
      >
        Learn more <i className="bx bx-right-arrow-alt work_button-icon"></i>
      </a>
    </div>
  );
}
