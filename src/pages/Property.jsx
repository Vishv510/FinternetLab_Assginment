import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, TrendingUp, CheckCircle2, Loader2 } from "lucide-react";
import { Credential } from "../context/Credential";

function PropertyMarketplace() {
    const navigate = useNavigate();
    const { addToPortfolio } = useContext(Credential);
    const { checkpoints } = useContext(Credential);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [purchasing, setPurchasing] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [tokenAmount, setTokenAmount] = useState(1);

    const hasEligibility = checkpoints.kyc && checkpoints.income;

    const handlePorperty = () => {
        navigate('/portfolio');
    }

    const properties = [
        {
            id: "1",
            name: "Mumbai Luxury Apartment",
            location: "Bandra West, Mumbai",
            totalValue: 50000000,
            tokenPrice: 50000,
            availableTokens: 800,
            totalTokens: 1000,
            expectedReturn: "8–12% annually",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        },
        {
            id: "2",
            name: "Bangalore Tech Hub Office",
            location: "Whitefield, Bangalore",
            totalValue: 75000000,
            tokenPrice: 75000,
            availableTokens: 600,
            totalTokens: 1000,
            expectedReturn: "10–15% annually",
            image: "https://plus.unsplash.com/premium_photo-1661883982941-50af7720a6ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        },
        {
            id: "3",
            name: "Delhi Premium Villa",
            location: "Golf Course Road, Gurgaon",
            totalValue: 100000000,
            tokenPrice: 100000,
            availableTokens: 450,
            totalTokens: 1000,
            expectedReturn: "12–18% annually",
            image: "https://images.unsplash.com/photo-1593714604578-d9e41b00c6c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        },
        {
            id: "4",
            name: "Pune Urban Loft",
            location: "Koregaon Park, Pune",
            totalValue: 42000000,
            tokenPrice: 42000,
            availableTokens: 900,
            totalTokens: 1000,
            expectedReturn: "7–10% annually",
            image: "https://plus.unsplash.com/premium_photo-1693493439354-0c64d4a49d67?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwaG9tZSUyMHVyYmFuJTIwbG9mdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        },
        {
            id: "5",
            name: "Hyderabad Green Tower",
            location: "Hitech City, Hyderabad",
            totalValue: 62000000,
            tokenPrice: 62000,
            availableTokens: 700,
            totalTokens: 1000,
            expectedReturn: "9–13% annually",
            image: "https://media.istockphoto.com/id/2239664102/photo/high-rise-residential-apartment-building-under-bright-blue-sky-in-city.webp?a=1&b=1&s=612x612&w=0&k=20&c=P4d-auIKBtLHWAM0bcKGRzebJJU-rsCRo9Ts-GQYguU=",
        },
        {
            id: "6",
            name: "Goa Beachfront Resort",
            location: "Candolim Beach, Goa",
            totalValue: 85000000,
            tokenPrice: 85000,
            availableTokens: 550,
            totalTokens: 1000,
            expectedReturn: "15–20% annually",
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
        },
    ];
    

    const handlePurchase = async () => {
        if (!selectedProperty || !hasEligibility) return;
        setPurchasing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setPurchasing(false);
        setPurchased(true);

        const newProperty = {
            id: Date.now(),
            name: selectedProperty.name,
            token: tokenAmount,
            share: `${((tokenAmount / selectedProperty.totalTokens) * 100).toFixed(2)}%`,
            value: `₹${(tokenAmount * selectedProperty.tokenPrice).toLocaleString("en-IN")}`,
            totalValue: selectedProperty.tokenValue,
            location: selectedProperty.location
        }

        addToPortfolio(newProperty);
        // alert("Property added to your portfolio!");
    };

    const handleBackToDashboard = () => navigate("/dashboard");

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 via-blue-50 to-white p-4 md:p-6 lg:p-8">
            {/* Back Button */}
            <button 
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm border border-gray-200 mb-8"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
            </button>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-md">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Property Marketplace
                        </h1>
                        <p className="text-gray-600 text-lg mt-1">Invest in verified tokenized real estate</p>
                    </div>
                </div>

                {!hasEligibility && (
                    <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                        Complete KYC + Income verification to purchase
                    </div>
                )}
            </div>

            {/* Property Cards */}
            {!selectedProperty ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div 
                            key={property.id}
                            className={`relative group bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                                hasEligibility ? 'cursor-pointer' : 'opacity-70 cursor-not-allowed'
                            }`}
                            onClick={() => hasEligibility && setSelectedProperty(property)}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={property.image}
                                    alt={property.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
                                <p className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                    <MapPin className="w-4 h-4 text-cyan-600" />
                                    {property.location}
                                </p>

                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Token Price</span>
                                        <span className="font-semibold text-gray-900">₹{property.tokenPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Available</span>
                                        <span className="font-semibold text-gray-900">
                                            {property.availableTokens}/{property.totalTokens}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 mt-2">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-medium">{property.expectedReturn}</span>
                                    </div>
                                </div>

                                <button 
                                    className={`mt-6 w-full py-3 rounded-lg font-semibold transition-colors ${
                                        hasEligibility 
                                            ? 'bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white' 
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                    disabled={!hasEligibility}
                                >
                                    {hasEligibility ? "View Details" : "Requires Verification"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                purchased ? (
                    /* Success View */
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
                        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase Successful!</h2>
                        <p className="text-gray-600 mb-6">
                            You now own {tokenAmount.toFixed(2)} tokens of {selectedProperty.name}
                        </p>
                       <div className="md:space-x-5">
                            <button
                                onClick={() => {
                                    setSelectedProperty(null);
                                    setPurchased(false);
                                }}
                                className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg"
                            >
                                Browse More Properties
                            </button>
                            <button onClick={handlePorperty} className="mt-6 text-gray-600 hover:text-gray-900 font-semibold border py-3 px-6 rounded-lg">
                                Port folio
                            </button>
                       </div>
                    </div>
                ) : (
                    /* Property Detail View */
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                        <img src={selectedProperty.image} alt={selectedProperty.name} className="w-full h-72 object-cover" />
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedProperty.name}</h2>
                            <p className="flex items-center gap-2 text-gray-600 mb-6">
                                <MapPin className="w-5 h-5 text-cyan-600" /> {selectedProperty.location}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Total Value:</strong> ₹{(selectedProperty.totalValue / 10000000).toFixed(1)}Cr</p>
                                    <p><strong>Token Price:</strong> ₹{selectedProperty.tokenPrice.toLocaleString()}</p>
                                    <p><strong>Available Tokens:</strong> {selectedProperty.availableTokens}/{selectedProperty.totalTokens}</p>
                                    <p><strong>Expected Return:</strong> <span className="text-green-600">{selectedProperty.expectedReturn}</span></p>
                                </div>

                                <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg p-6 space-y-4">
                                    <h3 className="font-semibold text-lg text-gray-900">Purchase Tokens</h3>
                                    <div className="flex items-center space-x-3 justify-between">
                                        <button onClick={() => setTokenAmount(Math.max(1, tokenAmount - 1))} className="w-10 h-10 bg-white border rounded-lg">-</button>
                                         <input
                                            type="number"
                                            value={tokenAmount}
                                            onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (!isNaN(value)) {
                                                // limit between 1 and available tokens
                                                setTokenAmount(Math.min(Math.max(1, value), selectedProperty.availableTokens));
                                            }
                                            }}
                                            className="w-40 text-center text-2xl font-semibold border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="1"
                                            max={selectedProperty.availableTokens}
                                        />
                                        <button onClick={() => setTokenAmount(Math.min(selectedProperty.availableTokens, tokenAmount + 1))} className="w-10 h-10 bg-white border rounded-lg">+</button>
                                    </div>
                                    <p className="text-center text-sm text-gray-600">({((tokenAmount)/selectedProperty.totalTokens * 100).toFixed(2)}% ownership)</p>
                                    <button
                                        onClick={handlePurchase}
                                        disabled={purchasing}
                                        className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
                                    >
                                        {purchasing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Confirm Purchase"}
                                    </button>
                                </div>
                            </div>

                            <button onClick={() => setSelectedProperty(null)} className="mt-6 text-gray-600 hover:text-gray-900 font-semibold flex justify-center items-center">
                                <ArrowLeft /> Back to Marketplace
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default PropertyMarketplace;
