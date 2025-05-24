import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Portfolio cá nhân",
    description:
      "Trang portfolio cá nhân sử dụng React, Tailwind CSS và GSAP để tạo hiệu ứng mượt mà.",
    image: "../icon/duan1.png",
    link: "https://yourportfolio.com",
    tech: ["React", "Tailwind CSS", "GSAP"],
  },
  {
    title: "Trang chia sẻ và cung cấp hình ảnh",
    description:
      "Nền tảng cho phép người dùng đăng tải, tìm kiếm và tải xuống hình ảnh chất lượng cao.",
    image: "../icon/duan2.png",
    link: "https://yourtodoapp.com",
    tech: ["Vue", "Spring boot", "SQL", "JWT", "Cloudinary", "Tailwind CSS"],
  },
  {
    title: "Trang bán hàng mini",
    description: "Website bán hàng đơn giản với giao diện thân thiện.",
    image: "../icon/duan3.png",
    link: "https://yourshop.com",
    tech: ["JavaScript", "HTML", "CSS"],
  },
];

const ProjectsSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: -50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      cardsRef.current.forEach((cardEl) => {
        const img = cardEl.querySelector("img");
        const title = cardEl.querySelector("h3");
        const desc = cardEl.querySelector("p");
        const techs = cardEl.querySelectorAll(".tech-tag");
        const link = cardEl.querySelector("a");

        gsap.set([cardEl, img, title, desc, ...techs, link], {
          autoAlpha: 0,
          y: 30,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardEl,
            start: "top 90%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        });

        tl.to(cardEl, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }).to(
          [img, title, desc, ...techs, link],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.15,
          },
          "-=0.4"
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="grid grid-cols-12 gap-4 ">
      <div className="col-span-12 text-center">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl  bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text mb-1 sm:mb-2 md:mb-4"
        >
          Dự án nổi bật
        </h2>
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md-text-3xl text-gray-300 italic"
        >
          Một số sản phẩm mình đã thực hiện hoặc đang phát triển
        </p>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="m-4 sm:m-2 md:m-0 col-span-12 md:col-span-6 lg:col-span-4 bg-white bg-opacity-5 p-4 rounded-2xl shadow-md backdrop-blur-sm hover:scale-[1.02] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <h3 className="text-lg mb-2">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="tech-tag px-2 py-1 bg-purple-900 bg-opacity-30 rounded-full text-xs text-purple-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-purple-400 hover:underline"
            >
              🔗 Xem chi tiết
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;
