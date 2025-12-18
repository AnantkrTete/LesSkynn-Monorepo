// src/components/DiscoverSection.tsx
import smallpf from "@/assets/100+.svg";
import DecorativeLoop from "./DecorativeLoop";

const DiscoverSection = () => {
  return (
    <section className="relative bg-white py-[250px] w-full overflow-hidden">



      {/* CENTERED COLUMN */}
      <div className="relative max-w-[1200px] mx-auto text-center">

        {/* TOP TEXT */}
        <h1
          className="
            relative z-10
            font-montserrat font-semibold
            text-[80px] leading-[1.1]
            text-black
          "
        >
          Discover your unique skincare journey with
        </h1>

        {/* ANIMATION BAND */}
        <div className="relative h-[20px] ">
          <DecorativeLoop />
        

            {/* BOTTOM TEXT */}
            <h1
            className="
                relative z-30
                font-montserrat font-semibold
                py-[60px]
                text-[72px]
                text-black
                [text-shadow:0px_8px_4.9px_rgba(0,0,0,0.25)]
            "
            >
            LesSkyn
            </h1>
        </div>
        {/* TRUST ROW */}
        <div className="relative z-20 flex items-center justify-center gap-3 h-[91px] mt-55">
          <img src={smallpf} className="w-[104px]" />
          <p className="font-montserrat font-medium text-black text-[24px]">
            100+ users trust LesSkyn
          </p>
        </div>

      </div>

            </section>

  );
};

export default DiscoverSection;
