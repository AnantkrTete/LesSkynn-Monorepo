import Header from "@/components/Header2";
import leftgirl from "../assets/leftgirl.svg"
import rightgirl from "../assets/rightGirl.svg"
import middlegirl from "../assets/middlegirl.svg"
import hero from "../assets/Purple_back.svg"
import Footer from "@/components/Footer";
import smallpf from "../assets/100+.svg";
import pinkBottle from "../assets/pinkBottle.svg";
import yello from "../assets/yelo.svg";
import orange from "../assets/orangeCine.svg";
import yellowBottle from "../assets/yellobottle.svg";
import blueB from "../assets/bluebpot.svg";
import Infhead from "../assets/Frame 414.png";
import DiscoverSection from "@/components/Discover";
import QuizIntroSection from "@/components/QuizIntroSection"
import Bookinf from "@/components/Bookinf";
import Infheadmobile from "../assets/Infhead_mobile.svg";
import girlleft from "../assets/GirlsMobile.svg";

const Index = () => {
  
  

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* HEADER */}
      <Header />


      <div className=" flex justify-center mt-25">
    {/* PURPLE BG CONTAINER */}
        <div className="hidden md:block relative w-[1665px] max-w-full">
            <div className="absolute z-30 inset-0 hidden md:block pointer-events-none">
                <img src={pinkBottle} className="w-15 absolute top-[10px] left-12" />
                <img src={yello} className="w-20 absolute top-[-20px] right-124" />
                <img src={orange} className="w-[66.51015946628933px] absolute top-[50px] right-[-18px]" />
                <img src={yellowBottle} className="w-12 absolute bottom-[120px] left-0" />
                <img src={blueB} className="w-[38.7px] absolute bottom-[120px] right-10" />
            </div>
            {/* Background Image */}
            <div className="flex justify-center">
                <img
                src={hero}
                alt="purple-bg"
                className="w-[355px] md:w-full h-[301px] md:h-[824px] object-cover rounded-3xl"
                />
            </div>

            {/* Overlay Content – NOW RELATIVE TO PURPLE BG */}
            <div className="absolute inset-0 flex items-center justify-between px-">
            
            {/* LEFT TEXT BLOCK */}
            <div className="max-w-xl ml-[160px]">
               <img src={Infhead} alt="text" className="hidden md:block"/>
               
                <div className="flex items-center gap-3 h-[91px] mt-[20px]">
                        
                        <img
                            src={smallpf}
                            alt="users"
                            className="w-[104px] h-auto rounded-full"
                        />

                        <p className="font-montserrat font-medium text-[24px] text-black">
                            100+ users trust LesSkyn
                        </p>
                </div>

            </div>

                {/* RIGHT IMAGE BLOCK */}
                                    
                    <div className="relative w-[995px] h-[415px] flex items-center justify-center">

                        <div className="relative ml-20 w-full h-full overflow-hidden
                  [mask-image:linear-gradient(to_top,transparent_0%,black_35%,black_100%)]
                  [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_35%,black_100%)]">
                                  {/* LEFT MODEL */}
                    
                    <img
                        src={leftgirl}
                        alt="middlegirl"
                        className="
                        absolute
                        bottom-0
                        left-[-70px]
                        w-[415px] h-[415px]
                        z-10
                        "
                    />
                    {/* MIDDLE MODEL (dominant) */}
                    <img
                        src={middlegirl}
                        alt="middlegirl"
                        className="
                        absolute
                        bottom-0
                        left-[180px]
                        w-[445px] h-[425px]
                        z-10
                        "
                    />

                    {/* RIGHT MODEL */}
                    <img
                        src={rightgirl}
                        alt="rightgirl"
                        className="
                        absolute
                        bottom-0
                        left-[450px]
                        w-[415px] h-[415px]
                        z-10
                        "
                    />
                        </div>
    
                    </div>

            
            

            </div>
        </div>    
    </div>

    <div className="block md:hidden flex justify-center mt-[-10px]">
  <div className="relative w-[355px]">
    
    {/* Purple background */}
    <img
      src={hero}
      alt="purple-bg"
      className="w-full h-[301px] object-cover rounded-3xl"
    />

    {/* Overlay */}
    <div className="absolute inset-0 flex flex-col items-center px-4 pt-6 text-center">

      {/* Heading */}
      <img
        src={Infheadmobile}
        alt="heading"
        className="h-[49px] mb-5"
      />

      {/* Description */}
      <p className="text-[8px] font-montserrat text-black leading-tight max-w-[285px]">
        Answer a few smart questions and get a personalized skincare routine
        and product picks tailored to your skin, lifestyle, and goals.
      </p>

      {/* Trust badge */}
      <div className="flex items-center gap-2 mt-3">
        <img
          src={smallpf}
          alt="users"
          className="w-[28px] h-auto rounded-full"
        />
        <p className="font-montserrat font-medium text-[9px] text-black">
          100+ users trust LesSkyn
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Girls image */}
      <img
        src={girlleft}
        alt="models"
        className=" object-contain mt-2 py-4"
      />
    </div>
  </div>
    </div>

       
       <DiscoverSection/>
      <QuizIntroSection/>
      <Bookinf/>
      <div className="py-12 md:py-20"></div>
      <Footer variant="landing"/>
    </div>
  );
};

export default Index;
