import { Info } from "lucide-react";
import { useState } from "react";

const SkinTypeCard = ({
  title,
  img,
  selected,
  onSelect,
  mobileWidth,
  mobileTextSize,
  helpText ,
}: {
  title: string;
  img: string;
  selected: boolean;
  onSelect: () => void;
  mobileWidth?: string;
  mobileTextSize?: string;
  helpText?: string;  
}) => {
  const [flipped, setFlipped] = useState(false);

  const onHelpClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFlipped((p) => !p);
  };

  return (
    <div
      className={`
        relative  
        ${mobileWidth ? mobileWidth : "w-[100px]"} md:w-[250px]
        min-h-[180px] md:h-[320px]
        rounded-2xl overflow-hidden shadow-md border transition-all
        ${selected ? "border-black scale-105" : "border-neutral-200"}
      `}
      onClick={onSelect}
      style={{ perspective: "1000px" }}
    >

      {/* FLIP WRAPPER — WHOLE CARD FLIPS */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* -------------------------------------------------- */}
        {/* FRONT SIDE: IMAGE + INFO ICON + TITLE BAR          */}
        {/* -------------------------------------------------- */}
        <div
          className="absolute inset-0 bg-white flex flex-col items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Icon */}
          <button
            onClick={onHelpClick}
            className="absolute top-2 right-2 md:top-3 md:right-3 cursor-pointer z-10"
          >
            <Info className="w-4 h-4 md:w-5 md:h-5 text-black/50" />
          </button>

          {/* Image */}
          <div className="pt-7 md:pt-10 pb-4 flex justify-center">
            <img
              src={img}
              alt={title}
              className="w-[60px] h-[60px] md:w-[150px] md:h-[150px] object-contain"
            />
          </div>

          {/* Bottom Bar */}
          <div
            className={`
              mt-auto w-full h-[37px] md:h-[70px]
              flex items-center justify-center text-center
              ${selected ? "bg-yellow-400" : "bg-yellow-200"}
            `}
          >
            <p
              className={`font-montserrat ${
                mobileTextSize ? mobileTextSize : "text-[13px]"
              } md:text-[22px] font-medium text-black px-2`}
            >
              {title}
            </p>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* BACK SIDE: HELP TEXT + SAME INFO ICON + TITLE BAR   */}
        {/* -------------------------------------------------- */}
        <div
  className="absolute inset-0 bg-white flex flex-col px-4 text-center"
  style={{
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden",
  }}
>
  {/* Same info icon */}
  <button
    onClick={onHelpClick}
    className="absolute top-2 right-2 md:top-3 md:right-3 cursor-pointer z-10"
  >
    <Info className="w-4 h-4 md:w-5 md:h-5 text-black/50" />
  </button>

  {/* Center the help text vertically */}
  <div className="flex-1 flex items-center justify-center px-3">
    <p className="text-[12px] md:text-[16px] leading-snug text-black font-medium">
      {helpText}
    </p>
  </div>

  {/* Bottom title bar fixed height, never squeezed */}
  <div
    className={`
      h-[37px] md:h-[70px]
      flex items-center justify-center text-center
      ${selected ? "bg-yellow-400" : "bg-yellow-200"}
    `}
  >
    <p
      className={`font-montserrat ${
        mobileTextSize ? mobileTextSize : "text-[13px]"
      } md:text-[22px] font-medium text-black px-2`}
    >
      {title}
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

export default SkinTypeCard;
