import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-400 pt-24 pb-12 border-t border-accent/10 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col mb-8">
              <h1 className="text-3xl font-heading font-bold tracking-widest text-accent mb-1">
                RHEMAR
              </h1>
              <span className="text-xs tracking-[0.5em] uppercase text-accent/80">
                Signature
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              Defining the modern wardrobe for the global gentleman with a focus
              on uncompromising quality and timeless aesthetics.
            </p>
            <div className="flex space-x-4">
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/rhemarsignature"
                  target="_blank"
                  className="w-10 h-10 border border-accent/30 flex items-center justify-center rounded-full hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <FaFacebookF size={14} />
                </a>

                <a
                  href="https://www.instagram.com/rhemarsignature/"
                  target="_blank"
                  className="w-10 h-10 border border-accent/30 flex items-center justify-center rounded-full hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <FaInstagram size={14} />
                </a>

                <a
                  href="https://www.tiktok.com/@rhemarsignature"
                  target="_blank"
                  className="w-10 h-10 border border-accent/30 flex items-center justify-center rounded-full hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <FaTiktok size={14} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading tracking-widest uppercase text-sm mb-8">
              Shop
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors"
                >
                  Panjabi Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors"
                >
                  Executive Polos
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors"
                >
                  Premium Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors"
                >
                  Artisan Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors"
                >
                  Signature Combos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading tracking-widest uppercase text-sm mb-8">
              Information
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/philosophy"
                  className="hover:text-accent transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-returns"
                  className="hover:text-accent transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <a
                  href="/care-guide"
                  className="hover:text-accent transition-colors"
                >
                  Care Guide
                </a>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-service"
                  className="hover:text-accent transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading tracking-widest uppercase text-sm mb-8">
              Newsletter
            </h4>
            <p className="text-sm mb-6">
              Join the signature circle for exclusive previews and sartorial
              inspiration.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-charcoal border-b border-accent/30 py-4 px-0 focus:border-accent outline-none text-white text-xs tracking-widest transition-colors uppercase"
              />
              <button className="absolute right-0 bottom-4 text-accent hover:text-white transition-colors">
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-accent/10 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase">
          <p>© 2026 RHEMAR SIGNATURE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <span className="text-accent/50">Curated in Dhaka</span>
            <span className="text-accent/50">Global Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
