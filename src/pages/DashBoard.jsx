import { useContext } from "react";
import { Credential } from "../context/Credential";
import { ArrowRight, Building2, CheckCircle, Dot, HandHelping, Notebook, NotepadText, Wallet, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashBoard() {
    const { userName, userId, checkpoints, setCheckpoints} = useContext(Credential);
    const navigate = useNavigate();

    const handleKYC = () => {
        setCheckpoints({
            ...checkpoints,
            kyc: !checkpoints.kyc
        });
    }

    const handleIncome = () => {
        setCheckpoints({
            ...checkpoints,
            income: !checkpoints.income
        });
    }

    const handleWallet = () => {
        setCheckpoints({
            ...checkpoints,
            wallet: !checkpoints.wallet
        });
    }

    const handleAgenticActions = () => {
        navigate('/agentic-actions');
    };

    const handlePropertyMarketplace = () => {
        if (checkpoints.kyc && checkpoints.income) {
            navigate('/property');
        } else {
            alert('Please complete KYC and Income verification first');
        }
    };

    const handleCrossBorderPayments = () => {
        if (checkpoints.kyc && checkpoints.wallet) {
            navigate('/payment');
        } else {
            alert('Please complete KYC and Wallet connection first');
        }
    };

    const handlePortfolio = () => {
        navigate('/portfolio');
    }

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="md:flex items-center justify-start">
                <div className="md:mb-8 mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Welcome, {userName || "userName"}
                    </h1>
                    <p className="text-gray-600 mt-1 md:text-2xl font-mono">
                        {`${userId}` || 'userId'}
                    </p>
                </div>
                <div className="mb-4 2xl:ml-290 xl:ml-226 lg:ml-122 md:ml-60">
                    <button className="border py-3 px-6 ml-3 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500  hover:from-blue-700 hover:to-cyan-600 text-white" onClick={handlePortfolio}>
                        Portfolio
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h1 className="text-xl font-blod text-gray-900 mb-1">
                            Your Identity
                        </h1>
                        <p className="text-sm text-gray-600 mb-6">
                            verified digital identity
                        </p>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                            <div>
                                <h2 className="text-gray-500 mb-1">Name</h2>
                                <h1 className="font-semibold text-gray-900 text-xl">{`${userName}` || 'username'}</h1>
                            </div>
                            <div>
                                <h2 className="text-gray-500 mb-1">User Address</h2>
                                <h1 className="font-mono text-xl text-blue-600">{`${userId}` || 'userid'}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                            Credentials
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Link verification to unlock features
                        </p>

                        <div className="space-y-3">
                            <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full" onClick={handleKYC}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span> <Notebook /> </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">KYC Verification</p>
                                        <p className="text-xs text-gray-500">Identity verification by finternet Labs</p>
                                    </div>
                                </div>
                                {checkpoints.kyc ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                ): (
                                    <XCircle className="w-5 h-5"/>
                                )}
                            </button>

                            <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full" onClick={handleIncome}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span> <NotepadText /> </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Income Verified</p>
                                        <p className="text-xs text-gray-500">Income proof verified</p>
                                    </div>
                                </div>
                                {checkpoints.income ? ( 
                                    <CheckCircle className="w-5 h-5 text-green-400"/>
                                ): (
                                    <XCircle className="w-5 h-5" />
                                )}
                            </button>
                            
                            <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full" onClick={handleWallet}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span> <Wallet /> </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Wallet Connected</p>
                                        <p className="text-xs text-gray-500">Crypto wallet linked</p>
                                    </div>
                                </div>
                                {checkpoints.wallet ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                    <XCircle className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text=gray-900 mb-6">
                        Available Actions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAgenticActions}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span> <HandHelping /> </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Agentic Action</h3>
                                        <p className="text-sm text-gray-600">Let intelligent agents act on your behalf</p>
                                    </div>
                                </div>
                                <span> <ArrowRight /></span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span> <Dot className="text-blue-500"/></span> Apply for credit cards
                                </li>
                                <li className="flex items-center gap-2">
                                    <span> <Dot className="text-blue-500"/></span> Share Credential securely
                                </li>
                                <li className="flex items-center gap-2">
                                    <span> <Dot className="text-blue-500"/> </span> Generate identity proofs
                                </li>
                            </ul>
                        </div>

                        <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handlePropertyMarketplace}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <span><Building2 /> </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Property Marketplace</h3>
                                            <p className="text-xs text-gray-600">Invest in tokenized real estate</p>
                                        </div>
                                    </div>
                                    <span> <ArrowRight /></span>
                                </div>

                                 <ul className="space-y-2 text-sm text-gray-700 mb-4">
                                    <li className="flex items-center gap-2">
                                        <span> <Dot className="text-blue-500"/></span> Brower tokenized properties
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span> <Dot className="text-blue-500"/></span> Fractional owership
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span> <Dot className="text-blue-500"/> </span> Manage your portfolio
                                    </li>
                                </ul>
                                {checkpoints.kyc && checkpoints.income ? (
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Eligible</span>
                                ): (
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Requires KYC + Income</span>
                                )}
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleCrossBorderPayments}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">✈️</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Cross-Border Payments</h3>
                                            <p className="text-xs text-gray-600">Send stablecoins globally with verified identity</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400"><ArrowRight /></span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-500"><Dot/></span> Instant global transfers
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-500"><Dot/></span> Auto currency conversion
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-500"><Dot/></span> Low transaction fees
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-500"><Dot/></span> Verified recipients
                                        </div>
                                    </div>
                                </div>
                                {checkpoints.kyc && checkpoints.wallet ? (
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"> Eligible</span>
                                ) : (
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Requires KYC + Wallet</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;