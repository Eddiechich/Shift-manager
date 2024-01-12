import React from "react";
// import "./Page.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import systemImage from "../images/33995-removebg-preview.png";

export default function About() {
  return (
    <Container className="Page">
      <Row>
        <Col>
          <div className="about-content">
            <h1>על מערכת ניהול המשמרות שלנו</h1>
            <p>
              מערכת ניהול המשמרות שלנו נועדה לייעל את תהליך ניהול וארגון המשמרות
              עבור הארגון שלך. בין אם אתה עסק קטן או עסק גדול, המערכת שלנו מספקת
              את הכלים הדרושים לך לניהול יעיל של לוחות זמנים של עובדים, לטפל
              בהחלפת משמרות ולהבטיח תפעול חלק.
            </p>
            <p>
              עם הממשק הידידותי למשתמש והתכונות החזקות שלנו, אתה יכול בקלות
              ליצור ולהקצות משמרות, לעקוב אחר זמינות העובדים ולטפל בבקשות
              לחופשה. המערכת שלנו מציעה גם התראות ותזכורות אוטומטיות, שומרות על
              מודיעין לכולם ומפחיתה התנגשויות תזמון.
            </p>
            
          </div>
        </Col>
        <Col>
          <Image src={systemImage} alt="Shift Management System" fluid />
        </Col>
      </Row>
      <Row>
        <Col>
            <h3>היתרונות של מערכת ניהול המשמרות שלנו</h3>
              <ul className="custom-list">
              <li><span>נהל ביעילות את לוחות הזמנים של העובדים</span></li>
      <li><span>החלפות והחלפות משמרות אופטימליות</span></li>
      <li><span>עקוב אחר זמינות עובדים ובקשות לחופשה</span></li>
      <li><span>התראות ותזכורות אוטומטיות</span></li>
      <li><span>צמצם התנגשויות תזמון ושגיאות</span></li>
      <li><span>תקשורת ושיתוף פעולה משופרים</span></li>
      <li><span>שפר את הפרודוקטיביות ואת היעילות התפעולית</span></li>
              </ul>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
