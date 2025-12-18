import { useState } from "react";
import Header from "../components/Header";
import SkinTypeCard from "../components/SkinTypeCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveAnswer } from "../utils/saveResponse";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";

import PinkStar from "../assets/star pink q1.svg";
import blueBottle from "../assets/blueBottle.svg";
import Purplebottle from "../assets/purple top left.svg";
import yellowtop from "../assets/yellow top right.svg";
import yellowbottle from "../assets/yellowbottom.svg";
import GreenStar from "../assets/greenBottomRight.svg";
import purpleright from "../assets/Purpleright.svg";

const skinCards = [
  {
    title: "Normal Skin",
    img: img1,
    helpText: "Balanced moisture and oil levels with minimal sensitivity.",
  },
  {
    title: "Oily Skin",
    img: img2,
    helpText: "Produces excess sebum, often leading to shine and clogged pores.",
  },
  {
    title: "Dry Skin",
    img: img3,
    helpText: "Lacks moisture and natural oils, causing tightness and flakiness.",
  },
  {
    title: "Combination Skin",
    img: img4,
    helpText: "Oily in the T-zone and dry or normal on the cheeks.",
  },
  {
    title: "Sensitive Skin",
    img: img5,
    helpText: "Reacts easily to products or environment, often with redness or irritation.",
  },
];


const FiveCardPage = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="min-h-[100svh] text-white bg-gradient-to-r from-[#0A0433] via-[#47126B] to-[#FE639C] relative">
      <Header mode="light" mobileDark={true}  logoVisible = {true} logoText = {true}/>

      {/* DECORATIVE SIDES */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <img src={PinkStar} className="w-20 absolute top-10 left-90" />
        <img src={blueBottle} className="w-20 absolute top-[80%] left-0" />
        <img src={Purplebottle} className="w-20 absolute top-30 left-0" />
        <img src={GreenStar} className="w-20 absolute bottom-0 right-0" />
        <img src={yellowtop} className="w-20 absolute top-[10%] right-0" />
        <img src={yellowbottle} className="w-20 absolute bottom-0 right-[45%]" />
        <img src={purpleright} className="w-20 absolute top-[45%] right-0" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 pt-28 px-6 max-w-7xl mx-auto">
        <h1 className="font-garamond text-[24px] leading-[34px] sm:mt-20 sm:text-[40px] sm:leading-[44px] md:text-[52px] md:leading-[56px] lg:text-[64px] lg:leading-[64px] text-center whitespace-nowrap">
          What is your skin type?
        </h1>

        {/* CARDS */}
       <div
      className="
        mt-14
        flex flex-wrap justify-center gap-5
        lg:grid lg:grid-cols-5 lg:gap-10 lg:justify-items-center
      "
    >
          {skinCards.map((card, index) => (
            <SkinTypeCard
              key={index}
              title={card.title}
              img={card.img}
              selected={selected === card.title}
              helpText={card.helpText}
              onSelect={() => setSelected(card.title)}
            />
          ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-16 flex justify-center gap-30 sm:gap-32 pb-10">
          <button
            onClick={() => navigate("/")}
            className="font-garamond sm:font-crimson sm:font-semibold sm:text-[20px] border border-black/50 bg-white text-black px-6 py-3 rounded-3xl sm:rounded-xl flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>

          <button
            onClick={async () => {
              if (!selected) {
                alert("Please select an option!");
                return;
              }

              const userId = localStorage.getItem("quiz_user_id");

              await saveAnswer(userId!, "q1_skinType", selected);

              navigate("/q2");
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
