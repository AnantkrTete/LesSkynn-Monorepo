import { useState } from "react";
import Header from "../components/Header";
import SkinTypeCard from "../components/SkinTypeCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveAnswer } from "../utils/saveResponse";

import img1 from "../assets/clearAcne.png";
import img2 from "../assets/reduceOily.png";
import img3 from "../assets/hydrateDrySkin.png";
import img4 from "../assets/evenOutskin.png";
import img5 from "../assets/MinimizePores.png";
import img6 from "../assets/reduceRed.png";
import img7 from "../assets/NaturalGlow.png";
import img9 from "../assets/AntiAging.png";

import PinkStar from "../assets/star pink q1.svg";
import blueBottle from "../assets/blueBottle.svg";
import Purplebottle from "../assets/purple top left.svg";
import yellowtop from "../assets/yellow top right.svg";
import yellowbottle from "../assets/yellowbottom.svg";
import GreenStar from "../assets/greenBottomRight.svg";
import purpleright from "../assets/Purpleright.svg";

const skinCards = [
  {
    title: "Clear Acne & Breakouts",
    img: img1,
    helpText: "Targets clogged pores and bacteria to reduce active acne and prevent new breakouts.",
  },
  {
    title: "Reduce Oiliness & Shine",
    img: img2,
    helpText: "Controls excess sebum to keep skin matte and minimize greasy buildup.",
  },
  {
    title: "Hydrate Dry Skin",
    img: img3,
    helpText: "Restores moisture and strengthens the skin barrier to reduce dryness and flakiness.",
  },
  {
    title: "Minimize Pores & Blackheads",
    img: img4,
    helpText: "Unclogs and tightens pores to reduce blackheads and improve skin texture.",
  },
  {
    title: "Even Out Skin Tone & Reduce Dark Spots",
    img: img5,
    helpText: "Brightens dull areas and fades pigmentation for a more even, uniform complexion.",
  },
  {
    title: "Reduce Redness & Sensitivity",
    img: img6,
    helpText: "Soothes irritation and strengthens skin to reduce redness and sensitivity reactions.",
  },
  {
    title: "Anti-Aging: Reduce Wrinkles & Fine Lines",
    img: img9,
    helpText: "Boosts collagen and smooths skin to reduce wrinkles, fine lines, and signs of aging.",
  },
  {
    title: "Achieve a Natural Glow",
    img: img7,
    helpText: "Enhances radiance by improving hydration, texture, and overall skin clarity.",
  }
];


const SkincareConcernPage = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative min-h-[960px] w-full text-white bg-gradient-to-r from-[#0A0433] via-[#47126B] to-[#FE639C]">
      <Header mode="light" mobileDark={true}/>

      {/* decorations untouched */}
            <div className="absolute inset-0 hidden md:block pointer-events-none">

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
          What's your Skincare Concern?
        </h1>

        <div className="
            mt-14
            flex flex-wrap justify-center gap-5
            lg:flex lg:flex-wrap lg:justify-center lg:gap-20
          ">

          {skinCards.map((card, index) => (
            <SkinTypeCard
              key={index}
              title={card.title}
              img={card.img}
              helpText={card.helpText}
              selected={selected === card.title}
              onSelect={() => setSelected(card.title)}
              mobileWidth="w-[80px]"
              mobileTextSize ="text-[9px]"
            />
          ))}


          
        </div>

        <div className="mt-20 flex justify-center gap-32 pb-20">
          <button
            onClick={() => navigate("/q3")}
             className="font-garamond sm:font-crimson sm:font-semibold sm:text-[20px] border border-black/50 bg-white text-black px-6 py-3 rounded-3xl sm:rounded-xl flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={async () => {
              if (!selected) {
                alert("Please select an option!");
                return;
              }

              const userId = localStorage.getItem("quiz_user_id");
              await saveAnswer(userId!, "q4_concern", selected);

              navigate("/summary");
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

export default SkincareConcernPage;
