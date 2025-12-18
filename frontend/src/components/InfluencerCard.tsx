import { Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import pp from "../assets/avatar.svg";
import BookingModal from "./BookingModal.tsx";

type SocialLinks = {
  instagram?: string;
  twitter?: string;
  facebook?: string;
};

type InfluencerCardProps = {
  name?: string;
  subtitle?: string;
  avatar?: string ;
  socials?: SocialLinks;
  calendlyLink:string;
};

const DEFAULT_AVATAR = pp;

const InfluencerCard = ({
  name = "Orlando Diggs",
  subtitle = "Simple routines. Real results.",
  avatar,
  socials = {},
  calendlyLink,
}: InfluencerCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="
          w-[392px] h-[373px]
          flex flex-col items-center
          px-[40px] py-[32px]
          gap-[32px]
          rounded-[24px]
          bg-[linear-gradient(360deg,rgba(218,188,252,0.2)_0%,#FFFFFF_58.65%)]
          border border-black/10
          shadow-[0px_2px_6px_rgba(0,0,0,0.08)]
          transition-all duration-200 ease-out
          hover:shadow-[8px_8px_0px_#000]
          hover:-translate-x-[2px]
          hover:-translate-y-[2px]
        "
      >
        {/* Avatar */}
        <img
          src={avatar || DEFAULT_AVATAR}
          alt={name}
          className="w-[108px] h-[108px] rounded-full object-cover"
        />

        {/* Content */}
        <div className="w-[312px] flex flex-col items-center gap-[32px]">
          <div className="flex flex-col items-center gap-[8px]">
            <h3 className="font-montserrat font-semibold text-[20px] text-black text-center">
              {name}
            </h3>
            <p className="font-montserrat font-medium text-[16px] text-black/30 text-center">
              {subtitle}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-[29px]">
            {socials.instagram && (
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <Instagram className="w-[20px] h-[20px]" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noreferrer">
                <Twitter className="w-[24px] h-[20px]" />
              </a>
            )}
            {socials.facebook && (
              <a href={socials.facebook} target="_blank" rel="noreferrer">
                <Facebook className="w-[20px] h-[20px]" />
              </a>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => setOpen(true)}
            className="
              w-[126px] h-[40px]
              flex items-center justify-center
              rounded-[24px]
              bg-[#FCFCA2]
              border border-black
              font-montserrat font-semibold
              text-[16px]
            "
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal */}
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        influencerName={name}
        calendlyLink={calendlyLink}
        paymentQr="/qr.png"
      />
    </>
  );
};

export default InfluencerCard;
