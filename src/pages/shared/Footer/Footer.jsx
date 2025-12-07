import React from "react";
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

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 p-10 md:px-20">
        <aside>
          <Logo></Logo>
          <p className="text">
            Connecting Students & Tutors. <br />
            Built on 25+ Years of Trust.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/about" className="link link-hover">
            About Us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact Us
          </Link>
          <Link className="link link-hover">FAQs / Help Center</Link>
          <Link className="link link-hover">Terms of Use</Link>
          <Link className="link link-hover">Privacy Policy</Link>
          <Link className="link link-hover">Career</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <div className="flex items-center gap-2 text-sm">
            <HiOutlineMail size={18} />
            <span>support@etuitionbd.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BsTelephone size={16} />
            <span>+880 1234 567890</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GoLocation size={16} />
            <span>Dhaka, Bangladesh</span>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a className="cursor-pointer hover:scale-105 duration-200">
              <FaSquareXTwitter size={25} color="var(--icon-color)" />
            </a>
            <a className="cursor-pointer hover:scale-105 duration-200">
              <FaFacebookSquare size={25} color="var(--icon-color)" />
            </a>
            <a className="cursor-pointer hover:scale-105 duration-200">
              <FaSquareInstagram size={25} color="var(--icon-color)" />
            </a>
            <a className="cursor-pointer hover:scale-105 duration-200">
              <FaSquareWhatsapp size={25} color="var(--icon-color)" />
            </a>
          </div>
        </nav>
      </footer>
      <div className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p className="">
            Copyright © {new Date().getFullYear()} - All rights reserved by
            eTuitionBD
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
