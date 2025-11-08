import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Share2, FileText, Loader2, CheckCircle2, Sparkles, HandHelping } from "lucide-react";

function AgenticActions() {
    const navigate = useNavigate();
    const [selectedAction, setSelectedAction] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [agentMessage, setAgentMessage] = useState("");

    const actions = [
        {
            id: "credit-card",
            title: "Apply for Credit Card",
            description: "Agent will analyze your credentials and apply to matching offers",
            icon: <CreditCard className="w-6 h-6" />,
            iconBg: "bg-blue-500",
            steps: [
                "Analyzing your KYC and income credentials...",
                "Searching for eligible credit card offers...",
                "Found 3 matching offers from partner banks",
                "Submitting application with verified credentials...",
                "Application submitted successfully!",
            ],
        },
        {
            id: "share-kyc",
            title: "Share KYC with Partner",
            description: "Securely share your verified credentials with trusted apps",
            icon: <Share2 className="w-6 h-6" />,
            iconBg: "bg-blue-500",
            steps: [
                "Verifying your identity credentials...",
                "Encrypting sensitive information...",
                "Establishing secure connection with partner...",
                "Sharing credentials with consent proof...",
                "KYC successfully shared!",
            ],
        },
        {
            id: "proof",
            title: "Generate Proof of Identity",
            description: "Create cryptographic proof without revealing full details",
            icon: <FileText className="w-6 h-6" />,
            iconBg: "bg-blue-500",
            steps: [
                "Accessing your verified credentials...",
                "Generating zero-knowledge proof...",
                "Creating cryptographic signature...",
                "Packaging proof for verification...",
                "Identity proof generated successfully!",
            ],
        },
    ];

    const handleActionSelect = async (actionId) => {
        const action = actions.find((a) => a.id === actionId);
        if (!action) return;

        setSelectedAction(actionId);
        setProcessing(true);
        setCompleted(false);

        // Simulate agent processing with messages
        for (let i = 0; i < action.steps.length; i++) {
            setAgentMessage(action.steps[i]);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        setProcessing(false);
        setCompleted(true);
    };

    const handleReset = () => {
        setSelectedAction(null);
        setProcessing(false);
        setCompleted(false);
        setAgentMessage("");
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-sky-50 p-4 md:p-6 lg:p-8">
            {/* Back Button */}
            <button 
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-8"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <HandHelping className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Agentic Actions</h1>
                    <p className="text-gray-600 text-lg mt-1">Intelligent agents acting on your behalf</p>
                </div>
            </div>

            {/* Show action cards or processing view */}
            {!selectedAction ? (
                /* Action Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                    {actions.map((action) => (
                        <div 
                            key={action.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
                            onClick={() => handleActionSelect(action.id)}
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 ${action.iconBg} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                {action.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {action.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-6">
                                {action.description}
                            </p>

                            {/* Start Action Button */}
                            <button 
                                className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                Start Action
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                /* Processing/Completed View */
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    {/* Card Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {actions.find((a) => a.id === selectedAction)?.title}
                        </h2>
                        <p className="text-gray-600">
                            Watch the agent work on your behalf
                        </p>
                    </div>

                    {/* Agent Processing Area */}
                    <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg p-8 min-h-[250px] flex flex-col items-center justify-center space-y-4 mb-6">
                        {processing && (
                            <>
                                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                                <p className="text-center text-gray-700 font-medium animate-pulse">
                                    {agentMessage}
                                </p>
                            </>
                        )}
                        {completed && (
                            <>
                                <CheckCircle2 className="w-16 h-16 text-green-600" />
                                <p className="text-center font-semibold text-lg text-gray-900">
                                    {agentMessage}
                                </p>
                                <p className="text-center text-sm text-gray-600">
                                    The agent has completed the action successfully
                                </p>
                            </>
                        )}
                    </div>

                    {/* Summary (only shown when completed) */}
                    {completed && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-gray-900">Action Summary</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Action Type</span>
                                    <span className="font-medium text-gray-900">
                                        {actions.find((a) => a.id === selectedAction)?.title}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className="text-green-600 font-medium">Completed</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-mono text-sm text-gray-700">
                                        0x{Math.random().toString(16).substr(2, 8)}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                >
                                    Try Another Action
                                </button>
                                <button
                                    onClick={handleBackToDashboard}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AgenticActions;