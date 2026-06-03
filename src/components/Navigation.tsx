import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  Trash2,
  ChevronRight,
  Sparkles,
  Info
} from "lucide-react";

export const Navigation: React.FC = () => {
  const {
    theme,
    toggleTheme,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    wishlist,
    toggleWishlist,
    searchOpen,
    setSearchOpen,
    cartOpen,
    setCartOpen,
    wishlistOpen,
    setWishlistOpen,
    setActiveQuickViewProduct,
    addToast,
    currentUser,
    loginUser,
    signupUser,
    logoutUser,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  
  // User Account Simulated State
  const [accountOpen, setAccountOpen] = useState(false);
  
  // Simulated authentication form states
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [authRole, setAuthRole] = useState<"premium" | "business_owner">("premium");
  const [authEmail, setAuthEmail] = useState("");
  const [authFullName, setAuthFullName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authBusinessName, setAuthBusinessName] = useState("");

  // Shipping & Checkout states
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("+254711111111");
  const [shippingAddress, setShippingAddress] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("+254700000000");
  const [ownerEmail, setOwnerEmail] = useState("owner@debbiegarmets.com");
  const [generatedRef, setGeneratedRef] = useState("");

  useEffect(() => {
    if (currentUser) {
      setShippingName(currentUser.fullName);
      if (currentUser.phone) {
        setShippingPhone(currentUser.phone);
      }
    } else {
      setShippingName("Marcus Aurelios");
      setShippingPhone("+254711111111");
    }
    setShippingAddress("Villa Augusta, Via del Corso 24, Rome, IT");
  }, [currentUser]);

  // Track page scroll to apply blur background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products for immediate search results
  const searchResults = searchQuery
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Calculate cart cost stats
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCharge = cartSubtotal > 1000 ? 0 : 45;
  const cartTotal = cartSubtotal + shippingCharge;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRef(ref);

    // Save order details to persistent queue log so Business Owner can view synced orders
    const savedOrdersStr = localStorage.getItem("aera-simulated-orders");
    const savedOrders = savedOrdersStr ? JSON.parse(savedOrdersStr) : [];
    const newOrder = {
      id: ref,
      buyerName: shippingName,
      buyerEmail: currentUser?.email || "guest@debbiegarmets.com",
      buyerRole: currentUser?.role || "guest",
      buyerPhone: shippingPhone,
      items: cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor.name,
        price: item.product.price
      })),
      total: cartTotal,
      address: shippingAddress,
      date: new Date().toLocaleDateString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    
    localStorage.setItem("aera-simulated-orders", JSON.stringify([newOrder, ...savedOrders]));

    // Directly trigger WhatsApp checkout using the new ref
    const text = encodeURIComponent(getSimulatedMessageText(ref));
    const cleanPhone = ownerPhone.replace(/[+\s-]/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
    addToast(`Order ${ref} created! Secure WhatsApp checkout launched.`, "success");

    setCheckoutComplete(true);
  };

  const getSimulatedMessageText = (referenceOverride?: string) => {
    const itemsText = cart.map(item => `• ${item.quantity}x ${item.product.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor.name}) - KSh ${(item.product.price * item.quantity).toLocaleString()}`).join("\n");
    const refToUse = referenceOverride || generatedRef || "AE-PENDING";
    
    return `Atelier Debbie Garments Couture Order Appraised - Ref: ${refToUse}

Buyer Details:
- Name: ${shippingName}
- Contact Phone: ${shippingPhone}
- Status: ${currentUser ? (currentUser.role === "premium" ? "👑 Premium Member" : "💼 Business Owner") : "Guest User"}
- Member Email: ${currentUser?.email || "Guest"}

Appraised Order Items:
${itemsText}

Subtotal: KSh ${cartSubtotal.toLocaleString()}
Delivery Service: Complimentary
Total Amount: KSh ${cartTotal.toLocaleString()}

Delivery Courier Address:
${shippingAddress}

Regards,
Debbie Garments Atelier System`;
  };

  const triggerWhatsApp = () => {
    const text = encodeURIComponent(getSimulatedMessageText());
    const cleanPhone = ownerPhone.replace(/[+\s-]/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
    addToast("Initiating secure WhatsApp order transmission...", "success");
  };

  const triggerEmail = () => {
    const body = encodeURIComponent(getSimulatedMessageText());
    const subject = encodeURIComponent(`Atelier Couture Order ${generatedRef} - ${shippingName}`);
    window.open(`mailto:${ownerEmail}?subject=${subject}&body=${body}`, "_blank");
    addToast("Initiating design desk secure email draft...", "success");
  };

  const closeCheckoutFlow = () => {
    setCheckoutComplete(false);
    setCartOpen(false);
  };

  const jumpToSection = (selector: string) => {
    setMobileMenuOpen(false);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(selector, { duration: 1.5 });
    } else {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Sticky Top Header */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 font-sans ${
          scrolled
            ? "glass-nav border-b border-zinc-200 dark:border-white/10 py-4 shadow-sm backdrop-blur-md bg-white/85 dark:bg-matte-black/85 text-zinc-900 dark:text-[#F5F5F5]"
            : "bg-transparent py-6 text-zinc-800 dark:text-[#F5F5F5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Menu Hamburger - Left (Desktop & Mobile trigger) */}
          <div className="flex items-center gap-6">
            <button
               onClick={() => setMobileMenuOpen(true)}
               aria-label="Toggle menu"
               className="text-luxury-champagne hover:opacity-80 p-1.5 transition-colors cursor-none"
            >
              <Menu className="w-5 h-5 md:w-6 h-6" />
            </button>
            
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase">
              <button onClick={() => jumpToSection("#collections")} className="text-luxury-champagne hover:opacity-80 transition-colors cursor-none">Atelier</button>
              <button onClick={() => jumpToSection("#lookbook")} className="text-luxury-champagne hover:opacity-80 transition-colors cursor-none">Lookbook</button>
              <button onClick={() => jumpToSection("#about")} className="text-luxury-champagne hover:opacity-80 transition-colors cursor-none">Story</button>
            </nav>
          </div>

          {/* Centered Brand Luxury Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span
              onClick={() => {
                const lenis = (window as any).lenis;
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1.5 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-serif text-lg md:text-2xl font-light tracking-[0.2em] cursor-none hover:opacity-85 transition-opacity uppercase text-luxury-champagne"
            >
              Debbie Garmets
            </span>
            <span className="hidden md:inline text-[8px] font-mono tracking-[0.4em] uppercase text-luxury-champagne -mt-0.5">
              atelier
            </span>
          </div>

          {/* Action Icons - Right */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-luxury-champagne hover:opacity-80 transition-colors cursor-none"
              title="Search collection"
            >
              <Search className="w-4 h-4 md:w-5 h-5" />
            </button>

            {/* Profile Trigger */}
            <button
              onClick={() => setAccountOpen(true)}
              className="hidden sm:inline text-xs font-mono tracking-wider text-luxury-champagne hover:opacity-80 cursor-none max-w-[120px] truncate"
            >
              {currentUser ? `👑 ${currentUser.fullName.split(" ")[0]}` : "Membership"}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-luxury-champagne hover:opacity-80 transition-colors cursor-none"
              title="Change atmosphere"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 md:w-5 h-5" /> : <Moon className="w-4 h-4 md:w-5 h-5" />}
            </button>

            {/* Wishlist Toggle */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="p-1.5 text-luxury-champagne hover:opacity-80 transition-colors relative cursor-none"
              title="View wishlist"
            >
              <Heart className="w-4 h-4 md:w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-luxury-champagne text-zinc-950 text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-1.5 text-luxury-champagne hover:opacity-80 transition-colors relative cursor-none"
              title="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-luxury-champagne text-zinc-950 text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center border border-zinc-950">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==================== SCREEN OVERLAYS & DRAWER MENU SYSTEMS ==================== */}

      {/* 1. ULTRA-MINIMAL FULLSCREEN SIDEBAR MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 dark:bg-zinc-950/80 backdrop-blur-md flex justify-start"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white dark:bg-matte-black h-full p-8 flex flex-col justify-between border-r border-zinc-200 dark:border-white/10 shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="font-serif tracking-[0.2em] text-xl text-zinc-950 dark:text-white uppercase">
                    Debbie Garmets
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-none"
                  >
                    <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-2xl font-serif font-light text-zinc-800 dark:text-[#F5F5F5]">
                  <button
                    onClick={() => jumpToSection("#collections")}
                    className="text-left py-2 hover:translate-x-2 hover:text-luxury-champagne transition-all cursor-none"
                  >
                    Atelier Collection
                  </button>
                  <button
                    onClick={() => jumpToSection("#lookbook")}
                    className="text-left py-2 hover:translate-x-2 hover:text-luxury-champagne transition-all cursor-none"
                  >
                    Editorial Lookbook
                  </button>
                  <button
                    onClick={() => jumpToSection("#about")}
                    className="text-left py-2 hover:translate-x-2 hover:text-luxury-champagne transition-all cursor-none"
                  >
                    Our Philosophy
                  </button>
                  <button
                    onClick={() => jumpToSection("#newsletter")}
                    className="text-left py-2 hover:translate-x-2 hover:text-luxury-champagne transition-all cursor-none"
                  >
                    The Atelier Memo
                  </button>
                </div>
              </div>

              {/* Drawer Footer story */}
              <div className="border-t border-zinc-150 dark:border-white/10 pt-8 font-serif">
                <p className="text-xs italic text-zinc-550 dark:text-zinc-400 tracking-wide line-clamp-3">
                  "Exclusivity is our default dimension. We construct bespoke, single-run spatial silhouettes for the contemporary curator."
                </p>
                <div className="mt-4 flex gap-4 text-[10px] font-mono tracking-widest uppercase text-luxury-champagne">
                  <span>Milan</span> • <span>Paris</span> • <span>Tokyo</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. LIVE SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 dark:bg-zinc-950/70 backdrop-blur-xl flex justify-center items-start pt-24 px-6"
          >
            <div className="w-full max-w-2xl bg-white dark:bg-charcoal shadow-2xl rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-zinc-200 dark:border-white/10">
                <Search className="w-5 h-5 text-zinc-400 mr-3" />
                <input
                  type="text"
                  placeholder="Inquire products, collections or details..."
                  className="w-full bg-transparent border-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none text-md md:text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1 border border-zinc-200 dark:border-white/10 rounded hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-xs text-zinc-500 dark:text-zinc-400 cursor-none"
                >
                  ESC
                </button>
              </div>

              {/* Instant Search Results Panel */}
              <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6">
                {!searchQuery && (
                  <div className="text-center py-12">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Begin typing for immediate boutique appraisal</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                       {["trench", "silk", "silver", "perfume", "knitwear"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-3 py-1 bg-zinc-100 dark:bg-white/5 hover:bg-luxury-champagne hover:text-zinc-900 text-xs rounded transition-all text-zinc-650 dark:text-zinc-300 border border-zinc-200 dark:border-transparent cursor-none"
                        >
                          #{term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-12 text-sm text-zinc-550 dark:text-zinc-400">
                    No couture items found matching "{searchQuery}"
                  </div>
                )}

                {searchQuery && searchResults.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
                      Available Appraisals ({searchResults.length})
                    </p>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setActiveQuickViewProduct(product);
                          setSearchOpen(false);
                        }}
                        className="flex gap-4 items-center p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer-hover group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded bg-neutral-850"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-zinc-900 dark:text-[#F5F5F5] group-hover:text-luxury-champagne transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">{product.description}</p>
                          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-[#F5F5F5]">
                            KSh {product.price}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. WISHLIST SLIDEOUT DRAWER */}
      <AnimatePresence>
        {wishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="w-full max-w-md bg-white dark:bg-matte-black h-full p-6 md:p-8 flex flex-col justify-between border-l border-zinc-200 dark:border-white/10 shadow-2xl text-zinc-850 dark:text-[#F5F5F5]"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-luxury-champagne" />
                    <h3 className="font-serif text-lg font-medium tracking-wide text-zinc-950 dark:text-white">
                      Your Curation ({wishlist.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setWishlistOpen(false)}
                    className="p-1 px-2 border border-zinc-200 dark:border-white/10 rounded hover:bg-zinc-100 dark:hover:bg-white/5 text-xs text-zinc-500 dark:text-zinc-400 cursor-none"
                  >
                    Close
                  </button>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart className="w-10 h-10 text-zinc-300 dark:text-zinc-800 mx-auto mb-4 stroke-[1.2]" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Your visual collection is empty.</p>
                    <button
                      onClick={() => {
                        setWishlistOpen(false);
                        jumpToSection("#collections");
                      }}
                      className="mt-6 text-xs text-zinc-800 dark:text-[#F5F5F5] underline decoration-luxury-champagne tracking-widest uppercase cursor-none hover:text-luxury-champagne"
                    >
                      Browse garments
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-center p-2 rounded-lg bg-zinc-50 dark:bg-charcoal border border-zinc-200 dark:border-white/10"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded bg-neutral-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 justify-between">
                          <h4 className="text-xs tracking-wide font-medium text-zinc-900 dark:text-white">{item.name}</h4>
                          <span className="text-xs font-mono font-medium text-zinc-650 dark:text-zinc-300">KSh {item.price}</span>
                          <div className="flex gap-3 mt-2">
                            <button
                              onClick={() => {
                                setActiveQuickViewProduct(item);
                                setWishlistOpen(false);
                              }}
                              className="text-[10px] font-mono tracking-widest text-[#D4AF37] hover:underline cursor-none"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="text-[10px] font-mono tracking-widest text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white cursor-none"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {wishlist.length > 0 && (
                <div className="border-t border-zinc-200 dark:border-white/10 pt-6">
                  <button
                    onClick={() => {
                      setWishlistOpen(false);
                      setCartOpen(true);
                      addToast("Transferred items to bag evaluation", "info");
                    }}
                    className="w-full text-center tracking-widest text-xs font-mono uppercase bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 py-3 rounded-lg hover:bg-luxury-champagne dark:hover:bg-luxury-champagne hover:text-zinc-950 transition-colors cursor-none"
                  >
                    Simulate Bag Transfer
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SHOPPING BAG & CUSTOM CHECKOUT DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="w-full max-w-lg bg-white dark:bg-matte-black h-full p-6 md:p-8 flex flex-col justify-between border-l border-zinc-200 dark:border-white/10 shadow-2xl text-zinc-800 dark:text-[#F5F5F5]"
            >
              {checkoutComplete ? (
                // Checkout Success Screen & Notification Actions
                <div className="h-full flex flex-col justify-between p-2 font-sans overflow-y-auto">
                  <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-14 h-14 rounded-full bg-luxury-champagne/15 border border-luxury-champagne/40 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-luxury-champagne" />
                    </div>
                    <h3 className="font-serif text-xl font-light tracking-wide mb-2 text-zinc-950 dark:text-white">Order Synced Successfully</h3>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
                      Your premium garments have been logged in the local atelier queue. Select a channel below to notify the Business Owner immediately.
                    </p>

                    {/* Order Reference details card */}
                    <div className="w-full bg-zinc-50 dark:bg-charcoal p-4 rounded-lg text-left text-xs space-y-2.5 mb-6 border border-zinc-200 dark:border-white/10">
                      <div className="flex justify-between text-zinc-550 dark:text-zinc-400">
                        <span>Order Reference:</span>
                        <span className="font-mono text-zinc-900 dark:text-white font-semibold">{generatedRef}</span>
                      </div>
                      <div className="flex justify-between text-zinc-550 dark:text-zinc-400">
                        <span>Appraisal value:</span>
                        <span className="font-mono text-luxury-champagne font-bold">KSh {cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-zinc-550 dark:text-zinc-400">
                        <span>Buyer Name:</span>
                        <span className="text-zinc-900 dark:text-white font-semibold">{shippingName}</span>
                      </div>
                      <div className="flex justify-between text-zinc-550 dark:text-zinc-400">
                        <span>Buyer status:</span>
                        <span className="text-zinc-900 dark:text-white uppercase tracking-wider text-[10px] font-mono">
                          {currentUser ? currentUser.role : "Guest User"}
                        </span>
                      </div>
                    </div>

                    {/* Configurable notification channels */}
                    <div className="w-full text-left space-y-3 mb-6 bg-zinc-50 dark:bg-charcoal/40 p-4 border border-zinc-150 dark:border-white/5 rounded-lg">
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">Notification Parameters</h4>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1">Owner WhatsApp Phone</label>
                        <input
                          type="text"
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          placeholder="e.g. +254700000000"
                          className="w-full text-xs p-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-zinc-505 mb-1">Owner Contact Email</label>
                        <input
                          type="text"
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                          placeholder="e.g. owner@debbiegarmets.com"
                          className="w-full text-xs p-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 text-zinc-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Quick Launch Buttons */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={triggerWhatsApp}
                        className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-none"
                      >
                        Notify on WhatsApp
                      </button>
                      <button
                        onClick={triggerEmail}
                        className="p-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-none"
                      >
                        Notify via Email
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={closeCheckoutFlow}
                    className="w-full mt-6 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-955 py-3 tracking-widest text-xs font-mono uppercase rounded-lg hover:bg-luxury-champagne dark:hover:bg-luxury-champagne hover:text-neutral-900 dark:hover:text-zinc-950 transition-colors cursor-none"
                  >
                    Return to Atelier
                  </button>
                </div>
              ) : (
                // Standard Cart & Checkout Form Drawer
                <>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-luxury-champagne" />
                        <h3 className="font-serif text-lg font-medium text-zinc-950 dark:text-white">Evaluation Bag</h3>
                      </div>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="p-1 px-2 border border-zinc-200 dark:border-white/10 rounded hover:bg-zinc-100 dark:hover:bg-white/5 text-xs text-zinc-550 dark:text-zinc-400 cursor-none"
                      >
                        Minimize
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center py-20">
                        <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-805 stroke-[1.2] mb-4" />
                        <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Your bag stands empty.</h4>
                        <p className="text-xs text-zinc-400 dark:text-zinc-505 max-w-xs mt-2 leading-relaxed font-light">
                          Garments placed here await expert inspection and courier simulation.
                        </p>
                        <button
                          onClick={() => {
                            setCartOpen(false);
                            jumpToSection("#collections");
                          }}
                          className="mt-6 text-xs text-zinc-800 dark:text-[#F5F5F5] underline decoration-luxury-champagne uppercase font-mono tracking-widest cursor-none hover:text-luxury-champagne"
                        >
                          Appraise collection
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {cart.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-3 bg-zinc-50 dark:bg-charcoal border border-zinc-200 dark:border-white/10 rounded-lg"
                          >
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded bg-neutral-800"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 select-none">
                              <div className="flex justify-between">
                                <h4 className="text-xs md:text-sm font-medium tracking-wide text-zinc-900 dark:text-white">{item.product.name}</h4>
                                <span className="text-xs font-mono font-semibold text-zinc-650 dark:text-zinc-300">KSh {item.product.price * item.quantity}</span>
                              </div>
                              <p className="text-[11px] font-mono text-luxury-champagne mt-1">
                                Size: {item.selectedSize} • Color: {item.selectedColor.name}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                {/* Quantity controls */}
                                <div className="flex items-center border border-zinc-200 dark:border-white/10 rounded">
                                  <button
                                    onClick={() => updateCartQuantity(index, item.quantity - 1)}
                                    className="px-2 py-0.5 text-xs text-zinc-550 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-none"
                                  >
                                    -
                                  </button>
                                  <span className="px-3 py-0.5 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">{item.quantity}</span>
                                  <button
                                    onClick={() => updateCartQuantity(index, item.quantity + 1)}
                                    className="px-2 py-0.5 text-xs text-zinc-550 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white cursor-none"
                                  >
                                    +
                                  </button>
                                </div>
                                {/* Delete */}
                                <button
                                  onClick={() => removeFromCart(index)}
                                  className="text-zinc-400 hover:text-rose-500 p-1 rounded transition-colors cursor-none"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-zinc-200 dark:border-white/10 pt-6 mt-4">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs tracking-wide">
                          <span className="text-zinc-500 dark:text-zinc-400">Subtotal Valuation:</span>
                          <span className="font-mono font-semibold text-zinc-705 dark:text-zinc-200">KSh {cartSubtotal}</span>
                        </div>
                        <div className="flex justify-between text-xs tracking-wide">
                          <span className="text-zinc-550 dark:text-zinc-400">Courier Insurance:</span>
                          <span className="font-mono text-zinc-650 dark:text-zinc-200">{shippingCharge === 0 ? "Complimentary" : `KSh ${shippingCharge}`}</span>
                        </div>
                        <div className="flex justify-between text-sm tracking-wide font-medium border-t border-zinc-200 dark:border-white/10 pt-2 font-serif">
                          <span className="text-zinc-800 dark:text-zinc-300">Total Appraised:</span>
                          <span className="font-mono text-zinc-950 dark:text-[#F5F5F5] font-bold">KSh {cartTotal}</span>
                        </div>
                      </div>

                      {/* Checkout Drawer Simulation */}
                      <AnimatePresence>
                        {isCheckingOut ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-zinc-50 dark:bg-charcoal border border-zinc-200 dark:border-white/10 rounded-lg p-4 mb-4 text-left max-h-[480px] overflow-y-auto"
                          >
                            <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                              <p className="text-[10px] font-mono tracking-widest text-luxury-champagne uppercase flex items-center gap-1 font-semibold">
                                <Sparkles className="w-3.5 h-3.5" /> Luxury WhatsApp Checkout
                              </p>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">Shipping Name</label>
                                <input
                                  type="text"
                                  required
                                  value={shippingName}
                                  onChange={(e) => setShippingName(e.target.value)}
                                  className="w-full text-xs p-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 focus:ring-luxury-champagne text-zinc-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">Your Mobile Phone</label>
                                <input
                                  type="tel"
                                  required
                                  value={shippingPhone}
                                  onChange={(e) => setShippingPhone(e.target.value)}
                                  placeholder="+254 711 111111"
                                  className="w-full text-xs p-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 focus:ring-luxury-champagne text-zinc-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-zinc-505 dark:text-zinc-400 mb-1">Courier Address</label>
                                <input
                                  type="text"
                                  required
                                  value={shippingAddress}
                                  onChange={(e) => setShippingAddress(e.target.value)}
                                  className="w-full text-xs p-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 focus:ring-luxury-champagne text-zinc-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-zinc-505 dark:text-zinc-400 mb-1">Boutique Owner WhatsApp Number</label>
                                <input
                                  type="text"
                                  required
                                  value={ownerPhone}
                                  onChange={(e) => setOwnerPhone(e.target.value)}
                                  placeholder="+254 700 000000"
                                  className="w-full text-xs p-2 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 focus:ring-luxury-champagne text-zinc-900 dark:text-white"
                                />
                              </div>

                              <div className="bg-zinc-100 dark:bg-zinc-950 p-2.5 rounded border border-zinc-200 dark:border-white/10 mt-1 select-none">
                                <span className="block text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold font-mono">Real-time Transmission Preview</span>
                                <pre className="font-mono text-[9px] whitespace-pre-wrap leading-tight text-zinc-600 dark:text-zinc-400 max-h-[110px] overflow-y-auto break-all">
                                  {getSimulatedMessageText("AE-PREVIEW")}
                                </pre>
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono uppercase tracking-widest transition-transform hover:scale-[1.01] active:scale-95 cursor-none rounded font-bold flex justify-center items-center gap-2"
                              >
                                <Sparkles className="w-4 h-4" /> Place Order via WhatsApp
                              </button>
                            </form>
                          </motion.div>
                        ) : (
                          <button
                            onClick={() => setIsCheckingOut(true)}
                            className="w-full py-3.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-mono uppercase tracking-widest hover:bg-luxury-champagne dark:hover:bg-luxury-champagne hover:text-neutral-900 dark:hover:text-[#121212] transition-colors cursor-none rounded"
                          >
                            Simulate Checkout
                          </button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. USER ACCOUNTS MODAL OVERLAY */}
      <AnimatePresence>
        {accountOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-matte-black border border-zinc-200 dark:border-white/10 p-6 md:p-8 rounded-xl shadow-2xl relative text-zinc-850 dark:text-white max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setAccountOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-none z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {currentUser ? (
                // LOGGED IN USER VIEW
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-16 h-16 rounded-full bg-luxury-champagne/15 border border-luxury-champagne/40 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-luxury-champagne" />
                    </div>
                    <h4 className="font-serif text-lg font-light tracking-wide text-zinc-950 dark:text-white">
                      {currentUser.fullName}
                    </h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 mt-1 font-mono font-light">
                      {currentUser.email}
                    </p>
                    <span className="mt-3 px-3 py-1 bg-luxury-champagne text-zinc-950 rounded-full font-mono text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1">
                      {currentUser.role === "premium" ? "👑 Premium Member" : "💼 Business Owner"}
                    </span>
                  </div>

                  {currentUser.role === "business_owner" && (
                    <div className="border-t border-zinc-200 dark:border-white/10 pt-4 space-y-4 text-left">
                      <div className="bg-zinc-50 dark:bg-charcoal p-3 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Business:</span>
                          <span className="font-semibold text-zinc-900 dark:text-white">{currentUser.businessName || "Debbie Garmets"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Owner WhatsApp:</span>
                          <span className="font-semibold font-mono text-zinc-900 dark:text-white">{currentUser.phone || "Not Set"}</span>
                        </div>
                      </div>

                      {/* Synced simulated checkout orders log */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center pb-1 border-b border-zinc-100 dark:border-white/5">
                          <h5 className="font-serif text-sm font-medium text-luxury-champagne flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> Synced Checkouts from Clients
                          </h5>
                          <button
                            onClick={() => {
                              localStorage.removeItem("aera-simulated-orders");
                              addToast("Simulated order queue flushed", "info");
                            }}
                            className="text-[10px] font-mono text-rose-500 hover:underline cursor-none"
                          >
                            Flush Logs
                          </button>
                        </div>

                        {(() => {
                          const savedOrdersStr = localStorage.getItem("aera-simulated-orders");
                          const orders = savedOrdersStr ? JSON.parse(savedOrdersStr) : [];
                          if (orders.length === 0) {
                            return (
                              <p className="text-xs text-zinc-400 italic text-center py-6 font-light">No client checkouts synced yet. Simulate checkout as Premium User to populate queue!</p>
                            );
                          }
                          return (
                            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                              {orders.map((order: any) => (
                                <div key={order.id} className="p-3 bg-zinc-50 dark:bg-charcoal/50 rounded border border-zinc-150 dark:border-white/5 space-y-2 text-xs">
                                  <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                                    <span className="text-luxury-champagne font-semibold font-sans">{order.id}</span>
                                    <span>{order.date}</span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-zinc-900 dark:text-white">Customer: {order.buyerName} ({order.buyerRole})</p>
                                    <p className="text-[10px] text-zinc-400 truncate">Courier Addr: {order.address}</p>
                                  </div>
                                  <div className="border-t border-zinc-200 dark:border-white/10 pt-2 flex justify-between items-center text-[11px] font-mono">
                                    <span className="text-zinc-500">{order.items?.length || 1} Custom Art(s)</span>
                                    <span className="font-bold text-luxury-champagne">KSh {order.total?.toLocaleString()}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {currentUser.role === "premium" && (
                    <div className="border-t border-zinc-200 dark:border-white/10 pt-4 space-y-4 text-left">
                      <div className="bg-zinc-50 dark:bg-charcoal p-4 rounded-lg text-xs leading-relaxed text-zinc-650 dark:text-zinc-400 font-light flex gap-2.5">
                        <Info className="w-4 h-4 text-luxury-champagne flex-shrink-0" />
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-white mb-1">Your Premium Privileges Active</p>
                          <p>
                            Preferential pricing, complimentary couture packaging, and immediate order dispatch options are synchronized on your local account.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500">Personal Synced Phone:</span>
                          <span className="font-mono text-zinc-900 dark:text-white font-medium">{currentUser.phone || "+254711111111"}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500">Capsule Access Key:</span>
                          <span className="text-luxury-champagne font-semibold flex items-center gap-1 font-mono uppercase text-[10px]">
                            Golden Gate <Sparkles className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-100 dark:border-white/5">
                    <button
                      onClick={() => {
                        logoutUser();
                        addToast("Logged out of Couture Desk", "info");
                      }}
                      className="w-full py-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 border border-rose-100 dark:border-rose-955/20 hover:bg-rose-500 hover:text-white transition-all text-xs uppercase tracking-widest font-mono cursor-none font-semibold rounded"
                    >
                      Logout Account
                    </button>
                  </div>
                </div>
              ) : (
                // SIGN UP OR LOG IN MODE
                <div className="font-sans space-y-5 text-left">
                  <div className="text-center">
                    <h3 className="font-serif text-2xl tracking-wide text-zinc-950 dark:text-white">
                      {authTab === "login" ? "Atelier Sign In" : "Atelier Registration"}
                    </h3>
                    <p className="text-xs text-zinc-450 mt-1">
                      {authTab === "login" ? "Access your premium profile or business portal" : "Register as a premium collector or boutique owner"}
                    </p>
                  </div>

                  {/* Tabs Selector */}
                  <div className="grid grid-cols-2 bg-zinc-100 dark:bg-white/5 p-1 rounded-lg text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setAuthTab("login")}
                      className={`py-1.5 rounded transition-all cursor-none ${authTab === "login" ? "bg-white dark:bg-matte-black text-luxury-champagne shadow font-semibold" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"}`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthTab("signup")}
                      className={`py-1.5 rounded transition-all cursor-none ${authTab === "signup" ? "bg-white dark:bg-matte-black text-luxury-champagne shadow font-semibold" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"}`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Role Selector Input */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">Account Level</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setAuthRole("premium")}
                        className={`p-2 rounded border transition-all cursor-none ${authRole === "premium" ? "border-luxury-champagne bg-luxury-champagne/10 text-luxury-champagne font-bold" : "border-zinc-200 dark:border-white/10 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"}`}
                      >
                        Premium User
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthRole("business_owner")}
                        className={`p-2 rounded border transition-all cursor-none ${authRole === "business_owner" ? "border-luxury-champagne bg-luxury-champagne/10 text-luxury-champagne font-bold" : "border-zinc-200 dark:border-white/10 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"}`}
                      >
                        Business Owner
                      </button>
                    </div>
                  </div>

                  {/* Auth Forms */}
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (authTab === "login") {
                        const success = await loginUser(authEmail, authRole);
                        if (success) {
                          setAuthEmail("");
                          setAccountOpen(false);
                        }
                      } else {
                        if (!authFullName) {
                          addToast("Please provide your full name", "error");
                          return;
                        }
                        const success = await signupUser(
                          authEmail,
                          authFullName,
                          authRole,
                          authPhone,
                          authBusinessName
                        );
                        if (success) {
                          setAuthEmail("");
                          setAuthFullName("");
                          setAuthPhone("");
                          setAuthBusinessName("");
                          setAccountOpen(false);
                        }
                      }
                    }}
                    className="space-y-4"
                  >
                    {authTab === "signup" && (
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1 font-mono">Full Name</label>
                        <input
                          type="text"
                          required
                          value={authFullName}
                          onChange={(e) => setAuthFullName(e.target.value)}
                          placeholder="e.g. Joel Hasty"
                          className="w-full text-xs p-2.5 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 text-zinc-900 dark:text-white"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1 font-mono">Email Address</label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="e.g. hastyjoel1@gmail.com"
                        className="w-full text-xs p-2.5 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 text-zinc-900 dark:text-white"
                      />
                    </div>

                    {authTab === "signup" && (
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1 font-mono">WhatsApp Phone Number</label>
                        <input
                          type="tel"
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          placeholder="e.g. +254700000000"
                          className="w-full text-xs p-2.5 bg-white dark:bg-transparent border border-zinc-205 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 text-zinc-900 dark:text-white"
                        />
                      </div>
                    )}

                    {authTab === "signup" && authRole === "business_owner" && (
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1 font-mono">Boutique / Atelier Name</label>
                        <input
                          type="text"
                          required
                          value={authBusinessName}
                          onChange={(e) => setAuthBusinessName(e.target.value)}
                          placeholder="e.g. Debbie Garments Kenya"
                          className="w-full text-xs p-2.5 bg-white dark:bg-transparent border border-zinc-200 dark:border-white/10 rounded focus:border-luxury-champagne focus:outline-none focus:ring-1 text-zinc-900 dark:text-white"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-semibold uppercase tracking-widest text-xs font-mono rounded hover:bg-luxury-champagne dark:hover:bg-luxury-champagne hover:text-zinc-950 dark:hover:text-zinc-950 transition-colors cursor-none"
                    >
                      {authTab === "login" ? "Access Atelier Profile" : "Register Couture Status"}
                    </button>
                  </form>

                  {/* Demonstration Quick fill options */}
                  <div className="border-t border-zinc-200 dark:border-white/10 pt-4 space-y-2">
                    <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase text-center font-bold">Demonstration Quick Logins</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthRole("premium");
                          setAuthEmail("premium@debbiegarmets.com");
                          loginUser("premium@debbiegarmets.com", "premium").then(() => setAccountOpen(false));
                        }}
                        className="p-2 border border-dashed border-luxury-champagne/40 rounded text-center hover:bg-luxury-champagne/10 text-luxury-champagne cursor-none"
                      >
                        ⚡ Sample Premium
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthRole("business_owner");
                          setAuthEmail("owner@debbiegarmets.com");
                          loginUser("owner@debbiegarmets.com", "business_owner").then(() => setAccountOpen(false));
                        }}
                        className="p-2 border border-dashed border-luxury-champagne/40 rounded text-center hover:bg-luxury-champagne/10 text-luxury-champagne cursor-none"
                      >
                        ⚡ Sample Owner
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
