import {
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface FooterProps {
  variant?: "default" | "landing";
}

const Footer = ({ variant = "default" }: FooterProps) => {
  const isLanding = variant === "landing";

  return (
    <section className="relative">

      {/* ⭐ GRID OVERLAY (DISABLED FOR LANDING) */}
      {!isLanding && (
        <div className="absolute inset-0 pointer-events-none z-10 opacity-100">
          <div className="absolute inset-0 grid grid-cols-[repeat(10,1fr)] sm:grid-cols-[repeat(20,1fr)]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`v-${i}`} className="border-r border-white/[0.03]" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-[repeat(10,1fr)] sm:grid-rows-[repeat(6,1fr)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`h-${i}`} className="border-b border-white/[0.03]" />
            ))}
          </div>
        </div>
      )}

      {/* ⭐ FOOTER CONTENT PC*/}
      <footer
        className={`
          relative z-10
          hidden md:block
          ${isLanding ? "bg-black" : "bg-[#2C2C2C]"}
          text-white
          px-6
          ${isLanding ? "py-36" : "py-12 sm:py-16"}
        `}
      >
        <div
          className={`
            grid
            grid-cols-1 gap-16
            sm:grid-cols-4
            max-w-7xl mx-auto
          `}
        >

          {/* ---------------- BRAND ---------------- */}
          <div className="space-y-6">
            <div className="flex sm:flex-col justify-between items-center sm:items-start">
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="LesSkyn"
                  className={`${isLanding ? "h-16 w-14" : "h-12 w-10"}`}
                />
                <h3
                  className={`
                    font-garamond
                    ${isLanding ? "text-5xl" : "text-3xl"}
                    font-medium
                  `}
                >
                  LesSkyn
                </h3>
              </div>

              <div className="flex items-center gap-6 sm:mt-6">
                <Instagram className="h-6 w-6" />
                <Twitter className="h-6 w-6" />
                <Facebook className="h-6 w-6" />
              </div>
            </div>

            <p
              className={`
                max-w-sm
                ${isLanding ? "text-lg" : "text-sm"}
                leading-relaxed
                text-white/50
              `}
            >
              AI-powered skincare assistant creating clarity in skincare chaos for Indian consumers.
            </p>
          </div>

          {/* ---------------- QUICK LINKS ---------------- */}
          <div className="space-y-6">
            <h4 className="font-garamond text-2xl">
              Quick Links
            </h4>
            <ul className={`${isLanding ? "text-lg" : "text-sm"} space-y-4 text-white/60`}>
              <li>Home</li>
              <li>About Us</li>
              <li>Features</li>
              <li>Community</li>
            </ul>
          </div>

          {/* ---------------- RESOURCES ---------------- */}
          <div className="space-y-6">
            <h4 className="font-garamond text-2xl">
              Resources
            </h4>
            <ul className={`${isLanding ? "text-lg" : "text-sm"} space-y-4 text-white/60`}>
              <li>Take the quiz</li>
              <li>Blog</li>
              <li>Sign-up</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* ---------------- NEWSLETTER ---------------- */}
          <div className="space-y-8">
            <h4 className="font-garamond text-2xl">
              Stay Updated
            </h4>

            <p
              className={`${isLanding ? "text-lg" : "text-sm"} text-white/50 max-w-xs`}
            >
              Get skincare tips and updates delivered to your inbox.
            </p>

            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-14 px-6 rounded-2xl bg-white text-black"
              />

              <Button
                className={`
                  h-14
                  rounded-2xl
                  bg-[#FFAD71]
                  hover:bg-[#ff9a4d]
                  text-black
                  text-sm
                  w-full
                `}
              >
                Get Early Access
              </Button>
            </div>
          </div>

        </div>
      </footer>
                   
      {/* ⭐ FOOTER CONTENT MOBILE */}
<footer
  className={`
    md:hidden
    bg-black
    text-white
    px-6
    py-16
  `}
>
  <div className="flex flex-col items-center text-center gap-10 max-w-sm mx-auto">

    {/* BRAND */}
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-5">
        <img src={logo} alt="LesSkyn" className="h-14 w-10" />
        <h3 className="font-garamond mt-[10px] text-[32px] font-medium">
          LesSkyn
        </h3>
      </div>

      <p className="text-[14px] text-white/50 w-[80%] leading-relaxed max-w-xs">
        AI-powered skincare assistant creating clarity in skincare chaos for Indian consumers.
      </p>
    </div>

    {/* SOCIALS */}
    <div className="flex items-center mt-[-16px] gap-6">
      <Instagram className="h-5 w-5" />
      <Twitter className="h-5 w-5 " />
      <Facebook className="h-5 w-5" />
    </div>
<div className="grid grid-cols-2 gap-x-8 gap-y-8 w-full max-w-[320px] mx-auto mt-6">
  
  {/* QUICK LINKS */}
  <div className="flex flex-col gap-4 items-start">
    <h4 className="font-garamond text-xl text-white">
      Quick Links
    </h4>
    <ul className="list-none space-y-2 text-[14px] text-white/50">
      <li>Home</li>
      <li>About Us</li>
      <li>Features</li>
      <li>Community</li>
    </ul>
  </div>

  {/* RESOURCES */}
  <div className="flex flex-col gap-4 items-start">
    <h4 className="font-garamond text-xl text-white">
      Resources
    </h4>
    <ul className="list-none space-y-2 text-[14px] text-white/50">
      <li>Take the quiz</li>
      <li>Blog</li>
      <li>Sign-up</li>
      <li>Contact Us</li>
    </ul>
  </div>

</div>


    {/* NEWSLETTER */}
    <div className="flex flex-col items-center mt-[40px] gap-4 w-full">
      <h4 className="font-garamond text-[20px]">Stay Updated</h4>

      <p className="text-[14px] font-montserrat text-white/50 max-w-[60%] mb-[10px]">
        Get skincare tips and updates delivered to your inbox.
      </p>

      <Input
        type="email"
        placeholder="Enter your email address"
        className="h-[37px] px-6 rounded-lg bg-white text-black/70 w-[241px]"
      />

      <Button
        className="
          h-[37px]
          rounded-lg
          bg-[#FFAD71]
          hover:bg-[#ff9a4d]
          text-black
          font-semibold
          text-[11px]
          w-[241px]
        "
      >
        Get Early Access
      </Button>
    </div>

  </div>
</footer>

    </section>
  );
};

export default Footer;
