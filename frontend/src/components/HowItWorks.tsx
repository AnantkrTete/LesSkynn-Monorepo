import yellowStar from "../assets/Star 20.svg"
import skyStar from "../assets/Star 19.svg"

const steps = [
  {
    number: "01",
    title: "Take the Quiz",
    description: "Answer fun, gamified questions about your skin type, concerns, and lifestyle",
  },
  {
    number: "02",
    title: "Set Your Budget",
    description: "Tell us your budget and expected results timeframe, we'll work within your means",
  },
  {
    number: "03",
    title: "AI Recommendations",
    description: "Get cross-brand product recommendations tailored specifically for your skin",
  },
  {
    number: "04",
    title: "Your Routine",
    description: "Receive complete AM/PM routines with ingredient insights and usage instructions",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
              
          <h2 className="font-garamond text-2xl md:text-6xl font-normal flex items-center justify-center gap-3">
          <img
              src={yellowStar}
              alt="pink star"
              className="relative hidden sm:block"
              style={{
                width: "86px",
                height: "86px",
                padding: "10px",
              }}
            />
            How LesSkyn works
            <img
              src={skyStar}
              alt="pink star"
              className="relative hidden sm:block"
              style={{
                width: "86px",
                height: "86px",
                padding: "10px",
              }}
            />

          </h2>
          <p className="text-sm sm:text-base lg:text-lgfont-medium text-muted-foreground">
            Your personalized skincare journey in 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="/* MOBILE — Figma perfect */
                w-[85%] mx-auto 
                aspect-[262/226]
                bg-white 
                border border-black/80
                rounded-3xl
                p-5 pt-6 pb-8
                space-y-2

                /* DESKTOP (unchanged) */
                md:w-auto md:aspect-[304/396] 
                md:p-8 md:space-y-16 
                md:border md:border-foreground/10 
                md:hover:shadow-lg md:transition-shadow"
            >
              <h3 className="font-garamond mt-2 md:mt-0 text-3xl md:text-5xl font-normal">
                {step.number}
              </h3>

              <div className="mt-15 md:mt-0  space-y-2  md:space-y-4">
                {/* Title */}
                <h4
                  className="
                    font-garamond 
                    text-xl md:text-2xl 
                    font-normal
                  "
                >
                  {step.title}
                </h4>

                {/* Description */}
                <p
                  className="
                    text-sm md:text-base 
                    font-medium 
                    text-muted-foreground 
           
                    leading-[16px] md:leading-relaxed
                    tracking-[0.2px]
                  "
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;