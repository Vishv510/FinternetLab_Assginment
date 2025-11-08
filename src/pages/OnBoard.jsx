import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Credential } from "../context/Credential";

function OnBoarding() {
  const { setUserName, setUserId} = useContext(Credential);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(fullName);
    setUserId(address + '@finternet')
    navigate('/verify_identity')
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-sky-100 via-cyan-200 to-blue-100">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 space-y-8"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://finternetlab.io/wp-content/uploads/2025/08/Favicon-New.svg"
            alt="Finternet Logo"
            className="h-16 w-auto drop-shadow-xl"
          />
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-linear-to-r from-sky-600 via-blue-700 to-blue-700 bg-clip-text text-transparent">
            Welcome to Finternet
          </h1>
          <p className="text-slate-600 text-sm tracking-wide">
            Your Intelligent Financial Network
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/80 text-slate-700 placeholder-slate-500 rounded-xl px-4 py-3 border border-slate-300 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Address */}
            <div className="relative">
              <input
                type="text"
                placeholder="Choose Address"
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                  )
                }
                className="w-full bg-white/80 text-slate-700 placeholder-slate-500 rounded-xl px-4 py-3 border border-slate-300 focus:ring-2 focus:ring-sky-400 focus:outline-none pr-20 transition-all duration-300"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none">
                @finternet
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!fullName || !address}
            className={`w-full py-3 rounded-xl font-semibold text-white tracking-wide shadow-lg transition-all duration-300 ${
              !fullName || !address
                ? "bg-linear-to-r from-sky-400 to-cyan-500 opacity-60 cursor-not-allowed"
                : "bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sky-500/30"
            }`}
          >
            Create My Finternet Identity
          </motion.button>

          <p className="text-center text-slate-500 text-sm">
            Your digital identity. Privately owned.
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default OnBoarding;
