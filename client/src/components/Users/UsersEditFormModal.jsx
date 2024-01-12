import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import RolelistDropDown from "../RoleList/RolelistDropDown";

export default function UsersEditFormModal(props) {
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState(props.user.password);
  const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassowrdChange = (e) => setPassword(e.target.value);
  const handleIsAdminChange = (e) => setIsAdmin(e.target.checked);
  const [isRoleSelected, setIsRoleSelected] = useState(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setIsRoleSelected(true);
  };
  const handleSaveChanges = () => {
    if (!isRoleSelected) {
      alert("אנא בחר תפקיד לפני שליחת הטופס.");
      return;
    }
    const updatedUser = {
      ...props.user,
      name,
      email,
      password,
      isAdmin,
      roles: [selectedRole]
    };
    console.log(updatedUser);
    props.onSaveChanges(updatedUser);
    props.onClose();
  };
  return (
    <Modal show={props.show} onHide={props.onClose} dir="rtl">
      <Modal.Header closeButton></Modal.Header>
      <div className="d-flex justify-content-center">
        <Modal.Title>עריכת פרטי משתמש</Modal.Title>
      </div>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>שם מלא:</Form.Label>
            <Form.Control
              type="text"
              placeholder="הכנס שם מלא"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="הכנס כתובת אימייל תקינה"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>סיסמא:</Form.Label>
            <Form.Control
              minLength={6}
              type="password"
              placeholder="הכנס סיסמא"
              value={password}
              onChange={handlePassowrdChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-start mt-2">
           <RolelistDropDown
           onChange={handleRoleChange}/>
          </div>
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
          <div className="d-flex justify-content-between  mt-4">
            <Button variant="primary" onClick={handleSaveChanges}>
              שמור שינויים
            </Button>
            <Button variant="secondary" onClick={props.onClose}>
              סגור
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
