import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NewAccVerify } from "./pages/verify/NewAccVerify";
import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Category from "./pages/category/Category";

function App() {
  return (
    <div className="">
      <Browser>
        <Routes>
          {/* public router */}
          <Route path="/" element={<LoginPage />} />
          <Route path="verify" element={<NewAccVerify />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* private router */}

          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
        </Routes>
      </Browser>
      <ToastContainer />
    </div>
  );
}

export default App;
