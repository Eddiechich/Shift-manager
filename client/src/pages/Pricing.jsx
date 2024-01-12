import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "./Home.css";
import "./Page.css";
import { BiCheckCircle } from "react-icons/bi";
import Image from "react-bootstrap/Image";
import homepageImage from "../images/homepageimage-removebg-preview.png";

export default function Pricing() {
  return (
    <>
     <Container className="pricing-page Page">
      <h1 className="text-center mb-5">תכניות מחיר</h1>
         <Container className="homepageContainer">
         <Row className="mb-4">
           <Col>
           <h2>למה לבחור במערכת זו?</h2>
             <ListGroup>
               <ListGroup.Item>
                 <BiCheckCircle
                   style={{ color: "green", marginLeft: "0.5rem" }}
                 />
                 יצירת שלד משמרות בלחיצת כפתור על בסיס אילוצי העובדים
               </ListGroup.Item>
               <ListGroup.Item>
                 <BiCheckCircle
                   style={{ color: "green", marginLeft: "0.5rem" }}
                 />
                 שלח עדכון בהודעת Whattsapp על משמרות צוות שפורסמו
               </ListGroup.Item>
               <ListGroup.Item>
                 <BiCheckCircle
                   style={{ color: "green", marginLeft: "0.5rem" }}
                 />
                 נהל את בקשות העובדים לחילופים,ימי חופשה ועדכון ימי מחלה
               </ListGroup.Item>
               <ListGroup.Item>
                 <BiCheckCircle
                   style={{ color: "green", marginLeft: "0.5rem" }}
                 />
                 העברת נהלים,הדרכות והסמכות עם אישור קריאה וחתימת עובד
               </ListGroup.Item>
               <ListGroup.Item>
                 <BiCheckCircle
                   style={{ color: "green", marginLeft: "0.5rem" }}
                 />
                 לוח הודעות ועדכונים שוטפים של הארגון
               </ListGroup.Item>
             </ListGroup>
           </Col>
           <Col>
             <Image src={homepageImage} alt="calender" fluid />
           </Col>
         </Row>
       </Container>
   
      <h2>לפניכם שלושה מסלולים שונים להצטרפות</h2>
      <Row>
        <Col>
          <Card className="pricingBox">
            <Card.Body>
              <Card.Title>תכנית בסיסית</Card.Title>
              <ul>
                <li>ניהול עד 10 עובדים</li>
                <li>לוחות זמנים יסודיים</li>
                <li>אין תמיכה מותאמת אישית</li>
              </ul>
              <Button variant="primary">היכנסו לתכנית</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="pricingBox">
            <Card.Body>
              <Card.Title>תכנית מתקדמת</Card.Title>
              <ul>
                <li>ניהול עד 50 עובדים</li>
                <li>לוחות זמנים מתקדמים</li>
                <li>תמיכה טלפונית 24/7</li>
              </ul>
              <Button variant="primary">היכנסו לתכנית</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="pricingBox">
            <Card.Body>
              <Card.Title>תכנית מתקדמת ביותר</Card.Title>
              <ul>
                <li>ניהול למספר בלתי מוגבל של עובדים</li>
                <li>לוחות זמנים עם אופציות מתקדמות</li>
                <li>תמיכה מותאמת אישית ופרימיום</li>
              </ul>
              <Button variant="primary">היכנסו לתכנית</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
       </>
  );
}
