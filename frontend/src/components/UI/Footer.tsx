import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrappper">
        <div className="footer-area footer-padding">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 text-center">
                <div className="footer-logo m-2">
                  <a href="#home">
                    <span>My</span> Trails<span>.</span>
                  </a>
                </div>
                <div className="main-menu2">
                  <span>Follow me on</span>
                </div>
                <div className="footer-social">
                  <a href="https://twitter.com" target="_blank" rel="noreferrer nofollow">
                    <FontAwesomeIcon icon={faTwitter} size="lg" style={{transform: "translateY(-1px)"}}/>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer nofollow">
                    <FontAwesomeIcon icon={faFacebook} size="lg" style={{transform: "translateY(-1px)"}}/>
                  </a>
                  <a href="https://www.instagram.com/saraninho.su/" target="_blank" rel="noreferrer nofollow">
                    <FontAwesomeIcon icon={faInstagram} size="lg" style={{transform: "translateY(-1px)"}}/>
                  </a>
                  <a href="https://www.linkedin.com/in/saran-suwannachatkul-337b099a/" target="_blank" rel="noreferrer nofollow">
                    <FontAwesomeIcon icon={faLinkedinIn} size="lg" style={{transform: "translateY(-1px)"}}/>
                  </a>
                </div>
                <div className="footer-copyright mt-2">
                    <span>&copy; 2023 Saran Suwannachatkul</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
