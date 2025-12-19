import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { startNewQuiz } from "../lib/startNewQuiz";
import profile from "../assets/profile.svg";
import logo from "../assets/logo.png";
const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
    const location = useLocation();
const isBookingPage = location.pathname === "/booking";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white md:border-b border-black/40 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">

        {/* LOGO/BRAND REMOVED */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
        { (
          <>
            {/* MOBILE = always show logo */}
            <img
              src={logo}
              alt="LesSkyn Logo"
              className="w-8 h-8 sm:w-10 sm:h-12 object-contain md:hidden"
            />
            <span className="block md:hidden font-montserrat text-[13px] font-medium leading-none ">
              LesSkyn
            </span>
            {/* DESKTOP = show only when mode === 'dark' */}
            { (
              <img
                src={logo}
                alt="LesSkyn Logo"
                className="w-8 h-8 sm:w-10 sm:h-12 object-contain hidden md:block"
              />
            )}
          </>
        )}

        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-black/50"
            }
          >
            Home
          </NavLink>

                    <NavLink
            to="/q1"
            onClick={() => {
              startNewQuiz();
            }}
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-black/50"
            }
          >
            Quiz
          </NavLink>


          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-black/50"
            }
          >
            Your Booking
          </NavLink>

            {isBookingPage && (
            <button
                onClick={() => window.dispatchEvent(new Event("open-register-influencer"))}
                className="text-black/50 hover:text-black"
            >
                Register Influencer
            </button>
            )}

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <img
              src={profile}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-12 object-contain"
            />
          </div>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-black text-xl sm:text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full right-4 mt-2 z-50">
            <div className="w-52 rounded-xl shadow-lg p-4 bg-white text-black">
              <nav className="flex flex-col gap-4 text-base">
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/q1" onClick={() => setOpen(false)}>Quiz</NavLink>
                <NavLink to="/booking" onClick={() => setOpen(false)}>Your Booking</NavLink>
                {isBookingPage && (
                <button
                    onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new Event("open-register-influencer"));
                    }}
                    className="text-left"
                >
                    Register Influencer
                </button>
                )}

              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;