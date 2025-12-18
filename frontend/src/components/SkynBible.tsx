import decoderImg from "@/assets/Skyn Decoder.png"
import productImg from "@/assets/Skyn Decoder.png"
import routineImg from "@/assets/Skyn Decoder.png"
import expertImg from "@/assets/Skyn Decoder.png"
import starSrc from "@/assets/Star 16.svg"
const bibleCards = [
  {
    title: "Skyn Decoder",
    description: "All skin conditions listed, what is it, and how you can take care of it",
    image: decoderImg,
  },
  {
    title: "The Ingredient Intel",
    description: "Select an ingredient from the list and get to know about it",
    image: productImg,
  },
  {
    title: "The Skyn Stack",
    description: "List of all the products (eg: sunscreen, moisturiser, etc) and what they do ",
    image: routineImg,
  },
  {
    title: "The Ingredient Matchmaker",
    description: "Choose an ingredient from the list and we will show you which products you can pair it with",
    image: expertImg,
  },
  {
    title: "The Skyn Glossary",
    description: "Skincare terms (comedogenic, barrier, pH, occlusive, etc.) explained in beginner-friendly language.",
    image: expertImg,
  },
];

const SkynBible = () => {
  return (
    <section id="bible" className="relative bg-yellow py-4 px-6">
      <div className="container mx-auto max-w-6xl">
        
        

          <h2 className="font-garamond relative z-10 text-3xl md:text-6xl font-normal text-center mb-16">
  
              {/* WRAPPER ONLY FOR TITLE TEXT */}
              <span className="relative inline-block">
                
                {/* ⭐ STAR BEHIND TITLE */}
                <img
                src={starSrc}
                alt=""
                className="
                  absolute
                  -bottom-1/3 -translate-y-1/2
                  -left-[16px]            /* Mobile offset */
                  sm:-left-[28px]         /* Small screens */
                  md:-left-[34px]         /* Tablets */
                  lg:-left-[38px]         /* Desktop: your original value */

                  w-7 sm:w-8 md:w-10 lg:w-16   /* Proper scaling like FeatureSection */

                  z-0
                  scale-x-[-1]  
                  opacity-100
                  pointer-events-none
                "
              />


                {/* TITLE TEXT */}
                <span className="relative z-10">Skyn Bible</span>

              </span>
            </h2>

        

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 lg:gap-36">

          {bibleCards.map((card, index) => (
          <div
           key={index}
           className="rounded-3xl overflow-hidden bg-secondary hover:shadow-md transition-shadow"
            >
            {/* IMAGE */}
            <div className="w-[85%] mx-auto md:w-full aspect-auto overflow-hidden rounded-3xl border border-black/80">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-auto object-cover rounded-3xl shadow-lg md:rounded-3xl md:shadow-lg"
            />
          </div>


        
            {(
              <div className="text-center p-6 space-y-3">
                <h3 className="font-garamond text-2xl font-normal">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground leading md:leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}
            </div>
              ))}


         </div>
        </div>
      </section>
  );
};

export default SkynBible;