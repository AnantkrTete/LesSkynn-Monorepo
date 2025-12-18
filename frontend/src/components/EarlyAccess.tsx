import { Button } from "./ui/button";
import { Input } from "./ui/input";
import starSrc from "../assets/Star 16.svg"


const EarlyAccess = () => {
  return (
    <section className="relative py-24 px-6">
      
      <div className="container mx-auto w-full text-center space-y-12">
        <div className="space-y-6">

          <h2 className="relative  font-garamond text-4xl md:text-5xl font-normal leading-tight text-center inline-block mx-auto">

              {/* LEFT STAR */}
              <img
                src={starSrc}
                alt=""
                className="
                  absolute
                  hidden sm:block
                  left-[-20px]       
                  top-[10px]
                  w-8 sm:w-10 lg:w-12
                  z-0
                  pointer-events-none
                "
              />

              {/* TITLE TEXT */}
              <span className="relative text-2xl sm:text-5xl z-10 block">
                Be the first to Experience India’s 
                smartest Skincare App
              </span>

              {/* RIGHT STAR */}
              <img
                src={starSrc}
                alt=""
                className="
                  absolute
                  hidden sm:block
                  right-[-20px]
                  top-[10px]
                  w-8 sm:w-10 lg:w-12
                  z-0
                  pointer-events-none
                "
              />
            </h2>



          <p className="text-sm md:text-xl font-medium text-black/50 max-w-3xl mx-auto">
            Join our exclusive early access list and get personalized skincare routine before anyone else
          </p>
        </div>

        <div className="flex flex-col items-center sm:flex-row gap-4 max-w-2xl mx-auto">

          <Input
            type="email"
            placeholder="Enter your email address"
            className="w-full h-12 sm:h-16 px-4 text-sm sm:text-base text-black font-montserrat
           border-black/50 rounded-xl bg-white"
          />
          <Button
            size="lg"
            className="
              bg-[#FFAD71] hover:bg-coral/90 text-black border border-black/40
              rounded-xl px-6 py-3             /* MOBILE SIZE */
              w-auto mx-auto                   /* CENTER BUTTON ON MOBILE */
              sm:px-10 sm:h-14 sm:mx-0         /* DESKTOP UNCHANGED */
              font-montserrat text-sm sm:text-base
            "

          >
            Get Early Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
