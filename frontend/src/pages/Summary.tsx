import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import AnimatedLoadingScreen from "../components/AnimatedLoadingScreen.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Summary = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<any>(null);
  const [loading, setLoading] = useState(true); // used for both initial & API loading
  const [showAnimation, setShowAnimation] = useState(false); // controls animated screen

  // 1) FETCH USER ANSWERS
  useEffect(() => {
    const userId = localStorage.getItem("quiz_user_id");
    if (!userId) return;

    const fetchAnswers = async () => {
      const ref = doc(db, "quizResponses", userId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAnswers(snap.data());
      }

      setLoading(false);
    };

    fetchAnswers();
  }, []);

  // 2) Animated loading for initial fetch
  if (loading && !answers) {
    return (
      <AnimatedLoadingScreen
        autoAdvanceDelay={1100}
        onComplete={() => {
          // Once animation is done AND answers are fetched → show the summary UI
          setLoading(false);
        }}
      />
    );
  }

  // 3) HANDLE CONTINUE → run backend + show animated loader
  const handleContinue = async () => {
    if (!answers) return;

    const payload = {
      skinType: answers.q1_skinType,
      commitment: answers.q2_commitment,
      preference: answers.q3_preference,
      concern: answers.q4_concern,
    };

    // Show animated loader
    setShowAnimation(true);

    try {
      const res = await fetch(`${API_BASE_URL}/routine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert("Backend error: " + (err.detail || "Unknown error"));
        setShowAnimation(false);
        return;
      }

      const data = await res.json();

      // After animation finishes → navigate WITH data
      setTimeout(() => {
        navigate("/outcome", { state: { routine: data } });
      }, 200); // slight delay for smooth exit

    } catch (err) {
      alert("Something went wrong while generating routine.");
      setShowAnimation(false);
    }
  };

  // 4) Animated screen while generating routine
  if (showAnimation) {
    return (
      <AnimatedLoadingScreen
        autoAdvanceDelay={1100}
        onComplete={() => {
          // Navigation handled above after backend response
        }}
      />
    );
  }


  // 5) MAIN SUMMARY UI
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-[#0A0433] via-[#47126B] to-[#FE639C] p-10">
      <h1 className="text-4xl text-center font-bold mb-10">Review Your Answers</h1>

      <div className="max-w-2xl mx-auto space-y-6 bg-white/10 p-8 rounded-xl border border-white/20">
        <p className="text-lg sm:text-xl text-white">
          <strong>Skin Type:</strong> {answers?.q1_skinType || "Not selected"}
        </p>

        <p className="text-lg sm:text-xl text-white">
          <strong>Commitment Level:</strong> {answers?.q2_commitment || "Not selected"}
        </p>

        <p className="text-lg sm:text-xl text-white">
          <strong>Product Preference:</strong> {answers?.q3_preference || "Not selected"}
        </p>

        <p className="text-lg sm:text-xl text-white">
          <strong>Main Concern:</strong> {answers?.q4_concern || "Not selected"}
        </p>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleContinue}
          className="px-10 py-4 bg-white text-black text-lg sm:text-xl rounded-xl border border-black/40"
        >
          Continue to Your Skincare Plan →
        </button>
      </div>
    </div>
  );
};

export default Summary;
