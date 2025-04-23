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
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


export default function Admin() {

    const {user} = useAuthenticator();
    const [stock, setStock] = useState<Array<Schema["Stock"]["type"]>>([]);
    const [time, setTime] = useState<Array<Schema["Markethours"]["type"]>>([]);

    useEffect(() => {
        client.models.Stock.observeQuery().subscribe({
          next: (data) => setStock([...data.items]),
        });

    }, []); 

    useEffect(() => {
      client.models.Markethours.observeQuery().subscribe({
        next: (data) => setTime([...data.items]),
      });

  }, []); 

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
            {stock.map((s) => (
              <Accordion.Item eventKey={s.id}>
                  <Accordion.Header>
                      <Col>{s.name}</Col> 
                      <Col>{s.price}</Col>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover responsive>
                      <thead><tr><th>Company Name</th><th>Symbol</th><th>Price</th><th>Volume</th><th>Mentions</th></tr></thead>
                      <tbody>
                        <tr>
                          <td>{s.name}</td>
                          <td>{s.symbol}</td>
                          <td>{s.price}</td>
                          <td>{s.volume}</td>
                          <td>{s.mentions}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>
              ))}   
            </Accordion>

          </Card.Body>
        </Card>
  
        <Card className="mb-5">
          <Card.Header><h4>🕒 Market Hours</h4></Card.Header>
          <Card.Body>
          <Accordion>
          {time.map((t, index) => (
              <Accordion.Item eventKey="">
                  <Accordion.Header>
                      <Col>Time Change #{index}</Col> 
                      <Col>Date of Change: {t.createdAt.slice(0,9)}</Col>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover responsive>
                      <thead><tr><th>Time When Altered</th><th>Time Open</th><th>Time Close</th></tr></thead>
                      <tbody>
                      <tr>
                        <td>{t.createdAt}</td>
                        <td>{t.open}</td>
                        <td>{t.close}</td>
                      </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>
              ))}    
            </Accordion>
          </Card.Body>
        </Card>
  
      </Container>
    );
  }