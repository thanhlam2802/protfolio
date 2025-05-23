import React, { useEffect, useState } from "react";
import { InstagramIcon, FacebookIcon, InfoIcon } from "lucide-react";

const sections = ["home", "about", "skills", "projects", "contact"];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-2 px-6 md:px-10 bg-[#1e40af]/30 backdrop-blur-md">
      <div className="container mx-auto grid grid-cols-12 items-center">
        <div className="col-span-12 md:col-span-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3">
              <img
                src="../icon/logo.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-full border-2 border-white"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Dev_Nha_Que
            </h1>
          </div>

          {/* Nút menu cho mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu chính (ẩn trên mobile) */}
        <div className="hidden md:flex col-span-4 items-center justify-center space-x-2 px-4 py-1 bg-gradient-to-r from-[#1a1c2e]/25 to-[#1a1c2e]/25 rounded-full border border-[#3f4b6b] shadow-inner backdrop-blur-md relative">
          <NavLink
            href="#home"
            icon="/icon/icons8-home-48.png"
            isActive={activeSection === "home"}
            onClick={() => handleClick("home")}
          />
          <NavLink
            href="#about"
            text="Giới thiệu"
            isActive={activeSection === "about"}
            onClick={() => handleClick("about")}
          />
          <NavLink
            href="#skills"
            text="Kỹ năng"
            isActive={activeSection === "skills"}
            onClick={() => handleClick("skills")}
          />
          <NavLink
            href="#projects"
            text="Dự án"
            isActive={activeSection === "projects"}
            onClick={() => handleClick("projects")}
          />
          <NavLink
            href="#contact"
            text="Liên hệ"
            isActive={activeSection === "contact"}
            onClick={() => handleClick("contact")}
          />
        </div>

        {/* Menu mobile (xuất hiện khi mở) */}
        {isMobileMenuOpen && (
          <div className="md:hidden col-span-12 bg-[#1e40af]/80 backdrop-blur-md rounded-b-lg border border-[#3f4b6b] mt-2 py-4 px-6 space-y-3">
            {sections.concat("contact").map((section) => (
              <NavLink
                key={section}
                href={`#${section}`}
                text={
                  section === "home"
                    ? "Trang chủ"
                    : section.charAt(0).toUpperCase() + section.slice(1)
                }
                isActive={activeSection === section}
                onClick={() => {
                  handleClick(section);
                  setIsMobileMenuOpen(false);
                }}
              />
            ))}
          </div>
        )}

        {/* Các icon mạng xã hội */}
        <div className="hidden md:flex col-span-12 md:col-span-4 justify-end items-center space-x-4 mt-2 md:mt-0">
          <a
            href="https://www.instagram.com/dev.nha_que/"
            className="text-white hover:text-purple-300 transition"
          >
            <InstagramIcon size={20} />
          </a>
          <a
            href="https://www.facebook.com/vo.lam.796513"
            className="text-white hover:text-purple-300 transition"
          >
            <FacebookIcon size={20} />
          </a>
          <a
            href="#"
            className="text-white hover:text-purple-300 transition bg-white bg-opacity-20 rounded-full p-2"
          >
            <InfoIcon size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, text, icon, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center justify-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
        isActive
          ? "text-purple-400 underline underline-offset-4 decoration-2"
          : "text-white hover:bg-white/10"
      }`}
    >
      {icon ? (
        typeof icon === "string" ? (
          <img
            src={icon}
            alt="icon"
            className={`w-5 h-5 ${
              isActive
                ? "filter invert sepia hue-rotate-[260deg] saturate-[300%]"
                : ""
            }`}
          />
        ) : (
          <span className="w-5 h-5">{icon}</span>
        )
      ) : (
        text
      )}
    </a>
  );
};

export default Navbar;
