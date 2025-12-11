import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook, Linkedin, Twitter, Instagram, Youtube,
  MapPin, Phone, Mail
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pb-8 pt-8 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="border-t border-gray-800 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="space-y-6">
            <div className="w-40">
              <img
                src="https://www.investoxpert.com/_next/image?url=%2FIX-white-logo.png&w=384&q=75"
                alt="InvestoXpert"
                className="w-full h-auto object-contain "
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <h2 className="text-2xl font-bold text-white sm:hidden">
              </h2>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              InvestoXpert is one of the fastest growing companies in the real estate arena, offering comprehensive solutions to fulfill the myriad requirements of customers.
            </p>

            <div className="pt-2">
              <h5 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Follow us @</h5>
              <div className="flex space-x-4">
                <SocialIcon Icon={Facebook} href="https://facebook.com" />
                <SocialIcon Icon={Linkedin} href="https://linkedin.com" />
                <SocialIcon Icon={Twitter} href="https://twitter.com" />
                <SocialIcon Icon={Instagram} href="https://instagram.com" />
                <SocialIcon Icon={Youtube} href="https://youtube.com" />
              </div>
            </div>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <FooterHeading title="Contact Us" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                <span className="text-sm text-gray-400">
                  3rd Floor, Riana Aurelia, Plot 93-94, Sector 136, Noida, Uttar Pradesh 201305
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm text-gray-400 font-bold hover:text-white transition-colors">
                  9880083870
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm text-gray-400 font-bold hover:text-white transition-colors">
                  info@investoxpert.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <FooterHeading title="Quick Links" />
            <ul className="space-y-2">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/properties" text="Properties" />
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/contact" text="Contact Us" />
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <FooterHeading title="Resources" />
            <ul className="space-y-2">
              <FooterLink to="/" text="Privacy Policy" />
              <FooterLink to="/" text="Terms & Conditions" />
              <FooterLink to="/" text="Blog" />
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} InvestoXpert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
  >
    <Icon size={18} />
  </a>
);

const FooterHeading = ({ title }) => (
  <h5 className="text-lg font-bold text-white mb-6 relative inline-block">
    {title}
    <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
  </h5>
);

const FooterLink = ({ to, text }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-gray-400 hover:text-red-500 hover:pl-1 transition-all duration-200 block"
    >
      {text}
    </Link>
  </li>
);

export default Footer;