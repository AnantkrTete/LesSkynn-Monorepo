import Header from "@/components/Header2";
import Footer from "@/components/Footer";
import rightgirl from "../assets/rightloda.svg";
import middlegirl from "../assets/leftcutie.svg";
import hero from "../assets/Purple_back.svg";
import smallpf from "../assets/100+.svg";
import pinkBottle from "../assets/pinkBottle.svg";
import yello from "../assets/yelo.svg";
import orange from "../assets/orangeCine.svg";
import yellowBottle from "../assets/yellobottle.svg";
import blueB from "../assets/bluebpot.svg";
import Infhead from "../assets/Talk to your favorite Skincare Influencer.svg";
import InfluencerCard from "@/components/InfluencerCard.tsx";
import { useState,useEffect } from "react";
import Infheadmobile from "../assets/Talk to your favorite Skincare Influencer mobile.svg"

import girlleft from "../assets/couple.svg"
type Influencer = {
  id: number;
  name: string;
  subtitle: string;
  avatar?: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  calendlyLink: string;
};


const DEFAULT_INFLUENCERS = [
  {
    id: 1,
    name: "Orlando Diggs",
    subtitle: "Simple routines. Real results.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    socials: {
      instagram: "https://instagram.com/orlandodiggs",
      twitter: "https://twitter.com/orlandodiggs",
      facebook: "https://facebook.com/orlandodiggs",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 2,
    name: "Aanya Sharma",
    subtitle: "Skincare that actually works.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    socials: {
      instagram: "https://instagram.com/aanyasharma",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 3,
    name: "Rohit Mehta",
    subtitle: "Science-backed skin advice.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    socials: {
      twitter: "https://twitter.com/rohitmehta",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    subtitle: "Healthy skin, simplified.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    socials: {
      instagram: "https://instagram.com/nehakapoor",
      facebook: "https://facebook.com/nehakapoor",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 5,
    name: "Kunal Verma",
    subtitle: "No fluff. Just results.",
    // avatar intentionally omitted → fallback will be used
    socials: {
      instagram: "https://instagram.com/kunalverma",
      twitter: "https://twitter.com/kunalverma",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 6,
    name: "Priya Nair",
    subtitle: "Indian skin. Real solutions.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: {},
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 7,
    name: "Arjun Singh",
    subtitle: "Minimal routines, maximum impact.",
    avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0",
    socials: {
      instagram: "https://instagram.com/arjunsingh",
      twitter: "https://twitter.com/arjunsingh",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 8,
    name: "Meera Iyer",
    subtitle: "Skin confidence starts here.",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b",
    socials: {
      facebook: "https://facebook.com/meeraiyer",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
  {
    id: 9,
    name: "Siddharth Rao",
    subtitle: "Practical skincare for daily life.",
    avatar: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: {
      instagram: "https://instagram.com/siddharthrao",
      twitter: "https://twitter.com/siddharthrao",
      facebook: "https://facebook.com/siddharthrao",
    },
    calendlyLink:"https://calendly.com/youcanhackitbro/30min",
  },
];


const Inf = () => {
  
const [showRegisterModal, setShowRegisterModal] = useState(false);
const [influencers, setInfluencers] = useState<Influencer[]>(() => {
  const saved = localStorage.getItem("influencers");
  return saved ? JSON.parse(saved) : DEFAULT_INFLUENCERS;
});


useEffect(() => {
  const handler = () => setShowRegisterModal(true);
  window.addEventListener("open-register-influencer", handler);
  return () =>
    window.removeEventListener("open-register-influencer", handler);
}, []);
useEffect(() => {
  localStorage.setItem("influencers", JSON.stringify(influencers));
}, [influencers]);


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* HEADER */}
      <Header />
        
        <div className="flex justify-center mt-25">
             
        {/* PURPLE BG CONTAINER */}
        <div className="relative hidden md:block w-[1665px] max-w-full">
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

                <p className="mt-5 font-montserrat font-normal text-[24px] leading-[1.25] text-black">
                Get personalized skincare advice from trusted influencers. Ask questions, build your routine, and achieve the skin of your dreams.
                </p>

                
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
                    

                    {/* MIDDLE MODEL (dominant) */}
                    <img
                        src={middlegirl}
                        alt="middlegirl"
                        className="
                        absolute
                        bottom-0
                        left-[120px]
                        w-[465px] h-[465px]
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
        Get personalized skincare advice from trusted influencers. Ask questions, build your routine, and achieve the skin of your dreams.
      </p>

      {/* Trust badge */}
      <div className="flex items-center gap-2 mt-3">
        <img
          src={smallpf}
          alt="users"
          className="w-[28px] h-auto rounded-full"
        />
        <p className="font-montserrat font-medium text-[9px] text-black">
          50+ Influencers
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


        <section className="w-full bg-white mb-[-90px] md:mb-[0px] md:py-24">
        <div className="max-w-[1246px] mx-auto ">
            {/* SECTION TITLE (optional, can add later) */}
            {/* <h2 className="text-center mb-16">Meet Our Influencers</h2> */}

            {/* GRID */}
            <div className="flex flex-cols justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-[30px] md:gap-x-30  gap-y-8 md:gap-y-34 py-[80px] mb-[160px]">
            {influencers.map((inf) => (
                <InfluencerCard
                key={inf.id}
                name={inf.name}
                subtitle={inf.subtitle}
                avatar={inf.avatar}
                socials={inf.socials}
                calendlyLink={inf.calendlyLink}
                />
            ))}
            </div>
            </div>
        </div>
        </section>


                {showRegisterModal && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-6 w-[80%] md:w-full max-w-md">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Register Influencer
      </h2>

      <input id="inf-name" placeholder="Name" className="w-full border px-3 py-2 mb-3 rounded-lg" />
      <input id="inf-subtitle" placeholder="Subtitle" className="w-full border px-3 py-2 mb-3 rounded-lg" />
      <input id="inf-avatar" placeholder="Avatar URL" className="w-full border px-3 py-2 mb-3 rounded-lg" />

      <input id="inf-instagram" placeholder="Instagram URL" className="w-full border px-3 py-2 mb-3 rounded-lg" />
      <input id="inf-twitter" placeholder="Twitter URL" className="w-full border px-3 py-2 mb-3 rounded-lg" />
      <input id="inf-facebook" placeholder="Facebook URL" className="w-full border px-3 py-2 mb-3 rounded-lg" />

      <input id="inf-calendly" placeholder="Calendly Link" className="w-full border px-3 py-2 mb-4 rounded-lg" />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowRegisterModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            const name = (document.getElementById("inf-name") as HTMLInputElement).value;
            const subtitle = (document.getElementById("inf-subtitle") as HTMLInputElement).value;
            const avatar = (document.getElementById("inf-avatar") as HTMLInputElement).value;
        
            const normalizeUrl = (url?: string) => {
            if (!url) return undefined;
            const trimmed = url.trim();
            if (!trimmed) return undefined;

            return trimmed.startsWith("http://") || trimmed.startsWith("https://")
                ? trimmed
                : `https://${trimmed}`;
            };


            const instagramRaw = (document.getElementById("inf-instagram") as HTMLInputElement).value;
            const twitterRaw = (document.getElementById("inf-twitter") as HTMLInputElement).value;
            const facebookRaw = (document.getElementById("inf-facebook") as HTMLInputElement).value;

            const instagram = normalizeUrl(instagramRaw);
            const twitter = normalizeUrl(twitterRaw);
            const facebook = normalizeUrl(facebookRaw);

            const calendlyLink = (document.getElementById("inf-calendly") as HTMLInputElement).value;

            setInfluencers((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    name,
                    subtitle,
                    avatar,
                    socials: {
                    ...(instagram && { instagram }),
                    ...(twitter && { twitter }),
                    ...(facebook && { facebook }),
                    },
                    calendlyLink,
                },
                ]);

            setShowRegisterModal(false);
          }}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Add Influencer
        </button>
      </div>
    </div>
  </div>
)}


      <Footer variant="landing" />
    </div>
  );
};

export default Inf;