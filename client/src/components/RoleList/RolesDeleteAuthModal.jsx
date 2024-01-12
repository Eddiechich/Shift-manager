import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function RolesDeleteAuthModal(props) {


  return (
    <Modal show={props.show} onHide={props.onClose}  dir="rtl">
    <Modal.Header closeButton>
    </Modal.Header>
    <div className="d-flex justify-content-center">

      <Modal.Title>אישור מחיקה</Modal.Title>
      </div>
    <Modal.Body className="d-flex justify-content-center">
      האם אתה בטוח שברצונך למחוק את התפקיד?
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-center">
      <Button variant="secondary" onClick={props.onClose}>
        ביטול
      </Button>
      <Button variant="primary" onClick={() => {
        props.onDelete(props.role)
        props.onClose()
      }}>
        אישור
      </Button>
    </Modal.Footer>
  </Modal>
    )
}
