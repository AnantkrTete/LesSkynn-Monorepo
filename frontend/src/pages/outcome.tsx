

import Header from "../components/Header";
import img1 from "../assets/Group 17.svg";
import img2 from "../assets/cleanser.svg";
import img3 from "../assets/Serum.svg";
import img4 from "../assets/Moisturizer.svg";
import img5 from "../assets/Lip Balm.svg";
import img6 from "../assets/Sunscreen.svg";
import img7 from "../assets/Night Cream.svg";
import img8 from "../assets/Micellar Water.svg";
import img9 from "../assets/Face Oil.svg";
import img10 from "../assets/Exfoliant.svg";
import img11 from "../assets/Body Lotion.svg";
import img12 from "../assets/night.svg";
import img13 from "../assets/image 88.svg";
import dummyData from "../data/dummy.json";

import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import amazon from "../assets/amazon.png";
import flipkart from "../assets/flipkart.png";
import nykaa from "../assets/nykaa.svg";

type StoreItem = {
  title: string;
  price: string;
  url: string;
  image: string;
};
type Stores = {
  amazon?: StoreItem | null;
  flipkart?: StoreItem | null;
  nykaa?: StoreItem | null;
  image?: string;
};


type RoutineItem = {
  category: string;
  name: string;
  why: string;
  stores: Stores;
};

type CategoriesItem = {
  category?: string; // 👈 add this
  name: string;
  why: string;
  stores: Stores;
};


type RoutineData = {
  morning: RoutineItem[];
  night: RoutineItem[];
  weekly: RoutineItem[];
  categories: Record<string, CategoriesItem[]>;
};

const typedDummyData = dummyData as RoutineData;


const OutcomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState<RoutineData | null>(null);
  const [isCategoryMode, setIsCategoryMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
const [categoryData, setCategoryData] = useState<CategoriesItem[]>([]);
const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);


  // Mobile Specific State
  const [mobileTab, setMobileTab] = useState<"morning" | "night">("morning");

  const handleCategoryClick = (cat: string) => {
    console.log("Clicked category:", cat);
    const isMobile = window.innerWidth < 768;


    // If clicking the same category → toggle OFF → return to routine
    if (isCategoryMode && activeCategory === cat) {
      setIsCategoryMode(false);
      setActiveCategory(null);
      setCategoryData([]);
      return;
    }

    const list = routine?.categories?.[cat] ?? [];



    // Ensure total 6 products (3 morning + 3 night)
  const padded: CategoriesItem[] = [...list];

if (!isMobile && padded.length > 0) {
  while (padded.length < 6) padded.push(list[0]);
}

setCategoryData(isMobile ? list : padded.slice(0, 6));
setActiveCategory(cat);
setIsCategoryMode(true);
  };


  const USE_DUMMY = true;

  useEffect(() => {
    if (USE_DUMMY) {
  setRoutine(typedDummyData);
  return;
}


    if (location.state?.routine) {
      setRoutine(location.state.routine);
      localStorage.setItem("routine", JSON.stringify(location.state.routine));
      return;
    }

    const saved = localStorage.getItem("routine");
    if (saved) {
      setRoutine(JSON.parse(saved));
      return;
    }

    navigate("/summary");
  }, []);

  // Loading state while reading localStorage
  if (!routine) {
    return <div className="text-center bg-black py-20 text-xl">Loading routine...</div>;
  }

  // --- LOGIC UPDATE: Determine which list to show in Mobile View ---
  // If Category Mode is active (icon clicked), show categoryData.
  // Otherwise, show the Morning or Night list based on the tab.
  const displayList = isCategoryMode 
    ? categoryData 
    : (mobileTab === "morning" ? routine.morning : routine.night);

    const getCategoryClass = (cat: string, baseHeight: string) =>
  `
    ${baseHeight}
    cursor-pointer
    transition-transform
    origin-bottom
    duration-300
    ${activeCategory === cat ? "scale-115" : "scale-100"}
  `;

  const getMobileCategoryClass = (cat: string, baseHeight: string) =>
  `
    ${baseHeight}
    cursor-pointer
    transition-transform
    origin-bottom
    duration-300
    ${activeCategory === cat ? "scale-125" : "scale-100"}
  `;

  return (
    <div>
      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block">
        <div className="min-h-screen bg-[linear-gradient(180deg,#E5D4FA_0%,#F0E4FF_12%,#FFFFFF_28%,#F3EAFF_48%,#FFFFFF_100%)]">
          <Header mode="dark" hideLogoTextDesktop={true} />

          <div className="pt-32 px-6 max-w-7xl mx-auto">
            <h1 className="font-garamond text-[54px] leading-[54px] text-center">
              Your Skincare Portfolio
            </h1>

            <p className="font-montserrat text-[20px] text-black/60 text-center mt-3 tracking-wider">
              Curated products for your skin type & goals
            </p>
          </div>

          {/* PRODUCT STRIP */}
          <div className="flex justify-center">
            <div className="relative bg-white border border-black/30 mt-16 w-[90%] h-[200px] ">
              <div className="flex items-end justify-center gap-8 h-full px-10 pt-8">
                <img
  src={img2}
  className={getCategoryClass("Cleanser", "h-[187px]")}
  onClick={() => handleCategoryClick("Cleanser")}
/>

               <img src={img3} className={getCategoryClass("Serum", "h-[134px]")} onClick={() => handleCategoryClick("Serum")} />
<img src={img4} className={getCategoryClass("Moisturiser", "h-[92px]")} onClick={() => handleCategoryClick("Moisturiser")} />
<img src={img6} className={getCategoryClass("Sunscreen", "h-[164px]")} onClick={() => handleCategoryClick("Sunscreen")} />
<img src={img7} className={getCategoryClass("Night Cream", "h-[85px]")} onClick={() => handleCategoryClick("Night Cream")} />
<img src={img8} className={getCategoryClass("Micellar Water", "h-[170px]")} onClick={() => handleCategoryClick("Micellar Water")} />
<img src={img9} className={getCategoryClass("Face Oil", "h-[152px]")} onClick={() => handleCategoryClick("Face Oil")} />
<img src={img10} className={getCategoryClass("Exfolliant", "h-[104px]")} onClick={() => handleCategoryClick("Exfolliant")} />
<img src={img11} className={getCategoryClass("Body Lotion", "h-[187px]")} onClick={() => handleCategoryClick("Body Lotion")} />

              </div>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black"></div>
            </div>
          </div>

          {/* MORNING SECTION */}
          <div className="bg-[#FCFCA2] border border-black/30 rounded-[12px] mt-10 max-w-[1406px] h-[191px] mx-auto flex items-center px-14 gap-10">
            <img src={img1} className="w-[160px]" />
            <div>
              <h2 className="font-garamond text-[32px] text-black">Morning Routine</h2>
              <p className="font-montserrat text-[18px] text-black/60 tracking-wider">
                Start your day with protection & glow
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center max-w-[1406px] mx-auto">
            {isCategoryMode
              ? categoryData.slice(0, 3).map((item, index) => (
                  <ProductCard
                  key={index}
                  
                  img={item.stores?.amazon?.image || item.stores?.image || "/placeholder.png"}
                  name={item.name}
                  prices={{
                    amazon: item.stores?.amazon,
                    flipkart: item.stores?.flipkart,
                    nykaa: item.stores?.nykaa,
                  }}
                />

                ))
              : routine.morning.map((item, index) => (
                 <ProductCard
                key={index}
                step={`Step ${index + 1}`}
                img={item.stores?.amazon?.image || item.stores?.image || "/placeholder.png"}
                name={item.name}
                prices={{
                  amazon: item.stores?.amazon,
                  flipkart: item.stores?.flipkart,
                  nykaa: item.stores?.nykaa,
                }}
/>

                ))}
          </div>

          {/* NIGHT SECTION */}
          <div className="bg-[#2511401A]/90 border border-black/30 rounded-[12px] mt-15 max-w-[1406px] h-[191px] mx-auto flex items-center px-14 gap-10">
            <img src={img12} className="w-[160px]" />
            <div>
              <h2 className="font-garamond text-[32px] text-black">Night Routine</h2>
              <p className="font-montserrat text-[18px] text-black/60 tracking-wider">
                Repair & renew while you sleep
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center max-w-[1406px] mx-auto">
            {isCategoryMode
              ? categoryData.slice(3, 6).map((item, index) => (
                  <ProductCard
                  key={index}
                  
                  img={item.stores?.amazon?.image || item.stores?.image || "/placeholder.png"}
                  name={item.name}
                  prices={{
                    amazon: item.stores?.amazon,
                    flipkart: item.stores?.flipkart,
                    nykaa: item.stores?.nykaa,
                  }}
                />

                ))
              : routine.night.map((item, index) => (
                 <ProductCard
                  key={index}
                  step={`Step ${index + 1}`}
                  img={item.stores?.amazon?.image || item.stores?.image || "/placeholder.png"}
                  name={item.name}
                  prices={{
                    amazon: item.stores?.amazon,
                    flipkart: item.stores?.flipkart,
                    nykaa: item.stores?.nykaa,
                  }}
                />

                ))}
          </div>

          {/* WEEKLY SECTION */}
          <div className="bg-[#FFE2DA] border border-black/30 rounded-[12px] mt-15 max-w-[1440px] h-[162px] mx-auto flex items-center px-14 gap-10">
            <img src={img13} className="w-[110px]" />
            <div>
              <h2 className="font-garamond text-[32px] text-black">Weekly Treatment</h2>
              <p className="font-montserrat text-[18px] text-black/60 tracking-wider">
                Rejuvenate your skin once a week for further results
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center max-w-[1406px] mx-auto">
            {routine.weekly.map((item, index) => (
              <ProductCard
              key={index}
              img={item.stores?.amazon?.image || item.stores?.image || "/placeholder.png"}
              name={item.name}
              prices={{
                amazon: item.stores?.amazon,
                flipkart: item.stores?.flipkart,
                nykaa: item.stores?.nykaa,
              }}
            />

            ))}
          </div>

          <div className="h-[150px]" />
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="block md:hidden min-h-screen w-full bg-white overflow-hidden">
        <Header mode="dark" mobileDark={true} hideLogoTextDesktop={true} />

        <div className="px-5 mt-22 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-2xl">
            {/* Simple Back Arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-garamond text-[26px] mx-auto pr-6">Your Skincare Portfolio</h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mt-8 px-4">
          <button
            onClick={() => {
              setMobileTab("morning");
              setIsCategoryMode(false); // Reset category filter
            }}
            className={`px-6 py-2 rounded-full border border-black text-sm font-medium transition-colors ${
              !isCategoryMode && mobileTab === "morning" ? "bg-[#FCFCA2] text-black" : "bg-white text-black/70"
            }`}
          >
            Morning Routine
          </button>
          <button
            onClick={() => {
              setMobileTab("night");
              setIsCategoryMode(false); // Reset category filter
            }}
            className={`px-6 py-2 rounded-full border border-black text-sm font-medium transition-colors ${
              !isCategoryMode && mobileTab === "night" ? "bg-[#2511401A] text-black" : "bg-white text-black/70"
            }`}
          >
            Night Routine
          </button>
        </div>

        {/* Icon Strip */}
        <div className="mt-8 pb-4 relative">
          <div className="flex items-end justify-center gap-3 h-full px-10 pt-8">
            <img src={img2} className={ getMobileCategoryClass("Cleanser","h-[52px]")} onClick={() => handleCategoryClick("Cleanser")} />
            <img src={img3} className={ getMobileCategoryClass("Serum","h-[39px]")} onClick={() => handleCategoryClick("Serum")} />
            <img src={img4} className={ getMobileCategoryClass("Moisturiser","h-[27px]")} onClick={() => handleCategoryClick("Moisturiser")} />
            <img src={img5} className="h-[38px] cursor-pointer" />
            <img src={img6} className={ getMobileCategoryClass("Sunscreen","h-[46px]")} onClick={() => handleCategoryClick("Sunscreen")} />
            <img src={img7} className={ getMobileCategoryClass("Night Cream","h-[25px]")} onClick={() => handleCategoryClick("Night Cream")} />
            <img src={img8} className={ getMobileCategoryClass("Micellar Water","h-[47px]")} onClick={() => handleCategoryClick("Micellar Water")} />
            <img src={img9} className={ getMobileCategoryClass("Face Oil","h-[43px]")} onClick={() => handleCategoryClick("Face Oil")} />
            <img src={img10} className={ getMobileCategoryClass("Exfolliant","h-[30px]")} onClick={() => handleCategoryClick("Exfolliant")} />
            <img src={img11} className={ getMobileCategoryClass("Body Lotion","h-[52px]")} onClick={() => handleCategoryClick("Body Lotion")} />
          </div>
          <div className="h-[2px] bg-black w-[90%] mx-auto"></div>
        </div>

        {/* Product List */}
        <div className="flex flex-col gap-6 px-5 mt-8 pb-20">
          {displayList.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              {/* Product Image */}
              <div className="w-[100px] h-[100px] bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                <img
                  src={item.stores?.amazon?.image || item.stores?.image}
                  alt={item.name}
                  className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-garamond text-[18px] leading-tight text-black">{item.name}</h3>
                <p className="font-montserrat text-xs text-black/50 mt-1">
                  {/* Handle Category Name: If category field is missing (common in categoryData), use activeCategory */}
                  {item.category || activeCategory}
                </p>

                {/* Price Buttons Row */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {/* Amazon */}
                  {item.stores?.amazon && (
                    <a
                      href={item.stores.amazon.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 border border-black/30 rounded-full px-2 py-1 bg-white"
                    >
                      <img src={amazon} className="w-4 h-4 " />
                      <span className="text-[10px] whitespace-nowrap">{item.stores.amazon.price}</span>
                    </a>
                  )}

                  {/* Flipkart */}
                  {item.stores?.flipkart && (
                    <a
                      href={item.stores.flipkart.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 border border-black/30 rounded-full px-2 py-1 bg-white"
                    >
                      <img src={flipkart} className="w-5 h-5" />
                      <span className="text-[10px] whitespace-nowrap">{item.stores.flipkart.price}</span>
                    </a>
                  )}

                  {/* Nykaa */}
                  {item.stores?.nykaa && (
                    <a
                      href={item.stores.nykaa.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 border border-black/30 rounded-full px-2 py-1 bg-white"
                    >
                      <img src={nykaa} className="w-4 h-4 " />
                      <span className="text-[10px] whitespace-nowrap">{item.stores.nykaa.price}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutcomePage;