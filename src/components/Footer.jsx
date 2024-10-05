import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/support"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="/hosting"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Hosting
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex flex-col">
              <ul className="space-y-2">
                <li>
                  <a
                    href="/facebook"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="/instagram"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="/linkedin"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Info */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-lg font-semibold mb-4">© 2024 Airbnb</h3>
            <p className="text-gray-600">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
