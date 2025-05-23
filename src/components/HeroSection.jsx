import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlipWords from "./FlipWords";
import TechIcons from "./TechIcons";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const fullstack = leftRef.current.querySelector(".animate-fullstack");
    const heading = leftRef.current.querySelector(".animate-heading");
    const paragraph = leftRef.current.querySelector(".animate-paragraph");
    const button = leftRef.current.querySelector(".animate-button");

    // Set trạng thái ban đầu cho từng phần tử con
    gsap.set([fullstack, heading, paragraph, button], { autoAlpha: 0 });
    gsap.set(fullstack, { x: -50 });
    gsap.set(heading, { y: -50 });
    gsap.set(paragraph, { x: 50 });
    gsap.set(button, { scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 80%",
        end: "bottom 50%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(fullstack, { duration: 2, autoAlpha: 1, x: 0, ease: "power2.out" })
      .to(
        heading,
        { duration: 2, autoAlpha: 1, y: 0, ease: "power2.out" },
        "<0.2"
      )
      .to(
        paragraph,
        { duration: 2, autoAlpha: 1, x: 0, ease: "power2.out" },
        "<0.2"
      )
      .to(
        button,
        { duration: 2, autoAlpha: 1, scale: 1, ease: "power2.out" },
        "<0.2"
      );

    const rightAnim = gsap.fromTo(
      rightRef.current,
      { autoAlpha: 0, y: 50 },
      {
        duration: 1,
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      tl.scrollTrigger.kill();
      rightAnim.scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen py-16 md:py-24 flex flex-col md:grid grid-cols-1 md:grid-cols-12 items-center gap-8"
    >
      {/* Cột trái - căn giữa trên mobile */}
      <div
        ref={leftRef}
        className="md:col-span-6 flex flex-col items-center justify-center text-center md:items-start md:text-left"
      >
        <div className="animate-fullstack inline-block px-4 py-2 bg-[#1a1333] bg-opacity-70 rounded-full text-sm mb-6">
          <span className="mr-2">✨</span>
          Fullstack Developer Portfolio
        </div>
        <h1 className="animate-heading text-5xl md:text-6xl mb-6 flex flex-wrap justify-center md:justify-start gap-2">
          Mang đến
          <FlipWords />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Dự án
          </span>
          Tốt nhất
        </h1>

        <p className="animate-paragraph text-lg text-gray-300 mb-8 max-w-lg">
          Xin chào , mình tên “ Dev nhà quê “ một người học lập trình. Mình yêu
          Việc biến ý tưởng thành sản phẩm, và luôn tin rằng chỉ cần chịu học,
          quê hay phố không quan trọng .
        </p>
        <button className="animate-button px-8 py-3 bg-gradient-to-r from-purple-700 to-indigo-900 rounded-md hover:from-purple-600 hover:to-indigo-800 transition">
          Tìm hiểu thêm!
        </button>
      </div>

      {/* Cột phải - icon công nghệ */}
      <div ref={rightRef} className="md:col-span-6 relative opacity-0">
        <TechIcons />
      </div>
    </section>
  );
};

export default HeroSection;
