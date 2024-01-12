import React from 'react';

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import http from "../services/httpService";

import "./ContactUs.css";
export default function ConatctUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const validateName = (value) => {
    if (!value) {
      return "שדה חובה";
    }
    if (value.length < 2 || value.length > 20) {
      return "השם חייב להיות בין 2 ל-20 תווים";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value) {
      return "שדה חובה";
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      return "כתובת אימייל לא תקינה";
    }
    return "";
  };

  const validatePhone = (value) => {
    if (!value) {
      return "שדה חובה";
    }
    // Add additional phone number validation logic if needed
    return "";
  };

  const validateMessage = (value) => {
    if (!value) {
      return "שדה חובה";
    }
    if (value.length < 2 || value.length > 100) {
      return "הודעה חייבת להיות בין 2 ל-100 תווים";
    }
    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const messageError = validateMessage(message);

    // Update errors state
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError,
    });

    // Check if there are any errors
    if (!nameError && !emailError && !phoneError && !messageError) {
      try {
        // Create the data object with the input values
        const data = {
          name,
          email,
          phone,
          message,
        };

        // Make the POST request using http services
         await http.post(
          "http://localhost:5000/api/contact-form/messages",
          data
        );

        // Show success toast message
        toast.success("ההודעה שלך נשלחה בהצלחה. נחזור אליך בהקדם!");

        setTimeout(() => {
          // Redirect to '/' route
          window.location = "/";
        }, 5000);
        // Clear the form fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch (error) {
        // Show error toast message
        toast.error("שגיאה בהגשת הטופס. בבקשה נסה שוב.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="d-flex align-items-center">
          <div className="form">
            <div className="contact-info">
              <h3 className="title">יצירת קשר</h3>
              <h4 className="text">
                התקשרו אלינו כדי לקבוע פגישה או לשאול שאלות בנוגע לניהול המשמרות
                שלכם.
              </h4>

              <div className="info">
                <div className="information">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                  <p>רחוב שוהם 10, רמת גן</p>
                </div>
                <div className="information">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <p>office@Shifter.com</p>
                </div>
                <div className="information">
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <p>02-456-789</p>
                </div>
              </div>

              <div className="social-media ">
                <h4>עקבו אחרינו ברשתות החברתיות(:</h4>
                <div className="social-icons d-flex justify-content-center">
                  <a href="https://www.facebook.com">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a href="https://www.twitter.com">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="https://www.instagram.com">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="https://www.linkedin.com">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <Form onSubmit={handleSubmit} autoComplete="off">
              <h3 className="title">נשמח לשמוע ממך...</h3>
              <div className="input-container">
                <Form.Label>שם משתמש</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </div>
              <div className="input-container">
                <Form.Label>אימייל</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </div>
              <div className="input-container">
                <Form.Label>טלפון</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </div>
              <div className="input-container textarea">
                <Form.Label>הודעה</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  className="input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </div>
              <Button type="submit" className="btn-submit">
                שלח
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
