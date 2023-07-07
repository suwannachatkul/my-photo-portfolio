import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ContactForm.module.css";

const initialState = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const captcha = useRef<ReCAPTCHA>(null);
  const [{ name, email, message }, setParamState] = useState(initialState);
  const [sendingState, setSendingState] = useState<String | null>(null);
  const [captchaToken, setCaptchaToken] = useState<String | null>(null);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setParamState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => {
    setParamState({ ...initialState });
    captcha.current!.reset();
    setCaptchaToken(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captchaToken) {
      setSendingState("sending");
      const emailsJSParams = {
        name: name,
        email: email,
        message: message,
        "g-recaptcha-response": captchaToken,
      };
      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID!,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
          emailsJSParams,
          process.env.REACT_APP_EMAILJS_PUBLICKEY!
        )
        .then(
          (result) => {
            setSendingState("success");
            clearState();
          },
          (error) => {
            setSendingState("error");
          }
        );
    }
  };

  function handleCaptchaChange(token: string | null) {
    setCaptchaToken(token);
  }
  return (
    <div className={"container pt-5 " + styles["contact-form-area"]}>
      <div className="col-md-12">
        <div className="row">
          <div className={styles["section-title"]}>
            <h2>Contact me</h2>
            <p>
              Please fill out the form below to send me an email and I will get
              back to you as soon as possible.
            </p>
          </div>
          <form
            name="sentMessage"
            onSubmit={handleSubmit}
            className="col-md-10 justify-content-center"
          >
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles["form-control"]}
                    placeholder="Name"
                    required
                    onChange={handleChange}
                    value={name}
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles["form-control"]}
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={email}
                  />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                id="message"
                className={styles["form-control"]}
                rows={8}
                placeholder="Message"
                required
                onChange={handleChange}
                value={message}
              ></textarea>
              <p className="help-block text-danger"></p>
            </div>
            <div id="success"></div>
            <ReCAPTCHA
              ref={captcha}
              sitekey={process.env.REACT_APP_CATCHPA_SITEKEY!}
              onChange={handleCaptchaChange}
            />
            <button
              type="submit"
              disabled={!captchaToken || sendingState === "sending"}
              className="btn btn-custom btn-lg"
            >
              Send Message
            </button>
            {sendingState === "sending" && (
              <div className={"spinner-border align-middle mx-3"} role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {sendingState === "success" && (
              <span className={"mx-3 " + styles["success-transition"]}>
                <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
                {"  "}Message Sent!
              </span>
            )}
            {sendingState === "error" && (
              <span className={"mx-3 " + styles["success-transition"]}>
                <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
                {"  "}Sending Error, plase try again!
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
