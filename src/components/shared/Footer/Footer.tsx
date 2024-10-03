import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex justify-center md:block">
          <Image src="/images/logo-footer.png" alt="Logo" className="w-48" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Menú</h2>
          <ul className="text-gray-300">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Sing In
              </Link>
            </li>
            <li>
              <Link href="/myaccount" className="hover:underline">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Exercises</h2>
          <ul className="text-gray-300">
            <li>
              <Link href="/categories/smartphones" className="hover:underline">
                lorem lorem
              </Link>
            </li>
            <li>
              <Link href="/categories/laptops" className="hover:underline">
                lorem lorem
              </Link>
            </li>
            <li>
              <Link href="/categories/headphones" className="hover:underline">
                lorem lorem
              </Link>
            </li>
            <li>
              <Link href="/categories/tablets" className="hover:underline">
                lorem lorem
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:underline">
                lorem lorem
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Subscribe</h2>
          <p className="mb-2">Receive our latest news and offers.</p>
          <form className="px-5">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 mb-2 text-gray-800 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-[#ffd342] hover:text-bkack rounded-lg text-black py-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-gray-400 text-xs pt-5 lg:text-md lg:pt-10">
        <p className="text-center">
          PowerTraining | © 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
