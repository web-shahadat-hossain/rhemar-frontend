"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchOverlay from "../UI/SearchOverlay";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where Header/Footer should NOT show
  const hiddenRoutes = [
    "/welcome-to-presio",
    "/terms-of-services",
    "/privacy-policy",
    "/onboarding",
  ];
  const hiddenFooter = ["/auth/login", "/auth/register"];

  const isDashboard =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/proposal") ||
    pathname?.startsWith("/estimates");

  const hideLayout = hiddenRoutes.includes(pathname) || isDashboard;
  type View = "home" | "collections" | "auth";
  const hideFooter = hiddenFooter.includes(pathname);
  const [currentView, setCurrentView] = useState<View>("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);

    // Smooth scroll behavior for internal links (only in home view)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        if (currentView === "home") {
          e.preventDefault();
          const element = document.querySelector(anchor.hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          setCurrentView("home");
          // Wait for view change before attempting scroll
          setTimeout(() => {
            const element = document.querySelector(anchor.hash);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [currentView]);

  return (
    <>
      {!hideLayout && (
        <Suspense fallback={null}>
          <Navbar
            onNavigate={(view) => setCurrentView(view)}
            onSearchOpen={() => setIsSearchOpen(true)}
            isHomePage={pathname === "/"}
          />

          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </Suspense>
      )}
      {children}
      {!hideLayout && !hideFooter && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
