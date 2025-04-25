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

    function buyStock() {
        console.log("test");
        handleShow();
    }
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
                                <thead><tr><th>Company Name</th><th>Symbol</th><th>Price</th><th>Volume</th></tr></thead>
                                <tbody>
                                    <tr>
                                    <td>{s.name}</td>
                                    <td>{s.symbol}</td>
                                    <td>{s.price}</td>
                                    <td>{s.volume}</td>
                                    </tr>
                                </tbody>
                                <thead><tr><th>Owns</th><th>Shares</th><th>Buy</th><th>Sell</th></tr></thead>
                                <tbody>
                                    <tr>
                                    <td>{owner}</td>
                                    <td>{ownShare}</td>
                                    <td>
                                        <Button variant="primary" onClick={buyStock}>
                                            Buy {s.name}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="primary" onClick={buyStock}>
                                            Sell {s.name}
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
                    
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="outline-primary" onClick={handleClose}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container>

        
    )
}