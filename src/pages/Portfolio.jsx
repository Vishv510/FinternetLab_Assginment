import { useContext } from "react";
import { Credential } from "../context/Credential";
import { motion } from "framer-motion";
import { Home, MapPin, DollarSign, PieChart, ArrowLeft, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Portfolio() {
  const { portfolio } = useContext(Credential);
  console.log(portfolio.name );
  console.log
  const navigate = useNavigate();

  // Calculate total investment value
  const totalValue = portfolio.reduce((sum, property) => {
    const numericValue = parseInt(property.value.replace(/[₹,]/g, "")) || 0;
    return sum + numericValue;
  }, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-blue-950 text-white flex flex-col items-center p-8">
      {/* Title */}
      <motion.h1
        className="text-3xl font-semibold bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Portfolio
      </motion.h1>

      {/* Summary Section */}
      {portfolio.length > 0 && (
        <motion.div
          className="mb-10 bg-slate-800/60 border border-slate-700 rounded-2xl p-6 text-center shadow-md max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-slate-400">Total Investment Value</p>
          <h2 className="text-2xl font-semibold text-green-400 mt-1">
            ₹{totalValue.toLocaleString("en-IN")}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Number of Properties: {portfolio.length}
          </p>
        </motion.div>
      )}

      {/* Empty Portfolio */}
      {portfolio.length === 0 ? (
        <motion.div
          className="text-slate-400 text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="mb-6">You haven’t purchased any property yet.</p>
          <button
            onClick={() => navigate("/property")}
            className="bg-linear-to-r from-blue-500 to-sky-400 text-black font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-sky-400/30 transition"
          >
            Explore Properties
          </button>
        </motion.div>
      ) : (
        // Portfolio Grid
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-full max-w-7xl">
          {portfolio.map((property, index) => (
            <motion.div
              key={property.id}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-md hover:shadow-blue-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Property Image */}
              {property.image && (
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent" />
                </div>
              )}

              {/* Property Details */}
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Home className="text-sky-400" size={20} />
                  {property.name}
                </h2>

                <p className="text-slate-400 flex items-center gap-2 text-sm">
                  <MapPin size={16} />
                  {property.location}
                </p>

                <p className="text-sky-400 flex items-center gap-2 text-sm">
                  <PieChart size={16} /> Ownership: {property.share}
                </p>

                <p className="text-green-400 font-medium flex items-center gap-2">
                  <IndianRupee />
                  {property.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Back to Properties Button */}
      {portfolio.length > 0 && (
        <motion.button
          onClick={() => navigate("/property")}
          className="mt-10 px-6 py-2 rounded-xl bg-linear-to-r from-blue-500 to-sky-400 hover:from-blue-400 hover:to-sky-300 text-black font-semibold shadow-md hover:shadow-sky-400/40 transition flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <ArrowLeft size={18} />
          Back to Properties
        </motion.button>
      )}
    </div>
  );
}

export default Portfolio;
