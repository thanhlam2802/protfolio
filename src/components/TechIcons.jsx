import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const iconsData = [
  { src: "../icon/react.png", alt: "React", size: "md" },
  { src: "../icon/js.png", alt: "JavaScript", size: "md" },
  { src: "../icon/figma.png", alt: "figma", size: "md" },
  { src: "../icon/mongodb.png", alt: "MongoDB", size: "md" },
  { src: "./icon/github-142-svgrepo-com.svg", alt: "GitHub", size: "md" },
  { src: "../icon/Firebase.png", alt: "Firebase", size: "md" },
];

const radius = 12 * 16; // 12rem * 16px

const positions = Array.from({ length: 6 }, (_, i) => {
  const angle = (360 / 6) * i;
  const rad = (angle * Math.PI) / 180;
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad),
  };
});

const TechIcons = () => {
  // Lưu vị trí hiện tại của từng icon (index trong mảng positions)
  const [posIndexes, setPosIndexes] = useState([0, 1, 2, 3, 4, 5]);

  const iconRefs = useRef([]);

  useEffect(() => {
    const animations = [];

    posIndexes.forEach((posIndex, iconIndex) => {
      // Vị trí hiện tại và vị trí kế tiếp trên vòng tròn
      const currentPos = positions[posIndex];
      const nextPos = positions[(posIndex + 1) % positions.length];

      // Animate icon từ vị trí hiện tại sang vị trí kế tiếp
      const anim = gsap.to(iconRefs.current[iconIndex], {
        x: nextPos.x,
        y: nextPos.y,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          // Cập nhật lại vị trí mới trong state
          setPosIndexes((prev) => {
            const newPos = [...prev];
            newPos[iconIndex] = (newPos[iconIndex] + 1) % positions.length;
            return newPos;
          });
        },
      });

      animations.push(anim);
    });

    // Cleanup khi component unmount hoặc state thay đổi
    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [posIndexes]);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Vòng tròn nền */}
      <div className="absolute inset-0 rounded-full border border-purple-500 opacity-20"></div>
      <div className="absolute inset-5 rounded-full border border-blue-500 opacity-20"></div>
      <div className="absolute inset-10 rounded-full border border-indigo-500 opacity-20"></div>

      {/* Các icon */}
      {iconsData.map((icon, index) => (
        <div
          key={index}
          ref={(el) => (iconRefs.current[index] = el)}
          className={`absolute ${
            icon.size === "md" ? "w-16 h-16" : "w-12 h-12"
          } bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-2 flex items-center justify-center`}
          style={{
            top: "50%",
            left: "50%",
            marginTop: "-2rem",
            marginLeft: "-2rem",
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
