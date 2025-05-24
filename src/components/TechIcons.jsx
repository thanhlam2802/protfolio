import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const iconsData = [
  { src: "../icon/react.png", alt: "React" },
  { src: "../icon/js.png", alt: "JavaScript" },
  { src: "../icon/figma.png", alt: "Figma" },
  { src: "../icon/mongodb.png", alt: "MongoDB" },
  { src: "./icon/github-142-svgrepo-com.svg", alt: "GitHub" },
  { src: "../icon/Firebase.png", alt: "Firebase" },
];

const getPositions = (radius) => {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (360 / 6) * i;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
    };
  });
};

const TechIcons = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // sm breakpoint
  const [posIndexes, setPosIndexes] = useState([0, 1, 2, 3, 4, 5]);
  const iconRefs = useRef([]);

  const radius = isMobile ? 120 : 192; // px: ~7.5rem on mobile, 12rem on desktop
  const positions = getPositions(radius);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animations = [];

    posIndexes.forEach((posIndex, iconIndex) => {
      const nextPos = positions[(posIndex + 1) % positions.length];

      const anim = gsap.to(iconRefs.current[iconIndex], {
        x: nextPos.x,
        y: nextPos.y,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          setPosIndexes((prev) => {
            const newPos = [...prev];
            newPos[iconIndex] = (newPos[iconIndex] + 1) % positions.length;
            return newPos;
          });
        },
      });

      animations.push(anim);
    });

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [posIndexes, positions]);

  return (
    <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
      {/* Vòng tròn nền */}
      <div className="absolute inset-0 rounded-full border border-purple-500 opacity-20"></div>
      <div className="absolute inset-5 rounded-full border border-blue-500 opacity-20 hidden sm:block"></div>
      <div className="absolute inset-10 rounded-full border border-indigo-500 opacity-20 hidden sm:block"></div>

      {/* Các icon */}
      {iconsData.map((icon, index) => (
        <div
          key={index}
          ref={(el) => (iconRefs.current[index] = el)}
          className={`absolute ${
            isMobile ? "w-12 h-12" : "w-16 h-16"
          } bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-2 flex items-center justify-center`}
          style={{
            top: "50%",
            left: "50%",
            marginTop: isMobile ? "-1.5rem" : "-2rem",
            marginLeft: isMobile ? "-1.5rem" : "-2rem",
            x: positions[posIndexes[index]].x,
            y: positions[posIndexes[index]].y,
          }}
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default TechIcons;
