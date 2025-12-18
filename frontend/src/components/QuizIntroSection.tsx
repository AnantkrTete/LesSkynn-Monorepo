import img from "../assets/RightQuiz.svg"
import { startNewQuiz } from "@/lib/startNewQuiz";
import { useNavigate } from "react-router-dom";
const QuizIntroSection = () => {
    const navigate = useNavigate();
  return (
    <section className="relative w-full bg-white py-[120px]">
      <div className="mx-auto max-w-[1526px] px-10">
        <div className="grid grid-cols-2 items-center gap-[80px]">
          
          {/* LEFT CONTENT */}
          <div className="max-w-[520px]">
            {/* CTA Button */}
            <button
            onClick={() => {
              startNewQuiz();
              navigate("/q1");
            }}

              className="
                mb-8
                rounded-full
                bg-[#FFAD71]
                w-[364px]
                h-[93px]
                px-10 py-4
                font-montserrat
                text-[24px] font-semibold
                text-black
                border
                cursor-pointer
              "
            >
              Take The Quiz
            </button>

            {/* Heading */}
            <h2
             className="
                font-montserrat
                font-semibold
                text-[40px]
                leading-[1]
                tracking-normal
                text-black
                "

            >
             Not Sure What Suits Your Skin? Let’s Fix That!
            </h2>

            {/* Description */}
            <p
            className="
            font-montserrat
            font-medium
            text-[28px]
            leading-[32px]
            tracking-normal
            text-black
            mt-[20px]
            "

            >
              Take a 2-Minute Skin Quiz for Your Personalized Skincare Routine
            </p>
          </div>

          {/* RIGHT IMAGE PLACEHOLDER */}
          <div
            className="
              relative
              h-[556px]
              w-[670px]
              rounded-3xl
              bg-white
              flex items-center justify-center
            "
          >
            <span className="text-black/40 font-montserrat">
             <img src={img} alt="" />
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuizIntroSection;
