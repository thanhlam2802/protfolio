import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const words = ["trải nghiệm", "giải pháp", "giá trị", "cảm nhận"];

export default function FlipWordsGSAP() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        duration: 0.5,
        autoAlpha: 0,
        y: -20,
        ease: "power1.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);

          gsap.fromTo(
            wordRef.current,
            { autoAlpha: 0, y: 20 },
            { duration: 0.5, autoAlpha: 1, y: 0, ease: "power1.out" }
          );
        },
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={wordRef}
      className="inline-block text-indigo-400 "
      style={{
        minWidth: "200px",
        display: "inline-block",
        textAlign: "flex",
      }}
    >
      {words[index]}
    </span>
  );
}
