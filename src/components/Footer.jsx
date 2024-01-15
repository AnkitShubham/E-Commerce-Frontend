import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-[32px] bg-[#212121] p-[24px] w-[98.5vw]">
      <footer className="flex flex-col justify-center items-center">
        <div className="flex flex-row jutify-center gap-[24px]">
          <div>
            <div className="text-[#878787]">About</div>
            <ul className="list-none p-0">
              <li>
                <Link to="" className="no-underline text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  Carrers
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[#878787]">Help</div>
            <ul>
              <li>
                <Link to="" className="no-underline text-white">
                  Payments
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  Cancellations & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[#878787]">Socials</div>
            <ul>
              <li>
                <Link to="" className="no-underline text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link to="" className="no-underline text-white">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-[#878787]">&copy;2024 Copyright</div>
      </footer>
    </div>
  );
};

export default Footer;
