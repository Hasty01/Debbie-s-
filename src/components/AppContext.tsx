import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, UserAccount } from "../types";

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
  currentUser: UserAccount | null;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  loginUser: (email: string, role: "premium" | "business_owner") => Promise<boolean>;
  signupUser: (email: string, fullName: string, role: "premium" | "business_owner", phone?: string, businessName?: string) => Promise<boolean>;
  logoutUser: () => void;
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

  // Synchronized authenticated user states
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem("aera-current-user");
    return saved ? JSON.parse(saved) : null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Sync current user logic
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("aera-current-user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("aera-current-user");
    }
  }, [currentUser]);

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

  // Login handler
  const loginUser = async (email: string, role: "premium" | "business_owner"): Promise<boolean> => {
    const usersStr = localStorage.getItem("aera-registered-users");
    const users: UserAccount[] = usersStr ? JSON.parse(usersStr) : [];
    
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    
    if (foundUser) {
      setCurrentUser(foundUser);
      addToast(`Welcome back, ${foundUser.fullName}! Locked as ${foundUser.role === "premium" ? "Premium Member" : "Business Owner"}.`, "success");
      return true;
    } else {
      // Automatic quick mock onboarding for convenient demonstration
      if (email.toLowerCase() === "admin@debbiegarmets.com" || email.toLowerCase() === "owner@debbiegarmets.com") {
        const admin: UserAccount = {
          email: email.toLowerCase(),
          fullName: "Debbie Owner",
          role: "business_owner",
          phone: "+254700000000",
          businessName: "Debbie Garmets HQ"
        };
        const updatedUsers = [...users, admin];
        localStorage.setItem("aera-registered-users", JSON.stringify(updatedUsers));
        setCurrentUser(admin);
        addToast("Welcome back, Debbie (Business Owner)!", "success");
        return true;
      } else if (email.toLowerCase() === "premium@debbiegarmets.com") {
        const prem: UserAccount = {
          email: email.toLowerCase(),
          fullName: "Gold Member",
          role: "premium",
          phone: "+254711111111"
        };
        const updatedUsers = [...users, prem];
        localStorage.setItem("aera-registered-users", JSON.stringify(updatedUsers));
        setCurrentUser(prem);
        addToast("Welcome back, Premium Member!", "success");
        return true;
      }
      
      addToast("Account with this email & role not found. Please sign up!", "error");
      return false;
    }
  };

  // Signup handler
  const signupUser = async (
    email: string,
    fullName: string,
    role: "premium" | "business_owner",
    phone?: string,
    businessName?: string
  ): Promise<boolean> => {
    const usersStr = localStorage.getItem("aera-registered-users");
    const users: UserAccount[] = usersStr ? JSON.parse(usersStr) : [];
    
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (exists) {
      addToast("An account with this email/role already exists.", "error");
      return false;
    }

    const newUser: UserAccount = {
      email: email.toLowerCase(),
      fullName,
      role,
      phone,
      businessName,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("aera-registered-users", JSON.stringify(updatedUsers));
    setCurrentUser(newUser);
    addToast(`Account created successfully! Welcome, ${fullName}.`, "success");
    return true;
  };

  // Logout handler
  const logoutUser = () => {
    setCurrentUser(null);
    addToast("Logged out successfully.", "info");
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
        currentUser,
        authModalOpen,
        setAuthModalOpen,
        loginUser,
        signupUser,
        logoutUser,
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
