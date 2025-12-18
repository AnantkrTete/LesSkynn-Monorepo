interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  titleOffset?: string;
  starSrc?: string;
  contentOffset?: string;
  hideStarOnMobile?: boolean;  
}

const FeatureSection = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  titleOffset = "",
  starSrc,
  contentOffset,
  hideStarOnMobile = false      
}: FeatureSectionProps) => {
  return (
    <div
      className={`
        relative 
        flex flex-col lg:flex-row 
        items-center 
        gap-12 lg:gap-24 
        px-6 lg:px-24 
        py-20 
        
        ${reverse ? "lg:flex-row-reverse" : ""}
      `}
    >

      {/* CONTENT BLOCK */}
      <div
        className={`
          relative z-10 w-full max-w-md mx-auto lg:max-w-xl
          order-2 lg:order-1
          ${contentOffset}
        `}
      >
        <div className="relative inline-block w-full lg:w-auto mx-auto md:mx-auto lg:mx-0">



            <h2
          className={`
            ${titleOffset}
            relative font-garamond z-10
            text-2xl sm:text-3xl md:text-5xl
            text-center lg:text-left
            font-normal leading-tight
          `}
        >

              {title}
            </h2>

            {starSrc && (
              <img
                src={starSrc}
                alt=""
                className={`
                  absolute
                  /* MOBILE → center the star above the title */
                  right-1/20 translate-x-3 top-2

                  /* TABLET+DESKTOP → go back to your original right alignment */
                  md:left-auto md:translate-x-0
                  md:-top-[6px]
                  md:-right-[8px]
                  lg:-top-[10px]
                  lg:-right-[14px]

                  w-7 sm:w-6 lg:w-12
                  pointer-events-none
                  ${hideStarOnMobile ? "hidden md:block" : ""}
                `}
              />

            )}

          </div>



        {/* DESCRIPTION */}
        <p
          className="
            text-black/50 
            text-sm sm:text-base lg:text-lg    /* ✅ SMALLER DESCRIPTION ON MOBILE */
            mt-3 sm:mt-5 
            leading-normal sm:leading-relaxed 
            text-center lg:text-left
          "
        >
          {description}
        </p>
      </div>

      {/* IMAGE BLOCK */}
      <div
        className="
          relative z-10 w-full max-w-md mx-auto lg:max-w-3xl
          order-1 lg:order-2 border rounded-3xl
        "
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full rounded-3xl shadow-lg"
        />
      </div>

    </div>
  );
};

export default FeatureSection;
