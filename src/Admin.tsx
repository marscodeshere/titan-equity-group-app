//import React, { useState, useEffect } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Container,
  Col,
  Table,
  Card,
  Accordion
} from "react-bootstrap";
//import {Col,Button, Alert,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Admin() {

    const {user} = useAuthenticator();

    return (
        <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🛠️ Admin Dashboard</h2>
          <div>
            <span className="me-3">Welcome, {user?.signInDetails?.loginId}</span>
          </div>
        </div>
  
        <Card className="mb-5">
          <Card.Header><h4>📈 Stock Management</h4></Card.Header>
          <Card.Body>
            <Accordion>
              <Accordion.Item eventKey="">
                  <Accordion.Header>
                      <Col>Name</Col> 
                      <Col>Price</Col>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover responsive>
                      <thead><tr><th>Company Name</th><th>Symbol</th><th>Price</th><th>Volume</th><th>Actions</th></tr></thead>
                      <tbody>

                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>   
            </Accordion>

          </Card.Body>
        </Card>
  
        <Card className="mb-5">
          <Card.Header><h4>🕒 Market Hours</h4></Card.Header>
          <Card.Body>
          <Accordion>
              <Accordion.Item eventKey="">
                  <Accordion.Header>
                      <Col>Time Change #</Col> 
                      <Col>Date of Change</Col>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover responsive>
                      <thead><tr><th>Current Time</th><th>Dates Closed</th><th>Time Open</th><th>Time Close</th></tr></thead>
                      <tbody>

                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>   
            </Accordion>
          </Card.Body>
        </Card>
  
      </Container>
    );
  }