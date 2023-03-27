import React from "react";

export default function Social() {
  return (
    <div className="home_social">
      <a
        href="https://www.instagram.com/niltonsf_"
        className="home_social-icon"
        target={"_blank"}
        rel="noreferrer"
      >
        <i className="uil uil-instagram"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/nilton-ant%C3%B4nio-schumacher-filho-0ab77b183/"
        className="home_social-icon"
        target={"_blank"}
        rel="noreferrer"
      >
        <i className="uil uil-linkedin"></i>
      </a>

      <a
        href="https://www.github.com/Niltonsf"
        className="home_social-icon"
        target={"_blank"}
        rel="noreferrer"
      >
        <i className="uil uil-github-alt"></i>
      </a>
    </div>
  );
}
