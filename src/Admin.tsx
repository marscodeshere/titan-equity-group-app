//import React, { useState, useEffect } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Container,
  Row,
  Form,
  Table,
  Card,
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
            <Form className="mb-4">
              <Row>
                {/*<Col md={2}><Form.Control placeholder="Ticker" value={newStock.ticker} onChange={(e) => setNewStock({ ...newStock, ticker: e.target.value })} /></Col>
                <Col md={3}><Form.Control placeholder="Company" value={newStock.companyName} onChange={(e) => setNewStock({ ...newStock, companyName: e.target.value })} /></Col>
                <Col md={2}><Form.Control type="number" placeholder="Price" value={newStock.price} onChange={(e) => setNewStock({ ...newStock, price: e.target.value })} /></Col>
                <Col md={2}><Form.Control type="number" placeholder="Volume" value={newStock.volume} onChange={(e) => setNewStock({ ...newStock, volume: e.target.value })} /></Col>
                <Col md={3}><Button className="w-100" onClick={handleAddStock} disabled={!isMarketOpen || !editingEnabled}>Add Stock</Button></Col>*/}
              </Row>
            </Form>
            <Table striped bordered hover responsive>
              <thead><tr><th>Ticker</th><th>Company</th><th>Price</th><th>Volume</th><th>Actions</th></tr></thead>
              <tbody>
                {/*{stocks.map((stock) => (
                  <tr key={stock.id}>
                    {editingStockId === stock.id ? (
                      <>
                        <td><Form.Control value={editedStock.ticker} onChange={(e) => setEditedStock({ ...editedStock, ticker: e.target.value })} /></td>
                        <td><Form.Control value={editedStock.companyName} onChange={(e) => setEditedStock({ ...editedStock, companyName: e.target.value })} /></td>
                        <td><Form.Control type="number" value={editedStock.price} onChange={(e) => setEditedStock({ ...editedStock, price: e.target.value })} /></td>
                        <td><Form.Control type="number" value={editedStock.volume} onChange={(e) => setEditedStock({ ...editedStock, volume: e.target.value })} /></td>
                        <td><Button size="sm" variant="success" onClick={handleSaveEdit}>Save</Button></td>
                      </>
                    ) : (
                      <>
                        <td>{stock.ticker}</td>
                        <td>{stock.companyName}</td>
                        <td>${stock.price.toFixed(2)}</td>
                        <td>{stock.volume.toLocaleString()}</td>
                        <td>
                          <Button 
                            size="sm" 
                            variant="outline-primary" 
                            onClick={() => editingEnabled && handleEditStock(stock.id)} 
                            className="me-2" 
                            disabled={!isMarketOpen || !editingEnabled}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline-danger" 
                            onClick={() => editingEnabled && handleDeleteStock(stock.id)} 
                            disabled={!isMarketOpen || !editingEnabled}
                          >
                            Delete
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}*/}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
  
        <Card className="mb-5">
          <Card.Header><h4>🕒 Market Hours</h4></Card.Header>
          <Card.Body>
            {/*{editingHours ? (
              <Row className="align-items-end">
                <Col md={4}><Form.Group><Form.Label>Open Time</Form.Label><Form.Control type="time" value={marketHours.open} onChange={(e) => setMarketHours({ ...marketHours, open: e.target.value })} /></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Close Time</Form.Label><Form.Control type="time" value={marketHours.close} onChange={(e) => setMarketHours({ ...marketHours, close: e.target.value })} /></Form.Group></Col>
                <Col md={4}><Button className="w-100" onClick={handleSaveMarketHours}>Save Hours</Button></Col>
              </Row>
            ) : (
              <Row className="align-items-center">
                <Col md={8}><p className="fs-5">Market is open from <strong>{marketHours.open}</strong> to <strong>{marketHours.close}</strong>{!isMarketOpen && <span className="text-danger ms-3">Market is currently closed</span>}</p></Col>
                <Col md={4}><Button className="w-100" onClick={() => setEditingHours(true)}>Edit Hours</Button></Col>
              </Row>
            )}*/}
          </Card.Body>
        </Card>
  
        <Card className="mb-5">
          <Card.Header><h4>📜 Admin Activity Logs</h4></Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search logs by user or action..."
                /*value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}*//>
            </Form.Group>
            <Table striped bordered hover responsive>
              <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Details</th></tr></thead>
              <tbody>
                {/*{filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>{log.details || "-"}</td>
                  </tr>
                ))}*/}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    );
  }