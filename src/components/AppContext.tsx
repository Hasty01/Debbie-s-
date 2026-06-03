import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "../types";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: { name: string; hex: string }) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  activeQuickViewProduct: Product | null;
  setActiveQuickViewProduct: (product: Product | null) => void;
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme dark/light state
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aera-theme");
      if (saved === "light" || saved === "dark") return saved;
      return "dark"; // Default to Sophisticated Dark
    }
    return "dark";
  });

  // Local-persisted cart & wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("aera-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("aera-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // UI modal toggles
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Floating toasts state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Apply deep dark theme to the HTML root tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("aera-theme", theme);
  }, [theme]);

  // Persist cart changes
  useEffect(() => {
    localStorage.setItem("aera-cart", JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist changes
  useEffect(() => {
    localStorage.setItem("aera-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    addToast(`Switched to ${theme === "light" ? "Dark" : "Light"} Mode`, "info");
  };

  const addToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    quantity: number,
    size: string,
    color: { name: string; hex: string }
  ) => {
    setCart((prevCart) => {
      // Find matching item in cart (matching product, size and color)
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        addToast(`Updated quantity of ${product.name} in cart`, "success");
        return updated;
      }

      addToast(`Added ${product.name} to your cart`, "success");
      return [...prevCart, { product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (index: number) => {
    const removedItemName = cart[index]?.product.name || "item";
    setCart((prev) => prev.filter((_, i) => i !== index));
    addToast(`Removed ${removedItemName} from cart`, "info");
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    addToast("Your cart has been cleared", "info");
  };

  const toggleWishlist = (product: Product) => {
    const isExist = wishlist.some((item) => item.id === product.id);
    if (isExist) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed ${product.name} from Wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved ${product.name} to Wishlist`, "success");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchOpen,
        setSearchOpen,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        activeQuickViewProduct,
        setActiveQuickViewProduct,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
