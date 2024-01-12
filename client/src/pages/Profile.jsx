import React, { useContext, useState } from "react";

import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { getJWT } from "../services/userService";
import { toast } from "react-toastify";
import http from "../services/httpService";
import { Link } from "react-router-dom";

export default function Profile(props) {
  const { userData } = useContext(AuthContext);
  const [name, setName] = useState(userData?.name || ""); // Safely access the name property of userData
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState(userData?.password || "");
  const [imgUrl, setImgUrl] = useState(userData?.imgUrl || "");
  const [preImg, setPreImg] = useState("");


  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassowrdChange = (e) => setPassword(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUrl(file);
    setPreImg(URL.createObjectURL(file))
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imgUrl", imgUrl);
  console.log(...formData);
    try {
      const token = getJWT();
      const reqHeaders = {
        "x-auth-token": token,
        "Content-Type": "multipart/form-data",
      };
      await http.patch(
        `http://localhost:5000/api/users/${userData?._id}`,
        formData,
        { headers: reqHeaders }
      );
      console.log(formData);
      console.log(`Updating ${userData?.name} user has been success !`);
      setTimeout(() => {
        toast.success("המשתמש עודכן בהצלחה");
        window.location = "/UserDashboard";
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("אירעה שגיאה בעת עדכון המשתמש");
    }
  };
  
  
  return (
    <ProtectedRoute allowedRoles={["all"]}>
      <>
        <div className="member-dashboard">
          {userData ? (
            <React.Fragment>
              <Container>
                <h1>עריכת פרופיל אישי</h1>

                <Row className="d-flex justify-content-center">
                  <Col xs={6}>
                    <Form encType="multipart/form-data">
                      {userData && (
                        <Card style={{ width: "18rem", marginBottom: "20px" }}>
                          <Card.Img
                            variant="top"
                            src={preImg ? preImg : userData?.imgUrl}
                            alt="Pre image"
                          />
                        </Card>
                      )}
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
                          autoComplete="username"
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
                          autoComplete="current-password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 form-group "
                        controlId="formGroupFile"
                      >
                        <Form.Label> תמונה:</Form.Label>
                        <Form.Control
                          type="file"
                          name="imgUrl"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                      <Row className="d-flex justify-content-center  mt-4">
                        <Col>
                          <Link to="/UserDashboard">
                            <Button variant="secondary">חזור</Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button variant="primary" onClick={handleSaveChanges}>
                            שמור שינויים
                          </Button>
                        </Col>
                      </Row>
                    </Form>
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
