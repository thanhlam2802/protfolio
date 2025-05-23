import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import styled from "styled-components";
import ContactSection from "./components/ContactSection";
const StyledWrapper = styled.div`
  position: fixed;
  bottom: 10%;
  right: 5%;
  z-index: 1000;

  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
  }

  .svgIcon {
    width: 12px;
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    width: 140px;
    border-radius: 50px;
    background-color: rgb(181, 160, 255);
    transition-duration: 0.3s;
    align-items: center;
  }

  .button:hover .svgIcon {
    transition-duration: 0.3s;
    transform: translateY(-200%);
  }

  .button::before {
    position: absolute;
    bottom: -20px;
    content: "Back to Top";
    color: white;
    font-size: 0px;
    transition: font-size 0.3s ease, opacity 0.3s ease, bottom 0.3s ease;
    opacity: 0;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
  }
`;

export function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#050314] text-white overflow-x-hidden relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, #5B21B6, #1E40AF, #000000)",
          opacity: 0.8,
        }}
      ></div>

      <div className="relative z-10">
        <Navbar />

        <main className="grid grid-cols-12 gap-4  max-w-screen-xl mx-auto">
          <div className="col-span-12">
            <HeroSection />
          </div>
          <div className="col-span-12">
            <AboutSection />
          </div>
          <div className="col-span-12">
            <SkillsSection />
          </div>
          <div className="col-span-12">
            <ProjectsSection />
          </div>
          <div className="col-span-12">
            <ContactSection />
          </div>
        </main>

        {showButton && (
          <StyledWrapper>
            <button className="button" onClick={scrollToTop}>
              <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
            </button>
          </StyledWrapper>
        )}
      </div>
    </div>
  );
}

export default App;
