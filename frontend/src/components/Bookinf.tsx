import pic  from "../assets/pic2.svg";
import { useNavigate } from "react-router-dom";
const Bookinf = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full bg-white py-[120px]">
      <div className="mx-auto max-w-[1526px] ">
        <div className="grid grid-cols-2 items-center gap-[50px]">
          
          

          {/* Left IMAGE PLACEHOLDER */}
          <div
            className="
              relative
              h-[515px]
              w-[550px]
              rounded-3xl
              bg-[#F7F7F7]
              flex items-center justify-center
              bg-white
            "
          >
            
            <span className="text-black/40 font-montserrat">
              <img src={pic} alt="" />
            </span>
          </div>
    
          <div className="max-w-[520px] text-right">
            {/* CTA Button */}
           
            <button
             onClick={()=>navigate("/booking")}
              className="
                mb-8
                rounded-full
                bg-[#FCFCA2]
                w-[364px]
                h-[93px]
                px-10 py-4
                font-montserrat
                text-[24px] font-semibold
                text-black
                border cursor-pointer
              "
            >
              Book a Call
            </button>

            {/* Heading */}
            <h2
             className="
                font-montserrat
                font-semibold
                text-[40px]
                leading-[1]
                tracking-normal
                text-black
                "

            >
             Real skin advice, from people who get it.
            </h2>

            {/* Description */}
            <p
            className="
            font-montserrat
            font-medium
            text-[28px]
            leading-[32px]
            tracking-normal
            text-black
            mt-[20px]
            "

            >
              Chat 1:1 with trusted skincare creators who’ve dealt with real skin issues and share what actually works for Indian skin
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Bookinf;
