import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const onboarding = () => {
        navigate("/onboarding");
    }

    return (
        <div  className=" w-full h-screen bg-[url('/src/assets/image.png')] bg-size[800%_auto] bg-no-repeat animate-moveBg relative">
            <div className="fixed top-0 p-3 sm:p-4 w-full backdrop-blur-sm">
                <div className="flex justify-between items-center">
                    <img src="https://finternetlab.io/wp-content/uploads/2025/11/fnet-logo-black-768x195.png" className="h-6 md:h-12 lg:h-18 2xl:h-45 w-25 md:w-42 lg:w-65 2xl:w-140" alt="company logo name" />
                    <button onClick={onboarding} className="bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-amber-50 font-semibold rounded-xl shadow-lg shadow-sky-500/30  px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-4 lg:text-xl xl:px-10 xl:py-5 xl:text-2xl">
                        Get Started
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center h-full mt-8 md:mt-16 lg:mt-30 xl:mt-34">
                <div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl 2xl:text-9xl">Building</h1>
                </div>
                <div>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl 2xl:text-9xl text-blue-300">the Financial System</h2>
                </div>
                <div>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl 2xl:text-9xl text-blue-300">  for the future</h2>
                </div>

                <div className="m-8 text-center">
                    <p className="text-center lg:text-2xl md:pl-14 md:pr-14 lg:pl-20 lg:pr-20"> 
                        <span className="text-blue-400">The Finternet </span>
                        <span>is a universal digital infrastructure that interconnects financial ecosystems — empowering 8+ billion individuals and 300+ million businesses by placing them at the center of their financial lives.</span>
                    </p>
                </div>

                <div className="mx-2 my-6 flex justify-center">
                    <div className="bg-white/80 border border-blue-200 backdrop-blur-md shadow-2xl rounded-2xl p-6 flex flex-col items-center text-center max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl hover:scale-105 hover:shadow-blue-400/50">
                        <p className="mb-6 text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed">
                        Join the future of <span className="text-blue-500 font-semibold">verified digital identity</span> 
                        and unlock <span className="text-blue-500 font-semibold">autonomous financial actions.</span>
                        </p>

                        <button onClick={onboarding} className="bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/40 px-4 py-2 text-smsm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg lg:px-10 lg:py-5 lg:text-xl">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Home;