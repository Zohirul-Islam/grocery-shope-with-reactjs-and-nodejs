import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [searchQuary,setSearchQuary] = useState({})
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const currency = import.meta.VITE_CURRENCY;
  /* fetch products */
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };
  /* add product to cart */
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
      }
      console.log(cartData);
    setCartItems(cartData);
    toast.success("Add to Cart");
  };
  /* update cart item quantity */
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };
  /* remove product from cart */
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Remove from Cart");
        
        setCartItems(cartData);
}
  const value = {
    navigate,
      user,
    cartItems,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    updateCartItem,
      addToCart,
    removeFromCart,
    searchQuary,
    setSearchQuary
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
