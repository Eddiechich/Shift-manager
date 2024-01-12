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

import { addHours } from "../../../services/timeService";

export default function ShiftForm({ handleSaveNewShift,handleModal }) {
  const currentDate = new Date();
  const currentDateString = `${currentDate.getFullYear()}-${(
    "0" +
    (currentDate.getMonth() + 1)
  ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  const currentTimeString = currentDate.toLocaleTimeString().slice(0, 5);

  const [shiftName, setShiftName] = useState("משמרת בוקר");
  const [startDate, setStartDate] = useState(currentDateString);
  const [startTime, setStartTime] = useState(currentTimeString);
  const [endDate, setEndDate] = useState(currentDateString);
  const [endTime, setEndTime] = useState(addHours(currentTimeString, 1));
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([0, 2, 4]); // Sunday, Tuesday, Thursday
  const [repeatEveryWeek, setRepeatEveryWeek] = useState(false);
  const [shiftStatus, setShiftStatus] = useState("open");
  const [numShiftManagers, setNumShiftManagers] = useState(1);
  const [numSecurityGuards, setNumSecurityGuards] = useState(1);

  const daysOfWeek = [
    "יוֹם רִאשׁוֹן",
    "יוֹם שֵׁנִי",
    "יוֹם שְׁלִישִׁי",
    "יום רביעי",
    "יוֹם חֲמִישִׁי",
    "יוֹם שִׁישִׁי",
    "יום שבת",
  ];
  const handleSaveNewShiftFunc = (e) => {
    e.preventDefault();

    const selectedDayNames = selectedDaysOfWeek.map(
      (dayIndex) => daysOfWeek[dayIndex]
    );

    // Create the new shift object
    const newShift = {
      title: shiftName,
      start: new Date(startDate + " " + startTime),
      end: new Date(endDate + " " + endTime),
      selectedDays: selectedDayNames,
      repeatEveryWeek,
      shiftStatus,
      numShiftManagers,
      numSecurityGuards,
    };
    handleSaveNewShift(newShift);
    handleModal()
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleDayCheckboxChange = (dayIndex) => {
    if (selectedDaysOfWeek.includes(dayIndex)) {
      setSelectedDaysOfWeek(
        selectedDaysOfWeek.filter((day) => day !== dayIndex)
      );
    } else {
      setSelectedDaysOfWeek([...selectedDaysOfWeek, dayIndex]);
    }
  };
  return (
    <Form dir="rtl">
      <Form.Group>
        <Form.Label>שם המשמרת:</Form.Label>
        <Form.Control
          type="text"
          placeholder="לדוגמא: 'משמרת בוקר'"
          value={shiftName}
          onChange={(e) => setShiftName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>תאריך ושעת התחלה:</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              required
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>תאריך ושעת סיום:</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              required
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>חזרה בימים נוספים במהלך השבוע:</Form.Label>
        <div>
          {daysOfWeek.map((day, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={day}
              checked={selectedDaysOfWeek.includes(index)}
              onChange={() => handleDayCheckboxChange(index)}
            />
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>מספר מנהלי משמרות:</Form.Label>
        <Form.Control
          type="number"
          value={numShiftManagers}
          onChange={(e) => setNumShiftManagers(parseInt(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>מספר מאבטחים:</Form.Label>
        <Form.Control
          type="number"
          value={numSecurityGuards}
          onChange={(e) => setNumSecurityGuards(parseInt(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="חזור כל שבוע"
          checked={repeatEveryWeek}
          onChange={(e) => setRepeatEveryWeek(e.target.checked)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>מצב משמרת:</Form.Label>
        <Form.Control
          as="select"
          value={shiftStatus}
          onChange={(e) => setShiftStatus(e.target.value)}
        >
          <option value="open">פתוחה</option>
          <option value="closed">סגורה</option>
        </Form.Control>
      </Form.Group>
      <div className="d-flex justify-content-center mt-3">
      <Button variant="primary" onClick={handleSaveNewShiftFunc}>
        שמור
      </Button>
      </div>
    </Form>
  );
}
