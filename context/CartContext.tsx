"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: any[];
  selectedSize: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (_id: string, size: string) => void;
  increaseQty: (_id: string, size: string) => void;
  decreaseQty: (_id: string, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("rhemar_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rhemar_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i._id === item._id && i.selectedSize === item.selectedSize,
      );

      if (existing) {
        return prev.map((i) =>
          i._id === item._id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (_id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i._id === _id && i.selectedSize === size)),
    );
  };

  const increaseQty = (_id: string, size: string) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === _id && i.selectedSize === size
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
    );
  };

  const decreaseQty = (_id: string, size: string) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === _id && i.selectedSize === size
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
