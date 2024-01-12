import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function RolesEditFormModal(props) {
  const [name, setName] = useState(props.role.name);
  const [color, setColor] = useState(props.role.color);

  const handleNameChange = (e) => setName(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);

  const handleSaveChanges = () => {
    const updatedRole = {
      ...props.role,
      name,
      color,
    };
    props.onSaveChanges(updatedRole);
    props.onClose();
  };
  return (
    <Modal show={props.show} onHide={props.onClose} dir="rtl">
      <Modal.Header closeButton></Modal.Header>
      <div className="d-flex justify-content-center">
        <Modal.Title>עריכת פרטי תפקיד</Modal.Title>
      </div>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>שם התפקיד:</Form.Label>
            <Form.Control
              type="text"
              placeholder="הכנס שם"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formColor">
            <Form.Label>צבע:</Form.Label>
            <Form.Control
              type="color"
              placeholder="הכנס צבע"
              value={color}
              onChange={handleColorChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={props.onClose}>
              סגירה
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              שמור שינויים
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
