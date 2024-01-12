import React, { useState } from "react";
import { login } from "../services/userService";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { VscSignIn } from "react-icons/vsc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Code to submit form data to backend or validate credentials
    try {
      const user = { email: email, password: password };
      console.log("login using: ", user);
      const response = await login(user);
      const isAdmin = response.isAdmin;
      toast.success("התחברת בהצלחה");
      console.log("Login successfully!");
      setTimeout(() => {
        if (isAdmin) {
          window.location = "/Dashboard";
        } else {
          window.location = "/UserDashboard";
        }
      }, 2500);
    } catch (error) {
      console.log("error...");
      if (error.response && error.response.status >= 400) {
        console.log("Invalid email or password");
        toast.error(`דוא"ל או סיסמה שגויים
        `); // activate an error TOAST message
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-wrapper">
        {showRegisterForm ? (
          <RegisterForm setShowRegisterForm={setShowRegisterForm} />
        ) : (
          <Form onSubmit={handleSubmit} className="login-form">
            <h1>ברוך הבא למערכת Shifter </h1>
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
                placeholder="הכנס סיסמא"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
            </Form.Group>

            <Button
              variant="primary"
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              התחבר <VscSignIn />
            </Button>
            <Button onClick={handleRegisterClick}>
              אם אינך רשום עדיין, לחץ כאן להרשמה
            </Button>
          </Form>
        )}
        <div className="image-container"></div>
      </div>
    </div>
  );
}
