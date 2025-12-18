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

const Index = () => {
  
  

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* HEADER */}
      <Header />


      <div className="flex justify-center mt-25">
    {/* PURPLE BG CONTAINER */}
        <div className="relative w-[1665px] max-w-full">
            <div className="absolute z-30 inset-0 hidden md:block pointer-events-none">
                <img src={pinkBottle} className="w-15 absolute top-[10px] left-12" />
                <img src={yello} className="w-20 absolute top-[-20px] right-124" />
                <img src={orange} className="w-[66.51015946628933px] absolute top-[50px] right-[-18px]" />
                <img src={yellowBottle} className="w-12 absolute bottom-[120px] left-0" />
                <img src={blueB} className="w-[38.7px] absolute bottom-[120px] right-10" />
            </div>
            {/* Background Image */}
            <img
            src={hero}
            alt="purple-bg"
            className="w-full h-[824px] object-cover rounded-3xl"
            />

            {/* Overlay Content – NOW RELATIVE TO PURPLE BG */}
            <div className="absolute inset-0 flex items-center justify-between px-">
            
            {/* LEFT TEXT BLOCK */}
            <div className="max-w-xl ml-[160px]">
               <img src={Infhead} alt="" />
                
                <div className="flex items-center gap-3 h-[91px] mt-[20px]">
                        <img
                            src={smallpf}
                            alt="users"
                            className="w-[104px] h-auto rounded-full"
                        />

                        <p className="font-montserrat font-medium text-[24px] text-black">
                            50+ Influencer
                        </p>
                        </div>

            </div>

                {/* RIGHT IMAGE BLOCK */}
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
       
       <DiscoverSection/>
      <QuizIntroSection/>
      <Bookinf/>
      <div className="py-20"></div>
      <Footer variant="landing"/>
    </div>
  );
};

export default Index;
