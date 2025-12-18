import { useState } from "react";
import Header from "../components/Header";
import SkinTypeCard from "../components/SkinTypeCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveAnswer } from "../utils/saveResponse";

import img1 from "../assets/organic.png";
import img2 from "../assets/budget.png";

import PinkStar from "../assets/star pink q1.svg";
import blueBottle from "../assets/blueBottle.svg";
import Purplebottle from "../assets/purple top left.svg";
import yellowtop from "../assets/yellow top right.svg";
import yellowbottle from "../assets/yellowbottom.svg";
import GreenStar from "../assets/greenBottomRight.svg";
import purpleright from "../assets/Purpleright.svg";

const skinCards = [
  {
    title: "Organic",
    img: img1,
    helpText: "Made with natural, plant-based ingredients and free from harsh chemicals.",
  },
  {
    title: "Budget Friendly",
    img: img2,
    helpText: "Effective skincare options designed to deliver results without high cost.",
  },
];


const FiveCardPage = () => {
  const navigate = useNavigate();

   const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-[#0A0433] via-[#47126B] to-[#FE639C] relative">
      <Header mode="light" mobileDark={true}/>

      {/* decorations untouched */}
      {/* ➤ DECORATIVE SIDES */}
          <div className="absolute inset-0 hidden sm:block pointer-events-none">

                {/* Top-left shape */}
                <img 
                  src={PinkStar} 
                  className="w-20 absolute top-10 left-90"
                />

                {/* Mid-left bottle */}
                <img 
                  src={blueBottle} 
                  className="w-20 absolute top-[80%] left-0"
                />

                {/* Bottom-left bottle */}
                <img 
                  src={Purplebottle} 
                  className="w-20 absolute top-30 left-0"
                />


                {/* Top-right shape */}
                <img 
                  src={GreenStar} 
                  className="w-20 absolute bottom-0 right-0"
                />

                {/* Middle-right */}
                <img 
                  src={yellowtop} 
                  className="w-20 absolute top-[10%] right-0"
                />

                {/* Bottom-right */}
                <img 
                  src={yellowbottle} 
                  className="w-20 absolute bottom-0 right-[45%]"
                />

                {/* Low-right purple */}
                <img 
                  src={purpleright} 
                  className="w-20 absolute top-[45%] right-0"
                />

           </div>

      <div className="relative z-10 pt-28 px-6 max-w-7xl mx-auto">
        <h1 className="font-garamond text-[24px] leading-[34px] sm:mt-20 sm:text-[40px] sm:leading-[44px] md:text-[52px] md:leading-[56px] lg:text-[64px] lg:leading-[64px] text-center whitespace-nowrap">
          Preferred Skincare Ingredients
        </h1>

       <div
          className="
            mt-14
            flex flex-wrap justify-center gap-5
            lg:flex lg:flex-wrap lg:justify-center lg:gap-10
          "
        >
          {skinCards.map((card, index) => (
            <SkinTypeCard
              key={index}
              title={card.title}
              img={card.img}
              helpText={card.helpText}
              selected={selected.includes(card.title)}
              onSelect={() => toggleSelect(card.title)}
            />
          ))}
        </div>

        <div className="mt-20 flex justify-center gap-32 pb-20">
          <button
            onClick={() => navigate("/q2")}
             className="font-garamond sm:font-crimson sm:font-semibold sm:text-[20px] border border-black/50 bg-white text-black px-6 py-3 rounded-3xl sm:rounded-xl flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={async () => {
              if (selected.length === 0) {
                alert("Please select an option!");
                return;
              }


              const userId = localStorage.getItem("quiz_user_id");
              await saveAnswer(userId!, "q3_preference", selected);

              navigate("/q4");
            }}
             className="font-garamond sm:font-crimson sm:font-semibold sm:text-[20px] border border-black/50 bg-white text-black px-6 py-3 rounded-3xl sm:rounded-xl flex items-center gap-2"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiveCardPage;
