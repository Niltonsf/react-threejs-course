import React from "react";
import "./index.css";
import Social from "../../components/Social";
import Data from "../../components/Data";
import ScrollDown from "../../components/ScrollDown";

export default function Home() {
  const test = React.useRef();

  return (
    <section ref={test} className="home section" id="home">
      <div className="home_container container grid">
        <div className="home_content grid">
          <Social />
          <div className="home_img"></div>
          <Data />
        </div>

        <ScrollDown />
      </div>
    </section>
  );
}
