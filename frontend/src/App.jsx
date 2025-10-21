import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import Allproducts from "./pages/Allproducts";
import ProductCategory from "./pages/ProductCategory";

const App = () => {
  const { showUserLogin } = useAppContext();
  const isSellerPath = useLocation().pathname.includes('seller');
  const location = useLocation();
  /* effect for aos animation */
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);
  useEffect(() => {
  AOS.refresh();
}, [location.pathname]);
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login/>:null}
      <Toaster/>
      <div className={`${isSellerPath ? '':'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Allproducts/>} />
          <Route path="/products/:category" element={<ProductCategory/>} />
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App