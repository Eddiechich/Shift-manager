import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function UseresDeleteAuthModal(props) {


  return (
    <Modal show={props.show} onHide={props.onClose}  dir="rtl">
    <Modal.Header closeButton>
    </Modal.Header>
    <div className="d-flex justify-content-center">

      <Modal.Title>אישור מחיקה</Modal.Title>
      </div>
    <Modal.Body className="d-flex justify-content-center">
      האם אתה בטוח שברצונך למחוק את המשתמש?
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-center">
      <Button variant="secondary" onClick={props.onClose}>
        ביטול
      </Button>
      <Button variant="primary" onClick={() => {
        props.onDelete(props.user)
        props.onClose()
      }}>
        אישור
      </Button>
    </Modal.Footer>
  </Modal>
    )
}
