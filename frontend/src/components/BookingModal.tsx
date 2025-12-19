import { X } from "lucide-react";
import {  useState,useEffect } from "react";
import { InlineWidget } from "react-calendly";



interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencerName: string;
  calendlyLink: string;
}

const BookingModal = ({
  isOpen,
  onClose,
  influencerName,
    calendlyLink,
}: BookingModalProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
//   const [paymentFile, setPaymentFile] = useState<File | null>(null);

 
  const [showCalendly, setShowCalendly] = useState(false);

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    setShowCalendly(false);
    setName("");
    setLocation("");
  }

  return () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };
}, [isOpen]);





const handleBookingSubmit = () => {
  setShowCalendly(true);
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overscroll-contain">
      <div
  className="
    relative
    w-full
    max-w-xl
    rounded-2xl
    bg-white
    p-4 md:p-8
    shadow-2xl

    scale-[0.92] md:scale-100
    origin-center
  "
>
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={22} />
        </button>

        <h2 className={`font-semibold ${showCalendly ? "text-[22px]" : "text-[28px]"}`}>
          Book a Call with {influencerName}
        </h2>
                    {showCalendly  && (
                                <div
                      className="
                        mt-6
                        h-[520px] md:h-[650px]
                        rounded-xl
                        overflow-hidden
                        border

                        scale-[0.9] md:scale-100
                        origin-top
                      "
                    >

                <InlineWidget
                url={calendlyLink}
                styles={{ height: "100%", width: "100%" }}
                prefill={{
                    name,
                    location,
                }}
                pageSettings={{
                    hideLandingPageDetails: true,
                    hideEventTypeDetails: false,
                    primaryColor: "000000",
                }}
                />
            </div>
            )}

                {!showCalendly && (
      <div className="mt-6 space-y-5">
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          placeholder="Your Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        />

        <button
          onClick={handleBookingSubmit}
          disabled={!name || !location}
          className="w-full rounded-xl bg-[#FCFCA2] py-3 font-semibold cursor-pointer"
        >
          Proceed to Schedule
        </button>
      </div>
    )}



        
      </div>
    </div>
  );
};

export default BookingModal;
