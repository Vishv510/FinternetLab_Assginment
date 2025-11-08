import { ArrowLeft, ArrowRight, Send, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Credential } from "../context/Credential";

const CrossBorderPayments = () => {
    const navigate = useNavigate();
    const { checkpoints } = useContext(Credential);
    const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success
    const [recipient, setRecipient] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const [amount, setAmount] = useState("");
    const [converting, setConverting] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [usdcAmount, setUsdcAmount] = useState(0);

    // Exchange rates
    const exchangeRates = {
        EUR: 1.08,
        INR: 0.012,
    };

    const eligible = checkpoints.wallet && checkpoints.kyc;

    // Calculate conversion whenever amount or currency changes
    useEffect(() => {
        if (amount && parseFloat(amount) > 0) {
            const numAmount = parseFloat(amount);
            setUsdcAmount(numAmount * exchangeRates[currency]);
        } else {
            setUsdcAmount(0);
        }
    }, [amount, currency]);

    // Calculate values
    const transactionFee = usdcAmount ? (usdcAmount * 0.001).toFixed(4) : "0.0000";
    const totalAmount = usdcAmount ? (usdcAmount - transactionFee).toFixed(4) : "0.0000";

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const handleContinue = () => {
        if (!eligible) {
            alert('Please complete KYC and Wallet verification first');
            return;
        }
        if (!recipient || !amount || parseFloat(amount) <= 0) {
            alert('Please fill in all fields with valid values');
            return;
        }
        // Move to confirmation screen
        setStep(2);
    };

    const handleConfirmAndSend = async () => {
        setProcessing(true);
        
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Generate transaction ID
        const txId = "0x" + Math.random().toString(16).substr(2, 16);
        setTransactionId(txId);
        
        setProcessing(false);
        setStep(3);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleReset = () => {
        setStep(1);
        setRecipient("");
        setAmount("");
        setUsdcAmount(0);
        setTransactionId("");
    };

    const handleRefreshRate = () => {
        setConverting(true);
        setTimeout(() => {
            setConverting(false);
        }, 500);
    };

    // Not Eligible Screen
    if (!eligible) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
                <button 
                    onClick={handleBackToDashboard}
                    className="flex items-center gap-2 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors mb-8 hover:bg-gray-100"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <Send className="w-10 h-10 text-red-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Verification Required</h2>
                            <p className="text-gray-600 text-lg">
                                Complete KYC and Wallet verification to access cross-border payments
                            </p>
                        </div>
                        <button
                            onClick={handleBackToDashboard}
                            className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            {/* Back Button */}
            <button 
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors mb-8 hover:bg-gray-100"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <Send className="w-8 h-8 text-gray-700" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Cross-Border Payments</h1>
                    <p className="text-gray-600 text-lg mt-1">Send stablecoins globally with instant settlement</p>
                </div>
            </div>

            {/* Step 1: Payment Form */}
            {step === 1 && (
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {/* Form Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Payment</h2>
                        <p className="text-gray-600">Enter recipient details and amount</p>
                    </div>

                    {/* Recipient Address */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Recipient Finternet Address
                        </label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="parnter@finternet"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                    </div>

                    {/* Currency and Amount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Currency Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Currency
                            </label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 cursor-pointer"
                            >
                                <option value="EUR">EUR (€)</option>
                                <option value="INR">INR (₹)</option>
                            </select>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Amount
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="1"
                                step="1"
                                min="0"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Conversion Details */}
                    {amount && parseFloat(amount) > 0 && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
                            {/* Conversion Header */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-600">Conversion</h3>
                                <button 
                                    onClick={handleRefreshRate}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <RefreshCw className={`w-4 h-4 ${converting ? 'animate-spin' : ''}`} />
                                </button>
                            </div>

                            {/* Conversion Display */}
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-bold text-gray-900">
                                    {amount} {currency}
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                                <div className="text-lg font-bold text-gray-900">
                                    {usdcAmount.toFixed(2)} USDC
                                </div>
                            </div>

                            {/* Exchange Rate */}
                            <p className="text-sm text-gray-600">
                                Rate: 1 {currency} = {exchangeRates[currency].toFixed(4)} USDC
                            </p>

                            {/* Transaction Fee */}
                            <div className="pt-4 border-t border-gray-200 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Transaction Fee</span>
                                    <span className="font-semibold text-gray-900">{transactionFee} USDC</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-gray-900">Total</span>
                                    <span className="font-bold text-gray-900 text-lg">{totalAmount} USDC</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        disabled={!recipient || !amount || parseFloat(amount) <= 0}
                        className={`w-full font-semibold py-4 px-6 rounded-lg transition-all ${
                            recipient && amount && parseFloat(amount) > 0
                                ? 'bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Continue
                    </button>
                </div>
            )}

            {/* Step 2: Confirmation Screen */}
            {step === 2 && (
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {/* Confirmation Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Transaction</h2>
                        <p className="text-gray-600">Review details before sending</p>
                    </div>

                    {/* Transaction Details */}
                    <div className="space-y-6 mb-8">
                        {/* Recipient */}
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Recipient</p>
                            <p className="text-lg font-mono font-semibold text-gray-900">{recipient}</p>
                        </div>

                        {/* You Send / They Receive */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">You Send</p>
                                <p className="text-2xl font-bold text-gray-900">{amount} {currency}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">They Receive</p>
                                <p className="text-2xl font-bold text-gray-900">{usdcAmount.toFixed(2)} USDC</p>
                            </div>
                        </div>

                        {/* Fee and Total */}
                        <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Transaction Fee</span>
                                <span className="font-semibold text-gray-900">{transactionFee} USDC</span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="font-bold text-gray-900 text-lg">Total Cost</span>
                                <span className="font-bold text-gray-900 text-xl">{totalAmount} USDC</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleConfirmAndSend}
                            disabled={processing}
                            className="flex-1 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Confirm & Send"
                            )}
                        </button>
                        <button
                            onClick={handleBack}
                            disabled={processing}
                            className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors border border-gray-300"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Success Screen */}
            {step === 3 && (
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* Success Icon */}
                        <CheckCircle2 className="w-20 h-20 text-green-600" />
                        
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Transaction Successful!</h2>
                            <p className="text-gray-600 text-lg">
                                Your payment has been sent to {recipient}
                            </p>
                        </div>

                        {/* Transaction Details */}
                        <div className="w-full bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg p-6 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount Sent</span>
                                <span className="font-semibold text-gray-900">{amount} {currency}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Converted to</span>
                                <span className="font-semibold text-gray-900">{usdcAmount.toFixed(2)} USDC</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Recipient</span>
                                <span className="font-mono text-sm text-gray-700">{recipient}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transaction Fee</span>
                                <span className="font-semibold text-gray-900">{transactionFee} USDC</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-200">
                                <span className="text-gray-600">Transaction ID</span>
                                <span className="font-mono text-sm text-gray-700">{transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status</span>
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                    Completed
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 w-full pt-4">
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Send Another Payment
                            </button>
                            <button
                                onClick={handleBackToDashboard}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrossBorderPayments;