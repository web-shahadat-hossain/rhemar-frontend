// import { CartItem } from "@/types/types";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// interface NavbarProps {
//   onNavigate: (view: "home" | "collections" | "auth") => void;
//   onSearchOpen: () => void;
//   isHomePage?: boolean; // Add this
// }

// const Navbar: React.FC<NavbarProps> = ({
//   onNavigate,
//   onSearchOpen,
//   isHomePage = false,
// }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const updateCartCount = () => {
//       const savedCart = localStorage.getItem("rhemar_cart");
//       if (savedCart) {
//         try {
//           const items: CartItem[] = JSON.parse(savedCart);
//           const count = items.reduce((sum, item) => sum + item.quantity, 0);
//           setCartCount(count);
//         } catch (error) {
//           console.error("Failed to load cart:", error);
//         }
//       }
//     };

//     // Load on mount
//     updateCartCount();

//     // Listen for storage changes
//     window.addEventListener("storage", updateCartCount);

//     // Custom event for same-tab updates
//     window.addEventListener("cartUpdated", updateCartCount);

//     return () => {
//       window.removeEventListener("storage", updateCartCount);
//       window.removeEventListener("cartUpdated", updateCartCount);
//     };
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
//         isHomePage
//           ? scrolled
//             ? "bg-primary/95 backdrop-blur-md py-4 border-accent/20"
//             : "bg-transparent py-6 border-transparent"
//           : "bg-primary/95 backdrop-blur-md py-4 border-accent/20"
//       }`}
//     >
//       <div className="container mx-auto px-6 flex justify-between items-center">
//         <div className="hidden lg:flex space-x-8">
//           <Link
//             href="/products"
//             className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors"
//           >
//             Collections
//           </Link>
//           <Link
//             href="/philosophy"
//             className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors"
//           >
//             Philosophy
//           </Link>
//         </div>

//         <Link href="/" className="flex flex-col items-center group">
//           <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-widest text-accent group-hover:text-white transition-colors">
//             RHEMAR
//           </h1>
//           <span className="text-[10px] tracking-[0.5em] uppercase text-accent/80 -mt-1 group-hover:text-white/80 transition-colors">
//             Signature
//           </span>
//         </Link>

//         <div className="flex items-center space-x-6">
//           <div className="hidden md:flex space-x-6">
//             <button
//               onClick={onSearchOpen}
//               className="text-white hover:text-accent transition-colors"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 ></path>
//               </svg>
//             </button>
//             <button
//               onClick={() => onNavigate("auth")}
//               className="text-white hover:text-accent transition-colors"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 ></path>
//               </svg>
//             </button>
//             <Link
//               href={"/cart"}
//               className="text-white hover:text-accent transition-colors relative"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 ></path>
//               </svg>
//               <span className="absolute -top-1 -right-1 bg-accent text-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
//                 {cartCount > 99 ? "99+" : cartCount}
//               </span>
//             </Link>

//             {/* <Link
//             href="/cart"
//             className="text-white hover:text-gold transition-colors p-2 hover:bg-white/10 rounded-lg relative group"
//             aria-label="Shopping Cart"
//           >
//             <ShoppingBag size={20} />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-gold text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
//                 {cartCount > 99 ? "99+" : cartCount}
//               </span>
//             )}
//           </Link> */}
//           </div>
//           <button className="lg:hidden text-white">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.5"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useAuth } from "@/context/AuthContext";
import { CartItem } from "@/types/types";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface NavbarProps {
  onNavigate: (view: "home" | "collections" | "auth" | "philosophy") => void;
  onSearchOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onSearchOpen,
  isHomePage = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("rhemar_cart");
      if (savedCart) {
        try {
          const items: CartItem[] = JSON.parse(savedCart);
          const count = items.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(count);
        } catch (error) {
          console.error("Failed to load cart:", error);
        }
      }
    };

    // Load on mount
    updateCartCount();

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount);

    // Custom event for same-tab updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isHomePage
            ? scrolled
              ? "bg-primary/95 backdrop-blur-md py-4 border-accent/20"
              : "bg-transparent py-6 border-transparent"
            : "bg-primary/95 backdrop-blur-md py-4 border-accent/20"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <Link
              href={"/products"}
              className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors"
            >
              Collections
            </Link>
            <Link
              href={"philosophy"}
              className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors"
            >
              Philosophy
            </Link>
          </div>

          {/* Logo */}
          <Link href={"/"} className="flex flex-col items-center group">
            <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-widest text-accent group-hover:text-white transition-colors">
              RHEMAR
            </h1>
            <span className="text-[10px] tracking-[0.5em] uppercase text-accent/80 -mt-1 group-hover:text-white/80 transition-colors">
              Signature
            </span>
          </Link>

          {/* Icons & Mobile Toggle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex items-center space-x-4 md:space-x-6">
              <button
                onClick={onSearchOpen}
                className="text-white hover:text-accent transition-colors p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <Link
                href={
                  user?.role === "admin"
                    ? "/admin"
                    : user?.role === "user"
                      ? "/dashboard"
                      : "/auth/login"
                }
                className="hidden md:block text-white hover:text-accent transition-colors p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>

              <Link
                href={"/cart"}
                className="text-white hover:text-accent transition-colors relative p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-accent transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-primary/95 backdrop-blur-xl"></div>

        <div className="relative h-full flex flex-col items-center justify-center space-y-12 px-6">
          <div className="flex flex-col space-y-8 text-center">
            <Link
              href={"/"}
              onClick={handleLinkClick}
              className="text-3xl font-heading text-white tracking-widest uppercase hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href={"/products"}
              onClick={handleLinkClick}
              className="text-3xl font-heading text-white tracking-widest uppercase hover:text-accent transition-colors"
            >
              Collections
            </Link>
            <Link
              href={"/philosophy"}
              onClick={handleLinkClick}
              className="text-3xl font-heading text-white tracking-widest uppercase hover:text-accent transition-colors"
            >
              Philosophy
            </Link>
            {/* ===== ROLE BASED MENU ===== */}

            {user?.role === "admin" ? (
              <Link
                href="/admin"
                onClick={handleLinkClick}
                className="text-3xl font-heading text-white tracking-widest uppercase hover:text-accent transition-colors"
              >
                Admin Console
              </Link>
            ) : user?.role === "user" ? (
              <Link
                href="/dashboard"
                onClick={handleLinkClick}
                className="text-3xl font-heading text-white tracking-widest uppercase hover:text-accent transition-colors"
              >
                My Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={handleLinkClick}
                className="text-3xl font-heading text-white tracking-widest uppercase hover:text-accent transition-colors"
              >
                Account
              </Link>
            )}
          </div>

          <div className="pt-12 border-t border-accent/20 w-full max-w-[200px] text-center">
            <p className="text-accent/60 tracking-[0.4em] uppercase text-[10px] mb-6">
              Connect With Us
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                FB
              </a>
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                IG
              </a>
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                TW
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
