import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocationDot,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

export const Contact = () => {
  return (
    <div className={styles["contact-wrapper"]}>
      <div className={styles["contact-area"]}>
        <div className={styles["contact-area-start"]}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-5">
                <h2 className={styles["contact-title"]}>
                  Let<span>'</span>s <br />
                  <span>Get</span> In Touch
                </h2>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className={styles["contact-info"]}>
                  <p>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="lg"
                      className="mx-2"
                    />
                    Email
                  </p>
                  <a
                    href="mailto:suwannachatkul.s@gmail.com"
                    className={styles["text-contact-info"]}
                  >
                    suwannachatkul.s@gmail.com
                  </a>
                </div>
                <div className={styles["contact-info"]}>
                  <p>
                    <FontAwesomeIcon
                      icon={faSquarePhone}
                      size="lg"
                      className="mx-2"
                    />
                    Phone
                  </p>
                  <span className={styles["text-contact-info"]}>
                    (+81) 808 116 5299
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className={styles["contact-info"]}>
                  <p>
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      size="lg"
                      className="mx-2"
                    />{" "}
                    Address
                  </p>
                  <span className={styles["text-contact-info"]}>
                    114-0014 Tokyo Kita-ku Tabata
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};
