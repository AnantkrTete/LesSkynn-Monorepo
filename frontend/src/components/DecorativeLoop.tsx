import { useEffect, useState } from "react";
import bottle from "@/assets/bottle.svg";
import Toner from "@/assets/Toner.svg";
import lip from "@/assets/lip.svg";
import dbba from "@/assets/dbba.svg";

const images = [bottle, Toner, lip, dbba];

const DecorativeLoop = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showTime = 2000;  // visible
    const fadeTime = 500;   // fade out
    const gapTime = 200;    // EMPTY gap (critical)

    const hide = setTimeout(() => setVisible(false), showTime);

    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
      setVisible(true);
    }, showTime + fadeTime + gapTime);

    return () => {
      clearTimeout(hide);
      clearTimeout(next);
    };
  }, [index]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <img
        src={images[index]}
        className={`
          absolute
          md:left-[25%]
          w-[168px]
           md:w-[650px] h-[130px] md:h-[500px]
          transition-opacity duration-[700ms] ease-in-out
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
};

export default DecorativeLoop;
