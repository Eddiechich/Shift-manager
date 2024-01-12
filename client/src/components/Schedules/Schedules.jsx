import React from "react";
import { Card, ListGroup } from 'react-bootstrap';

export default function Schedules() {
  return (
    <Card>
      <Card.Header>Schedules</Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>Schedule 1</ListGroup.Item>
          <ListGroup.Item>Schedule 2</ListGroup.Item>
          <ListGroup.Item>Schedule 3</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
