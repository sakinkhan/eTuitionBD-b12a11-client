import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

import PrivacyPolicyModal from "../../../components/PrivacyPolicyModal/PrivacyPolicyModal";
import TermsOfUseModal from "../../../components/TermsModal/TermsOfUseModal";
import FAQsModal from "../../../components/FAQsModal/FAQsModal";

const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isFAQsOpen, setIsFAQsOpen] = useState(false);

  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-neutral p-10 md:px-20">
        <aside>
          <Logo />
          <p>
            Connecting Students & Tutors. <br />
            Built on 25+ Years of Trust.
          </p>
          <p className="mt-4">
            Copyright © {new Date().getFullYear()} – All rights reserved by
            eTuitionBD
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Quick Links</h6>

          <Link to="/about" className="link link-hover">
            About Us
          </Link>

          <button
            onClick={() => setIsFAQsOpen(true)}
            className="link link-hover text-left"
          >
            FAQs
          </button>
          <button
            onClick={() => setIsTermsOpen(true)}
            className="link link-hover text-left"
          >
            Terms of Use
          </button>

          <button
            onClick={() => setIsPrivacyPolicyOpen(true)}
            className="link link-hover text-left"
          >
            Privacy Policy
          </button>

          <Link to="/career" className="link link-hover">
            Career
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title">Contact</h6>

          <div className="flex items-center gap-2 text-sm">
            <HiOutlineMail size={18} className="text-primary" />
            <span>support@etuitionbd.com</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <BsTelephone size={16} className="text-primary" />
            <span>+880 1234 567890</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <GoLocation size={16} className="text-primary" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </nav>

        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://x.com/" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter
                size={25}
                className="cursor-pointer hover:scale-105 transition hover:text-primary"
              />
            </Link>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare
                size={25}
                className="cursor-pointer hover:scale-105 transition hover:text-primary"
              />
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram
                size={25}
                className="cursor-pointer hover:scale-105 transition hover:text-primary"
              />
            </Link>
            <Link
              to="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareWhatsapp
                size={25}
                className="cursor-pointer hover:scale-105 transition hover:text-primary"
              />
            </Link>
          </div>
        </nav>
      </footer>

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      <TermsOfUseModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <FAQsModal isOpen={isFAQsOpen} onClose={() => setIsFAQsOpen(false)} />
    </div>
  );
};

export default Footer;
