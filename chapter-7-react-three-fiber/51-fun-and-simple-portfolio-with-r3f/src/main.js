import React from "react";
import About from "./pages/About";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Qualification from "./pages/Qualification";
import Footer from "./pages/Footer";
import Projects from "./pages/Projects";
import ScrollUp from "./pages/ScrollUp";

export default function MainWebpage() {
  return (
    <div>
      <Header />

      <div className="main">
        <Home />
        <About />
        <Skills />
        <Qualification />
        <Projects />
        <Footer />
      </div>

      <ScrollUp />
    </div>
  );
}
