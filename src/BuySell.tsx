import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Container,
  Col,
  Table,
  Card,
  Accordion,
  Button,
  Modal,
} from "react-bootstrap";
//import {Col,Button, Alert,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function BuySell() {
    const {user} = useAuthenticator();
    const [stock, setStock] = useState<Array<Schema["Stock"]["type"]>>([]);
    const [account, setAccount] = useState<Array<Schema["Account"]["type"]>>([]);
    const [transaction, setTransaction] = useState<Array<Schema["Transaction"]["type"]>>([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var owner = "No";
    var ownShare = "0";

        useEffect(() => {
            client.models.Stock.observeQuery().subscribe({
              next: (data) => setStock([...data.items]),
            });
    
        }, []);

        useEffect(() => {
            client.models.Transaction.observeQuery().subscribe({
                next: (data) => setTransaction([...data.items]),
            });
    
        }, []);   
    
            
        useEffect(() => {
            client.models.Account.observeQuery().subscribe({
                next: (data) => setAccount([...data.items]),
            });
    
        }, []); 
    console.log(transaction);
    return(
        <Container className="py-4">
            <h1 className="text-white text-center mb-4">Time to Engage</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">               
                <br/><br/>
                <h2 className="text-muted">Account Balance: ${account.length===1 ? account[0].balance : "0"}</h2>
                    <br/><br/>
                <div>
                    <span className="me-3">Welcome, {user?.signInDetails?.loginId?.split("@")[0]}</span>
                </div>
            </div>
    
            <Card className="mb-5">
                <Card.Header><h4>Available Stocks</h4></Card.Header>
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
                                <thead><tr><th>Owns</th><th>Shares</th><th>Actions</th></tr></thead>
                                <tbody>
                                    <tr>
                                    <td>{owner}</td>
                                    <td>{ownShare}</td>
                                    <td>
                                        <Button variant="primary" onClick={handleShow}>
                                            Launch static backdrop modal
                                        </Button>
                                    </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    ))}   
                    </Accordion>

                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    I will not close if you click outside me. Do not even try to press
                    escape key.
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </Container>

        
    )
}