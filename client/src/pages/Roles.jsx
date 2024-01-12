import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import http from '../services/httpService'
import "./Page.css";
import RoleList from "../components/RoleList/RoleList";

export default function Roles() {
const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [newRole, setNewRole] = useState({ name: '', color: '' });


  const handleFullNameChange = (event) => {
    setName(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
        try {
          const role = { name, color}; // create an object with the form field values
         const response = await http.post('http://localhost:5000/api/roles/', role)
          toast.success("הוספת תפקיד חדש בהצלחה");
          console.log(`The role registration ${role.name} was successfully completed`);
          setNewRole(response.data)
          setShowCreateRoleModal(false)
          setName("")
          setColor("")
        } catch (error) {
          console.log(error);
          toast.error("הוספת תפקיד חדש נכשלה"); // activate an error TOAST message
        }
      };
  

  const handleCloseCreateRoleModal = () => setShowCreateRoleModal(false);
  const handleShowCreateRoleModal = () => setShowCreateRoleModal(true);
  return (
<div className="Page">
      <h1>ניהול תפקידים</h1>
      <Container>
        <Row className="mt-4 mb-4">
          <Col>
            <Link to="/Roles">
              <Button
                variant="primary"
                size="lg"
                block='true'
                onClick={handleShowCreateRoleModal}
              >
                <IoAddCircleSharp /> הוספת תפקיד חדש
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
          <RoleList newRole={newRole}></RoleList>
          </Col>
        </Row>
      </Container>
      <Modal show={showCreateRoleModal} onHide={handleCloseCreateRoleModal} dir="rtl">
        <Modal.Header closeButton className="align-items-center">
          <Modal.Title className="text-center w-100">
            הוספת תפקיד חדש
          </Modal.Title>
          <Button variant="link" className="ml-auto" onClick={handleCloseCreateRoleModal}>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRoleName">
              <Form.Label>שם התפקיד:</Form.Label>
              <Form.Control
                type="text"
                placeholder="הזן שם תפקיד"
                value={name}
                onChange={handleFullNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formColor">
              <Form.Label>בחר צבע:</Form.Label>
              <Form.Control
                type="color"
                value={color}
                onChange={handleColorChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" className="btn-block">
                שליחה
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>  )
}
