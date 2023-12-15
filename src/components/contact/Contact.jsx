import { useRef } from "react";
import "./contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.SERVICE_REACT_APP, process.env.TEMPLATE_REACT_APP, e.target, process.env.CODE_REACT_APP)
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${"contact"}`}>
        <div className={"section"}>
          <form ref={form} onSubmit={sendEmail}>
            <div className="card">
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </div>
          </form>

          <div className={"details"}>
            <div cardClass={"card2"}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={"icons"}>
                <span>
                  <FaPhoneAlt />
                  <p>+12 345 6789</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>example@business.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>USA Los Angles</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Radwan</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;