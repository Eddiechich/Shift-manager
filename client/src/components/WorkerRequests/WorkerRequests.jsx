import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function WorkerRequests() {
  return (
    <Card>
      <Card.Header>Worker Requests</Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>Request 1</ListGroup.Item>
          <ListGroup.Item>Request 2</ListGroup.Item>
          <ListGroup.Item>Request 3</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
