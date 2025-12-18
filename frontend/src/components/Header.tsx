import logo from "@/assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({
  mode = "light",
  mobileDark = false,
  logoVisible = true,
  logoText = true,
  hideLogoTextDesktop = false,
}) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isMobileDark = mobileDark;

  return (
        <header
  className={`fixed top-0 left-0 right-0 z-50
    ${
      (mode === "dark" && mobileDark)
        ? "bg-[#2C2C2C]"                     // INDEX: mobile+desktop dark
        : (mobileDark && mode === "light")
        ? "bg-[#2C2C2C] md:bg-white/95"     // QUIZ: mobile dark, desktop white
        : mode === "dark"
        ? "bg-[#2C2C2C]"                     // Normal dark behavior
        : "bg-white/95"                      // Normal light behavior
    }
    backdrop-blur-sm
  `}
>
      <div className="w-full px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">

        {/* LOGO + BRAND */}
       
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              {/* LOGO SHOULD ALWAYS SHOW ON MOBILE  */}
            {/* SHOW LOGO ON DESKTOP ONLY IF mode === "dark" */}
              {/* LOGO ICON */}
            {logoVisible && (
              <>
                {/* MOBILE = always show logo */}
                <img
                  src={logo}
                  alt="LesSkyn Logo"
                  className="w-8 h-8 sm:w-10 sm:h-12 object-contain md:hidden"
                />

                {/* DESKTOP = show only when mode === 'dark' */}
                {mode === "dark" && (
                  <img
                    src={logo}
                    alt="LesSkyn Logo"
                    className="w-8 h-8 sm:w-10 sm:h-12 object-contain hidden md:block"
                  />
                )}
              </>
            )}



              <span
                className={`font-montserrat sm:font-garamond text-sm sm:text-2xl  ${
                  (mode === "dark" && isMobileDark)
                  ? "text-white"                       // INDEX: dark everywhere
                  : (isMobileDark && mode === "light")
                  ? "text-white md:text-black"         // QUIZ: mobile dark, desktop light
                  : mode === "dark"
                  ? "text-white"                       // normal dark mode
                  : "text-black"                       // normal light mode

                } ${
              logoText
                ? hideLogoTextDesktop
                  ? "block md:hidden"   // Index: hide on desktop
                  : "block"             // Q pages: never hide on desktop
                : "hidden"
            }
            `}
              >
                LesSkyn
              </span>
            </div>


        {/* DESKTOP NAV */}
        <nav
            className={`
              hidden md:flex items-center gap-6 text-sm font-medium
              ${isMobileDark
                  ? "text-white md:text-black"
                  : mode === "dark"
                  ? "text-white"
                  : "text-black"}
            `}
          >
            <a
              href="#dashboard"
              className={`
                transition-colors
                ${(mode === "dark" && isMobileDark)
                ? "text-white/50"                       // INDEX: dark everywhere
                : (isMobileDark && mode === "light")
                ? "text-white md:text-black"         // QUIZ: mobile dark, desktop light
                : mode === "dark"
                ? "text-white/50"                       // normal dark mode
                : "text-black"                       // normal light mode
}
              `}
            >
              Dashboard
            </a>

            <a
              href="#bible"
              className={`
                transition-colors
                ${(mode === "dark" && isMobileDark)
                  ? "text-white/50"                       // INDEX: dark everywhere
                  : (isMobileDark && mode === "light")
                  ? "text-white md:text-black"         // QUIZ: mobile dark, desktop light
                  : mode === "dark"
                  ? "text-white/50"                       // normal dark mode
                  : "text-black"                       // normal light mode
                }
              `}
            >
              LesSkyn Bible
            </a>

            <a
              href="#community"
              className={`
                transition-colors
                ${(mode === "dark" && isMobileDark)
                  ? "text-white/50"                       // INDEX: dark everywhere
                  : (isMobileDark && mode === "light")
                  ? "text-white md:text-black"         // QUIZ: mobile dark, desktop light
                  : mode === "dark"
                  ? "text-white/50"                       // normal dark mode
                  : "text-black"                       // normal light mode
                }
              `}
            >
              Community
            </a>

            <a
              href="#product"
              className={`
                whitespace-nowrap transition-colors
                ${(mode === "dark" && isMobileDark)
                  ? "text-white/50"                       // INDEX: dark everywhere
                  : (isMobileDark && mode === "light")
                  ? "text-white md:text-black"         // QUIZ: mobile dark, desktop light
                  : mode === "dark"
                  ? "text-white/50"                       // normal dark mode
                  : "text-black"                       // normal light mode
                }
              `}
            >
              Know your product
            </a>
          </nav>


        {/* MOBILE MENU BUTTON */}
        <button
          className={`md:hidden ${isMobileDark
                  ? "text-white md:text-black"
                  : mode === "dark"
                  ? "text-white"
                  : "text-black"} text-xl sm:text-2xl`}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

     {/* MOBILE DROPDOWN MENU */}
          {open && (
            <>
              {/* CLICK OUTSIDE TO CLOSE (transparent overlay) */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />

              {/* THE DROPDOWN ITSELF */}
              <div className="absolute top-full right-4 mt-2 z-50">
                <div
                    className={`
                      w-52 rounded-xl shadow-lg p-4
                            ${isMobileDark
                      ? "bg-[#2C2C2C] text-white/95 md:bg-white/95 md:text-black"
                      : mode === "dark"
                      ? "bg-[#2C2C2C] text-white"
                      : "bg-white/95 text-black"}
                    `}
                  >

                  <nav className="flex flex-col gap-4 text-base">
                    <a href="#dashboard" onClick={() => setOpen(false)}>Dashboard</a>
                    <a href="#bible" onClick={() => setOpen(false)}>LesSkyn Bible</a>
                    <a href="#community" onClick={() => setOpen(false)}>Community</a>
                    <a href="#product" onClick={() => setOpen(false)}>Know your product</a>
                  </nav>
                </div>
              </div>
            </>
          )}



    </header>
  );
};

export default Header;
