import "./App.css";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar/Navbar";

import { Route, Router,Routes } from "react-router-dom";
import SignupPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import Product from "./pages/product/product";
import Admin from "./pages/Admin/admin";
import { AuthProvider } from "./pages/private";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
         
        </Routes>
      <AuthProvider>
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
