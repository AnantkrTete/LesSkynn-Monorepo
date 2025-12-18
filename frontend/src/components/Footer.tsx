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

      {/* ⭐ FOOTER CONTENT */}
      <footer
        className={`
          relative z-10
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
    </section>
  );
};

export default Footer;
