import React, { useState, useEffect } from 'react';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
const textLogo = '/logo-text-magiccraft.png';

import './Footer.css'; // Add this import
import { Grid } from 'antd';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState();
  const currentDate = new Date();
  const breakpoint = Grid.useBreakpoint();

  useEffect(() => {
    setCurrentYear(currentDate.getFullYear());
  }, []);

  return (
    <div className="footer">
      <div className="footer__text">
        <img src={textLogo} alt="MagicCraft Logo" />
        {!breakpoint.sm ? (
          <div className="footer__social">
            {/* Replaced Link with a */}
            <a
              className="footer__social--socialIcon"
              target="_blank"
              rel="noopener noreferrer"
              href="//discord.gg/magiccraftgame"
            >
              <h4>
                <FaDiscord />
              </h4>
            </a>
            {/* Replaced Link with a */}
            <a
              className="footer__social--socialIcon"
              target="_blank"
              rel="noopener noreferrer"
              href="//twitter.com/MagicCraftGame"
            >
              <h4>
                <FaTwitter />
              </h4>
            </a>
            {/* Replaced Link with a */}
            <a
              className="footer__social--socialIcon"
              target="_blank"
              rel="noopener noreferrer"
              href="//www.instagram.com/magiccraftgame"
            >
              <h4>
                <FaInstagram />
              </h4>
            </a>
          </div>
        ) : null}
        <div className="footer__text__links">
          <a
            href="https://magiccraft.io/privacy-policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Privacy Policy
          </a>
          <a
            href="https://magiccraft.io/terms-of-use"
            target="_blank"
            rel="noreferrer noopener"
          >
            Terms and conditions
          </a>
          <a
            href="https://magiccraft.io/faq"
            target="_blank"
            rel="noreferrer noopener"
          >
            FAQ
          </a>
        </div>
        <h6>
          MAGICCRAFT is a registered trademark of MAGICCRAFT Inc. All Rights
          Reserved.
        </h6>

        <div className="footer__text-second">
          All contents of this website, unless otherwise credited, are copyright{' '}
          {currentYear} MAGICCRAFT Inc.
        </div>
      </div>

      {breakpoint.sm ? (
        <div className="footer__social">
           {/* Replaced Link with a */}
           <a
            className="footer__social--socialIcon"
            target="_blank"
            rel="noopener noreferrer"
            href="//discord.gg/magiccraftgame"
          >
            <h4>
              <FaDiscord />
            </h4>
          </a>
           {/* Replaced Link with a */}
           <a
            className="footer__social--socialIcon"
            target="_blank"
            rel="noopener noreferrer"
            href="//twitter.com/MagicCraftGame"
          >
            <h4>
              <FaTwitter />
            </h4>
          </a>
           {/* Replaced Link with a */}
           <a
            className="footer__social--socialIcon"
            target="_blank"
            rel="noopener noreferrer"
            href="//www.instagram.com/magiccraftgame"
          >
            <h4>
              <FaInstagram />
            </h4>
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default Footer; 