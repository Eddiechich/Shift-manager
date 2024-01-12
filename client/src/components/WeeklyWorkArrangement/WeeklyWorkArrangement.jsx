import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment/locale/he";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import ShiftForm from "./ShiftForm/ShiftForm";

export default function WeeklyWorkArrangement() {
  const [showModal, setShowModal] = useState(false);
  const [newShift, setNewShift] = useState(null);

  const [events, setEvents] = useState([
    {
      title: "משמרת בוקר",
      start: new Date(2023, 5, 19, 9, 0),
      end: new Date(2023, 5, 19, 13, 0),
    },
    // Add more events as needed
  ]);

  const [workArrangements, setWorkArrangements] = useState([
    {
      date: new Date(2023, 5, 19),
      shift: "משמרת בוקר",
      details: "נא לוודא התייצבות לתדריך בטיחות טרם העליה לעמדות האבטחה",
    },
    // Add more work arrangements as needed
  ]);

  const handleSaveNewShift = (newShift) => {
    setNewShift(newShift);
    console.log(newShift);

    // Update events state with the new shift
    setEvents((prevEvents) => [...prevEvents, newShift]);

    // Create a new work arrangement based on the new shift
    const newWorkArrangement = {
      date: newShift.start,
      shift: newShift.title,
      details: "Add shift details here",
    };

    // Update workArrangements state with the new work arrangement
    setWorkArrangements((prevWorkArrangements) => [
      ...prevWorkArrangements,
      newWorkArrangement,
    ]);
  };

  const localizer = momentLocalizer(moment);

  const calendarTranslations = {
    today: "היום",
    month: "חודש",
    week: "שבוע",
    day: "יום",
    agenda: "סדר יום",
    date: "תאריך",
    time: "זמן",
    event: "אירוע",
    allDay: "כל היום",
    previous: "חזור",
    next: "הבא",
    noEventsInRange: "אין אירועים בטווח זמן זה",
    showMore: "הצג עוד",
  };

  const CalendarWithDragAndDrop = withDragAndDrop(Calendar);

  const moveEvent = ({ event, start, end }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
  };

  const resizeEvent = ({ event, start, end }) => {
    const index = events.indexOf(event);
    const newEvents = [...events];
    const newEvent = { ...event, start, end };
    newEvents.splice(index, 1, newEvent);
    setEvents(newEvents);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container className="Page">
      <Row>
        <Col>
          <Button onClick={handleModal}>הוסף משמרת עבודה</Button>
          <Modal show={showModal} onHide={handleModal} dir="rtl">
            <Modal.Header closeButton></Modal.Header>
            <div className="d-flex justify-content-center">
              <Modal.Title>הוסף משמרת עבודה</Modal.Title>
            </div>

            <Modal.Body>
              <ShiftForm
                handleSaveNewShift={handleSaveNewShift}
                handleModal={handleModal}
              />
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              {/* <Button variant="primary" onClick={handleSave}>שמור</Button> */}
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>יומן סידור עבודה</h1>
          <CalendarWithDragAndDrop
            localizer={localizer}
            events={events}
            rtl={true}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={calendarTranslations}
            defaultView="week"
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            resizable
            
          />
        </Col>
        <Col md={6}>
          <h2 style={{ marginBottom: "32px" }}>טבלת סידורי עבודה</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>משמרת</th>
                <th>פרטי המשמרת</th>
                <th>עריכה</th>
              </tr>
            </thead>
            <tbody>
              {workArrangements.map((workArrangement) => (
                <tr key={workArrangement.date.getTime()}>
                  <td>{moment(workArrangement.date).format("LL")}</td>
                  <td>{workArrangement.shift}</td>
                  <td>{workArrangement.details}</td>
                  <td>
                    <button>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
