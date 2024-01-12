import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import "./RegisterForm.css";
import { signup } from "../../services/userService";
 import { TfiBackLeft } from "react-icons/tfi";

// import http from "../../services/httpService";
// import dotenv from "dotenv";
// dotenv.config();

export default function RegisterForm(props) {
  // Define state variables for the register form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password, name }; // create an object with the form field values
      await signup(user);
      toast.success("נרשמת בהצלחה!");
      console.log("register success !");

      // Go back to login page and refresh the app
      setTimeout(() => {
        window.location = "/";
      }, 5000);
    } catch (error) {
      console.log(error);
      toast.error("ההרשמה נכשלה"); // activate an error TOAST message
    }
  };

  const handleGoToLoginClick = () => {
    props.setShowRegisterForm(false);
  };
  return (
    <Form onSubmit={handleSubmit} className="register-form">
      <h1>הרשמה למערכת</h1>
      <Form.Group controlId="formBasicName">
        <Form.Control
          type="name"
          placeholder="רשום שם מלא"
          value={name}
          onChange={handleNameChange}
          required
          minLength={5}

        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="הכנס אימייל"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="הקלד סיסמא"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength={6}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        הרשם
      </Button>
      <div className="switch-form-container">
        <Button onClick={handleGoToLoginClick}> <TfiBackLeft/> חזור לטופס התחברות</Button>
      </div>
    </Form>
  );
}
