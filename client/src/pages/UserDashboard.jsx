import React, { useContext } from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./UserDashboard.css";

import { AuthContext } from "../context/authContext";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function UserDashboard(props) {
  const { userData } = useContext(AuthContext);
  return (
    <ProtectedRoute allowedRoles={["all"]}>
      <>
        <div className="member-dashboard">
          {userData ? (
            <React.Fragment>
              <Container>
                {props.user && props.user.name && (
                  <h1>שלום {props.user.name}, מה ברצונך לעשות?</h1>
                )}
                <Row className="mt-4 mb-4">
                  <Col>
                    <Button as={Link} to="/Profile">
                      <FaUser className="icon" />
                      ערוך פרופיל
                    </Button>
                  </Col>
                  <Col>
                    <Button as={Link} to="/availability">
                      <FaCalendarAlt className="icon" />
                      זמינות
                    </Button>
                  </Col>
                  <Col>
                    <Button as={Link} to="/shifts">
                      <FaClock className="icon" />
                      משמרות שנקבעו
                    </Button>
                  </Col>
                </Row>
                <Row className="dashboard-Overview">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title>סקירה כללית</Card.Title>
                        <ListGroup>
                          <ListGroup.Item>
                            <strong>סה"כ משמרות לחודש הקרוב</strong>: 50
                            <br />
                            משמרות שהושלמו: 35
                            <br />
                            ימי חופש שנוצלו: 15
                            <br />
                            ימי מחלה שנוצלו: 15
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title>המשמרות הקרובה</Card.Title>
                        <ListGroup>
                          <ListGroup.Item>
                            <strong>תאריך:</strong> 10 ביוני 2023
                            <br />
                            <strong>שעה:</strong> 9:00 - 17:00
                            <br />
                            <strong>מיקום:</strong> שער כניסה
                            <br />
                            <strong>צוות מוקצה:</strong> לימור אבני,עידו כהן
                          </ListGroup.Item>
                          {/* הוסף פריטי רשימה נוספים לכל משמרת */}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title>התראות ועדכונים</Card.Title>
                        <ListGroup>
                          <ListGroup.Item variant="danger">
                            המשמרת ל-5 ביוני בוטלה.
                          </ListGroup.Item>
                          <ListGroup.Item variant="warning">
                            תזכורת: המשמרת שלך ב-12 ביוני מתחילה ב-10:00 בבוקר.
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </React.Fragment>
          ) : (
            "משהו השתבש..."
          )}
        </div>
      </>
    </ProtectedRoute>
  );
}
