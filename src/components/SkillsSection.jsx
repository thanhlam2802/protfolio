import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

const SkillsSection = () => {
  const techRows = createInverseTriangleRows(technologies);
  const iconRefs = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const quoteRef = useRef(null);
  const iconsContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;

    const draggables = [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        end: "bottom top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      quoteRef.current,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" }
    )
      .fromTo(
        title,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        desc,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1"
      )
      .fromTo(
        iconsContainerRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      )
      .call(() => {
        const icons = iconRefs.current.filter(Boolean);

        gsap.set(icons, { autoAlpha: 0, y: 20 });

        icons.forEach((icon, i) => {
          gsap.to(icon, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: i * 0.15,
            onComplete: () => {
              gsap.to(icon, {
                y: "+=8",
                duration: 2 + Math.random(),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            },
          });

          const draggableInstance = Draggable.create(icon, {
            type: "x,y",
            edgeResistance: 0.65,
            inertia: true,
            onPress() {
              gsap.killTweensOf(this.target);
            },
            onDragEnd() {
              gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 2,
                ease: "power2.out",
                delay: 0.5,
              });
            },
          })[0];

          draggables.push(draggableInstance);
        });
      });

    return () => {
      const icons = iconRefs.current.filter(Boolean);

      gsap.to(icons.slice().reverse(), {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.in",
        stagger: 0.2,
      });

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      draggables.forEach((drag) => drag.kill());
      gsap.killTweensOf(icons);
    };
  }, []);

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <div className="text-center mb-16">
        <div
          ref={quoteRef}
          className="inline-block px-4 py-2 bg-[#1a1333] bg-opacity-70 rounded-full text-sm mb-6 opacity-0"
        >
          <span className="mr-2">✨</span>
          “Dev nhà quê” code chất như đất
        </div>

        <h2
          ref={titleRef}
          className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text text-4xl md:text-5xl  mb-4 opacity-0"
        >
          Công nghệ sử dụng
        </h2>
        <p ref={descRef} className="text-xl font-light italic opacity-0">
          Mình tin rằng công nghệ không phân biệt nơi bạn bắt đầu, mà quan trọng
          là bạn dám bắt đầu
        </p>
      </div>

      <div ref={iconsContainerRef} className="flex flex-col items-center gap-4">
        {techRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-6 justify-center">
            {row.map((tech, index) => {
              const absoluteIndex =
                techRows
                  .slice(0, rowIndex)
                  .reduce((acc, r) => acc + r.length, 0) + index;
              return (
                <div
                  key={index}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-grab"
                  ref={(el) => (iconRefs.current[absoluteIndex] = el)}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="max-w-full max-h-full object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

const createInverseTriangleRows = (items) => {
  const rows = [];
  let i = 0;
  let rowLength = 6;
  while (i < items.length && rowLength > 0) {
    rows.push(items.slice(i, i + rowLength));
    i += rowLength;
    rowLength--;
  }
  return rows;
};

const technologies = [
  { name: "HTML5", icon: "../icon/html.png" },
  { name: "CSS3", icon: "../icon/css.png" },
  { name: "JavaScript", icon: "../icon/js.png" },
  { name: "React", icon: "../icon/react.png" },
  { name: "GitHub", icon: "../icon/github-142-svgrepo-com.svg" },
  { name: "Vue", icon: "../icon/vue2.png" },
  { name: "Java", icon: "../icon/java.png" },
  { name: "SpringBoot", icon: "../icon/spring.png" },
  { name: "MongoDB", icon: "../icon/mongodb.png" },
  {
    name: "PostgreSQL",
    icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
  },
  { name: "Firebase", icon: "../icon/Firebase.png" },
  { name: "Docker", icon: "../icon/docker.webp" },
  { name: "Figma", icon: "../icon/Figma.png" },
  { name: "Redux", icon: "https://cdn.worldvectorlogo.com/logos/redux.svg" },
  { name: "Tailwind CSS", icon: "../icon/tailwind.png" },
  { name: "Go", icon: "https://cdn.worldvectorlogo.com/logos/go-8.svg" },
];

export default SkillsSection;
