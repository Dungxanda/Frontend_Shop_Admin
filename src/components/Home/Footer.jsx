import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function FooterHome() {
  return (
    <footer className="bg-gray-200 text-gray-800 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className='flex flex-col items-center space-y-1'>
            <h2 className="text-xl font-bold mb-4">BookStore</h2>
            <p>Your one-stop shop for all kinds of books.</p>
          </div>
          
          <div className='flex flex-col items-center space-y-1'>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          
          <div className='flex flex-col items-center space-y-1'>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li>Address: 123 Book St, Reading City, BK 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: support@bookstore.com</li>
            </ul>
          </div>
          
          <div className='flex flex-col items-center space-y-1'>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF className="text-2xl" /></a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-2xl" /></a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl" /></a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="text-2xl" /></a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-2xl" /></a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
