import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);

const typingTexts = [
  "Mình là Võ lê Thanh Lâm",
  "Mình là lập trình viên Full Stack",
  "Là một người đam mê công nghệ",
];

const StyledWrapper = styled.div`
  button {
    --color: #0077ff;
    font-family: inherit;
    display: inline-block;
    width: 6em;
    height: 2.6em;
    line-height: 2.5em;
    overflow: hidden;
    cursor: pointer;

    font-size: 17px;
    z-index: 1;
    color: var(--color);
    border: 2px solid var(--color);
    border-radius: 6px;
    position: relative;
    background-color: transparent;
    transition: color 0.3s;
  }

  button::before {
    position: absolute;
    content: "";
    background: var(--color);
    width: 150px;
    height: 200px;
    z-index: -1;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: 0.3s all;
  }

  button:hover {
    color: white;
  }

  button:hover::before {
    top: -30px;
    left: -30px;
  }
`;

const About = () => {
  const lightRef = useRef(null);
  const avatarRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const text1Ref = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const avatar = avatarRef.current;
    const light = lightRef.current;
    const handleMouseEnter = () => {
      gsap.set(light, { x: "-150%", opacity: 0 });
      gsap.to(light, {
        x: "150%",
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(light, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    };
    avatar.addEventListener("mouseenter", handleMouseEnter);
    return () => avatar.removeEventListener("mouseenter", handleMouseEnter);
  }, []);

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    let timeout;
    if (!isDeleting && charIndex <= currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, 75);
    } else if (charIndex === currentText.length + 1) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (charIndex === -1) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % typingTexts.length);
      setCharIndex(0);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(introRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
      gsap.from(text1Ref.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
      gsap.from(textRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(buttonsRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-8 md:px-0 sm:px-6 items-center overflow-hidden"
    >
      <h1
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text mb-8 sm:mb-10 md:mb-12 text-center"
      >
        Giới thiệu về tôi
      </h1>

      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-12 gap-8  sm:gap-10">
        {/* Chữ căn lề trái */}
        <div className="col-span-12 sm:col-span-6 text-left flex flex-col justify-center">
          <p
            ref={introRef}
            className="text-xl sm:text-2xl md-text-3xl text-white mb-1 sm:mb-4"
          >
            Chào bạn!
          </p>

          <h2
            ref={text1Ref}
            className="text-xl sm:text-2xl md:text-3xl  text-white mb-1 sm:mb-4 whitespace-pre"
          >
            {displayedText}
            <span className="inline-block w-1 h-6 sm:h-8 bg-white animate-blink ml-1 align-bottom"></span>
          </h2>

          <p
            ref={textRef}
            className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed"
          >
            Là một lập trình viên đam mê công nghệ Web. Mình hiện là sinh viên
            năm 2 tại FPT Polytechnic, yêu thích xây dựng những sản phẩm có giao
            diện đẹp mắt và trải nghiệm mượt mà.
          </p>

          <div ref={buttonsRef} className="flex flex-row gap-1 mt-2 w-full">
            <StyledWrapper className="flex-1">
              <button className="w-full">Tải CV</button>
            </StyledWrapper>
            <StyledWrapper className="flex-1">
              <button className="w-full">Liên Hệ</button>
            </StyledWrapper>
          </div>
        </div>

        {/* Avatar căn lề phải */}
        <div className="col-span-12 sm:col-span-6 flex justify-center sm:justify-end items-center px-4 sm:px-0">
          <div
            ref={imageRef}
            className="relative w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl border border-white/10 group mx-auto"
          >
            <img
              ref={avatarRef}
              src="/icon/IMG_2714.jpg"
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
            <div
              ref={lightRef}
              className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-12 pointer-events-none opacity-0 filter blur-sm"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% {opacity: 1;}
          50% {opacity: 0;}
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
