import React, { useEffect, useRef, useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  GithubIcon,
  MailIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  const titleRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerConfig = {
        trigger: sectionRef.current,
        start: "top 40%",
        end: "bottom top 80%",
        toggleActions: "play reverse play reverse",
      };

      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 60, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: triggerConfig,
        }
      );

      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: triggerConfig,
        }
      );

      gsap.fromTo(
        socialRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: triggerConfig,
        }
      );

      const icons = socialRef.current.querySelectorAll("a");
      gsap.fromTo(
        icons,
        { opacity: 0, y: 20, rotate: -15, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          delay: 0.4,
          scrollTrigger: triggerConfig,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ success: false, message: "Vui lòng điền đầy đủ thông tin." });
      return;
    }

    // Gửi email bằng EmailJS
    emailjs
      .send(
        "service_vmj5kp4", // Thay bằng service ID của bạn
        "template_4kpwqum", // Thay bằng template ID của bạn
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "baolethanhlam2001@gmail.com", // email nhận
        },
        "ZvQPIL78KqDCwhCEz" // Thay bằng user ID của bạn
      )
      .then(
        (result) => {
          setStatus({ success: true, message: "Gửi tin nhắn thành công!" });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus({
            success: false,
            message: "Gửi tin nhắn thất bại, vui lòng thử lại.",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="grid grid-cols-12 gap-8 px-4 py-16 text-white"
    >
      <h1
        ref={titleRef}
        className="col-span-12 text-4xl  text-purple-400 text-center mb-12 flex justify-center items-center"
      >
        Liên hệ
      </h1>

      <div
        ref={formRef}
        className="col-span-12 md:col-span-7  flex-1 p-8 rounded-2xl bg-[#1e293b]/80 backdrop-blur-md shadow-lg border border-white/10"
      >
        <h2 className="text-2xl md:text-3xl  text-purple-300 mb-6">
          Liên hệ với mình
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nhập tên của bạn"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Nội dung</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Viết gì đó..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition-all"
          >
            Gửi tin nhắn
          </button>
        </form>
        {status && (
          <p
            className={`mt-4 ${
              status.success ? "text-green-400" : "text-red-400"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>

      <div
        ref={socialRef}
        className=" col-span-12 md:col-span-5 p-8 rounded-2xl bg-[#1e293b]/80 backdrop-blur-md shadow-lg border border-white/10 "
        style={{ alignSelf: "flex-start" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-4">
          Kết nối với mình
        </h2>
        <p className="text-white/80 mb-4">
          Bạn có thể theo dõi mình tại các nền tảng bên dưới để cập nhật những
          dự án và chia sẻ mới nhất.
        </p>
        <div className="flex gap-5 mt-4">
          <SocialIcon
            href="https://www.facebook.com/vo.lam.796513"
            icon={<FacebookIcon />}
            label="Facebook"
          />
          <SocialIcon
            href="https://www.instagram.com/dev.nha_que/"
            icon={<InstagramIcon />}
            label="Instagram"
          />
          <SocialIcon
            href="https://github.com/thanhlam2802"
            icon={<GithubIcon />}
            label="GitHub"
          />
          <SocialIcon
            href="mailto:baolethanhlam2001@gmail.com"
            icon={<MailIcon />}
            label="Email"
          />
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-white/10 p-3 rounded-full hover:bg-purple-500 transition-colors duration-300 text-white hover:text-white"
    >
      {React.cloneElement(icon, { size: 24 })}
    </a>
  );
};

export default ContactSection;
