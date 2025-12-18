import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";



interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencerName: string;
  paymentQr: string;
  calendlyLink: string;
}

const BookingModal = ({
  isOpen,
  onClose,
  influencerName,
  paymentQr,
    calendlyLink,
}: BookingModalProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
//   const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);


const handleBookingSubmit = () => {
  setSubmitted(true);
  setShowCalendly(true);
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={22} />
        </button>

        <h2 className="text-[28px] font-semibold">
          Book a Call with {influencerName}
        </h2>
                    {showCalendly  && (
            <div className="mt-8 h-[650px] rounded-xl overflow-hidden border">
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

            {/* <img src={paymentQr} className="h-24 mx-auto" 
            /> */}
{/* 
            <input type="file" onChange={(e) => setPaymentFile(e.target.files?.[0] || null)} /> */}

            <button
            onClick={handleBookingSubmit}
            disabled={!name || !location}
            className="w-full rounded-xl bg-[#FCFCA2] py-3 font-semibold cursor-pointer"
            >
            Proceed to Schedule
            </button>

          </div>
        
      </div>
    </div>
  );
};

export default BookingModal;
