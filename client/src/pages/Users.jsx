import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsersList from "../components/Users/UsersList";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import http from '../services/httpService'

import "./Page.css";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUser, setNewUser] = useState(null);

  const handleFullNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleIsAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
        try {
          const user = { email, password, name,isAdmin }; // create an object with the form field values
         const response = await http.post('http://localhost:5000/api/users/register', user)

          toast.success("הוספת משתמש חדש בהצלחה");
          console.log(`The registeration of ${user.fullName} success!`);
          setNewUser(response.data)
          setShowModal(false)
          setName("")
          setEmail("")
          setPassword("")
          setIsAdmin("")
        } catch (error) {
          console.log(error);
          toast.error("ההרשמה נכשלה"); // activate an error TOAST message
        }
      };
  

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return (
    <div className="Page">
      <h1>ניהול משתמשים</h1>
      <Container>
        <Row className="mt-4 mb-4">
          <Col>
            <Link to="/Users">
              <Button
                variant="primary"
                size="lg"
                block='true'
                onClick={handleShowModal}
              >
                <IoAddCircleSharp /> הוספת משתמש חדש
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <UsersList newUser={newUser}></UsersList>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} dir="rtl">
        <Modal.Header closeButton className="align-items-center">
          <Modal.Title className="text-center w-100">
            הוספת משתמש חדש
          </Modal.Title>
          <Button variant="link" className="ml-auto" onClick={handleCloseModal}>
            {/* <IoCloseSharp /> */}
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>שם מלא:</Form.Label>
              <Form.Control
                type="text"
                placeholder="הזן שם מלא"
                value={name}
                onChange={handleFullNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>כתובת דוא"ל:</Form.Label>
              <Form.Control
                type="email"
                placeholder='הזן כתובת דוא"ל'
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>סיסמה:</Form.Label>
              <Form.Control
                type="password"
                placeholder="הזן סיסמה"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-start mt-2">
              <Form.Group controlId="formIsAdmin">
                <Form.Check
                  type="checkbox"
                  label="האם המשתמש הוא מנהל?"
                  checked={isAdmin}
                  onChange={handleIsAdminChange}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" className="btn-block">
                שליחה
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
