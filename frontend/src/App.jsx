import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoleReset from "./utils/RoleReset";
import StartupCode from "./utils/StartupCode";
function App() {
  return (
    <div className="min-h-screen bg-white">
      <BrowserRouter>
        <StartupCode />
        <RoleReset /> 
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;