// src/Contact.js
import React from "react";

function Contact() {
  return (
    <section className="contact-section mt-5 pt-4">
      <h2 className="text-center mb-4">Contact us</h2>

      <div className="row g-4">
        {/* Infos de contact */}
        <div className="col-12 col-md-5">
          <p>Contact us and we will get back to you within 24 hours.</p>
          <ul className="list-unstyled contact-info">
            <li>
              <i className="fa-solid fa-building me-2"></i>Company Name
            </li>
            <li>
              <i className="fa-solid fa-phone me-2"></i>+256 778 800 900
            </li>
            <li>
              <i className="fa-solid fa-envelope me-2"></i>company@gmail.com
            </li>
          </ul>
        </div>

        {/* Formulaire */}
        <div className="col-12 col-md-7">
          <form className="contact-form">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Comment</label>
              <textarea rows="4" className="form-control"></textarea>
            </div>
            <button type="submit" className="btn btn-contact w-100">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
