import { motion } from "framer-motion";
import { CheckCircle2, User } from "lucide-react";
import { useContext } from "react";
import { Credential } from "../context/Credential";
import { useNavigate } from "react-router-dom";

function IdentityCard() {
  const { userName, userId } = useContext(Credential);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-linear-to-br from-slate-950 via-sky-950 to-slate-900">
      {/* Animated floating blobs background */}
      <motion.div
        className="absolute w-96 h-96 bg-sky-600/30 rounded-full blur-3xl top-10 left-[-100px]"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-[-100px]"
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Container */}
      <motion.div
        className="max-w-md w-full space-y-8 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-lg" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-center text-2xl md:text-3xl font-semibold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Identity Created Successfully!
        </motion.h1>

        {/* Identity Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-sky-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-60" />
          <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent rounded-3xl"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />

            {/* Card Content */}
            <div className="space-y-6 relative">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-linear-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                  <User className="w-12 h-12 text-white drop-shadow-md" />
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4 text-center">
                <div>
                  <p className="text-slate-400 text-sm">Name</p>
                  <p className="text-white text-xl font-medium tracking-wide">
                    {userName}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Finternet ID</p>
                  <p className="text-sky-400 font-mono text-lg">{userId}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-2xl bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue to Credential Verification
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default IdentityCard;
