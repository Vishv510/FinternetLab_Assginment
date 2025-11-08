import {BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./pages/Home"
import OnBoarding from "./pages/OnBoard"
import IdentityCard from "./pages/IdentityCardScreen"
import { CredentialProvider } from "./context/Credential"
import DashBoard from "./pages/DashBoard"
import Agentic from "./pages/AgenticAction"
import PropertyMarketplace from "./pages/Property"
import Portfolio from "./pages/Portfolio"
import CrossBorderPayments from "./pages/CrossBorderPayment"

function App() {
  return (
    <CredentialProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/onboarding' element={<OnBoarding/>} />
          <Route path='/verify_identity' element={<IdentityCard/>} />
  {/* Routing 2 way done 1: useNavigate Hook and 2: Link + button tag */}
          <Route path='/dashboard' element={<DashBoard/>} />
          <Route path='/agentic-actions' element={<Agentic/>} />
          <Route path='/property' element={<PropertyMarketplace/>} />
          <Route path='/portfolio' element={<Portfolio/>} /> 
          <Route path='/payment' element={<CrossBorderPayments/>} />
        </Routes>
      </Router>
    </CredentialProvider>
  )
}

export default App
