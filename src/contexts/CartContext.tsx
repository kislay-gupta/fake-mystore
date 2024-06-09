import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartProductProps } from "@/constant";

interface CartContextType {
  cart: CartProductProps[];
  addToCart: (product: CartProductProps) => void;
  handleQuantityChange: (productId: number, change: number) => void;
  removeFromCart: (productId: number) => void; // Add removeFromCart
  clearCart: () => void; // Add clearCart
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProductProps[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const syncCartToLocalStorage = (updatedCart: CartProductProps[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product: CartProductProps) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex > -1) {
        updatedCart[productIndex].quantity += 1;
      } else {
        const newProduct: CartProductProps = { ...product, quantity: 1 };
        updatedCart.push(newProduct);
      }

      syncCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const handleQuantityChange = (productId: number, change: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + change };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      syncCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      syncCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        handleQuantityChange,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
