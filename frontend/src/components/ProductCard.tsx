import amazon from "../assets/amazon.png";
import flipkart from "../assets/flipkart.png";
import nykaa from "../assets/nykaa.svg";

const CATEGORY_KEYWORDS = [
  "Cleanser",
  "Face Wash",
  "Moisturiser",
  "Moisturizer",
  "Serum",
  "Sunscreen",
  "Night Cream",
  "Face Oil",
  "Exfoliant",
  "Exfolliant",
  "Body Lotion",
  "Micellar Water",
  "Face Pack",
  "Mask",
  "Scrub",
];

const ProductCard = ({
  step,
  img,
  name,
  prices,
}: {
  step?: string; // ✅ OPTIONAL
  img: string;
  name: string;
  prices: {
    amazon?: any | null;
    flipkart?: any | null;
    nykaa?: any | null;
  };
}) => {
  /* ---------- BRAND = FIRST WORD ---------- */
  const brand = name.split(" ")[0];

  /* ---------- CLEAN PRODUCT NAME ---------- */
  const getCleanName = () => {
    let clean = name.replace(new RegExp(`^${brand}\\s+`, "i"), "");

    for (const key of CATEGORY_KEYWORDS) {
      const idx = clean.toLowerCase().indexOf(key.toLowerCase());
      if (idx !== -1) {
        clean = clean.slice(0, idx + key.length);
        break;
      }
    }

    return clean.trim();
  };

  const displayName = getCleanName();

  /* ---------- STORE BUTTON ---------- */
  const renderStoreButton = (store: any, logo: string, alt: string) => {
    if (!store || !store.price || !store.url) return null;

    return (
      <a
        href={store.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 border border-black/20 rounded-lg px-4 py-2 min-w-[110px] hover:bg-black/5 transition"
      >
        <img src={logo} alt={alt} className="w-4 h-4" />
        <span>{store.price}</span>
      </a>
    );
  };

  return (
    <div className="w-[330px] bg-white rounded-2xl shadow-md border border-[#E0E0E0] p-5 flex flex-col gap-5">

      {/* STEP (only when provided) */}
      {step && (
        <span className="text-sm font-montserrat text-black/60">
          {step}
        </span>
      )}

      {/* PRODUCT IMAGE */}
      <img
        src={img}
        alt={displayName}
        className="w-full h-[170px] object-contain mx-auto"
      />

      {/* TEXT */}
      <div>
        <p className="font-montserrat text-[16px] text-black font-medium leading-[24px] line-clamp-2">
          {displayName}
        </p>

        <p className="font-montserrat text-[15px] text-black/60 mt-2">
          {brand}
        </p>
      </div>

      {/* PRICES */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {renderStoreButton(prices.amazon, amazon, "Amazon")}
        {renderStoreButton(prices.flipkart, flipkart, "Flipkart")}
        {renderStoreButton(prices.nykaa, nykaa, "Nykaa")}
      </div>
    </div>
  );
};

export default ProductCard;
