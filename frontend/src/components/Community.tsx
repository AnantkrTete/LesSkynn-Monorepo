

const stats = [
  { number: "500+", label: "Instagram followers" },
  { number: "300+", label: "Active users" },
  { number: "500+", label: "Products reviewed" },
];

const Community = () => {
  return (
    <section id="community" className="relative px-0 md:px-6 pt-1 sm:pb-26 overflow-hidden -mt-7 sm:mt-0  ">
            
      <div className="mx-auto max-w-8xl sm:mb-[200px]">

          <div className="bg-white rounded-2xl lg:rounded-[32px] w-[92%] sm:w-full max-w-[1406px] h-[89px] md:h-[300px] mx-auto"></div>
  
          <div className="text-center space-y-1  relative z-10 mb-[2px] sm:mb-24">
            <h2 className="font-garamond py-3 sm:py-9 text-2xl md:text-4xl font-normal">
            
              Join India's fastest growing skincare community
              
            </h2>
            <p className=" text-sm md:text-2xl 
              font-medium text-black/50 
              md:max-w-4xl mx-auto 

              leading-[19px]      /* MOBILE tighter line-height */
              tracking-[-0.1px]   /* MOBILE tighter letter spacing */

              md:leading-[32px]   /* DESKTOP unchanged */
              md:tracking-normal">
              LesSkyn isn’t just an app, its a movement. We are building a community of informed and enthusiastic users who take control of their skincare journey. 
            </p>
          </div>

            <div
              className="
                grid grid-cols-3
                gap-2 justify-start 
                ml-4
                max-w-[400px] mx-auto
                mt-7
                /* MOBILE FIX */
                 
                md:px-0 
                md:max-w-7xl md:ml-22 md:py-6 /* DESKTOP ONLY */
                md:gap-22 md:justify-center    /* DESKTOP ORIGINAL */
              "
            >

            {stats.map((stat, index) => (
              <div
                key={index}
                className="
                  bg-white 
                  rounded-2xl md:rounded-3xl 
                  w-[100px] md:w-auto
                    
                  p-4 md:p-10 
                  text-center 
                  space-y-0 md:space-y-2
                "
              >
                {/* NUMBER */}
                <div
                  className="
                    font-garamond font-normal 
                    text-3xl md:text-[64px] 
                    leading-[28px] md:leading-[64px]
                  "
                >
                  {stat.number}
                </div>

                {/* LABEL */}
                <div
                  className="
                    font-montserrat font-medium  
                    text-xs md:text-[28px] 
                    leading-[18px] md:leading-[32px]
                    text-black/50
                  "
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        
      </div>
    </section>
  );
};

export default Community;
