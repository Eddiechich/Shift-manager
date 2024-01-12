import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 999) {
        setIsFooterVisible(false);
      } else {
        setIsFooterVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsFooterVisible(false);
  };

  const handleMouseLeave = () => {
    setIsFooterVisible(true);
  };

  return (
    <footer
      className={`footer ${isFooterVisible ? "" : "hide-footer"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <Row>
          <Col className="text-center">
            <ul className="social-media-icons">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={30} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={30} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="text-muted">
              © {new Date().getFullYear()} Eddie Moran All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
