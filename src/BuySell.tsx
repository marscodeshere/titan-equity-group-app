import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Container,
  Col,
  Table,
  Card,
  Accordion,
  Button,
  Modal,
  Form,
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

    const [buyShow, setBuyShow] = useState(false);
    const handleBuyClose = () => setBuyShow(false);
    const handleBuyShow = () => setBuyShow(true);

    const [sellShow, setSellShow] = useState(false);
    const handleSellClose = () => setSellShow(false);
    const handleSellShow = () => setSellShow(true);

    var owner = "No";
    var ownShare = "0";
    const [stockIndex, setStockIndex] = useState("");

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
        console.log(stockIndex);
        console.log(stock[Number(stockIndex)].name)
        console.log(stock);
        handleBuyClose();
    }

    
    {/*function sellStock() {
        console.log("test");
        handleSellClose();
    }*/}
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
                                        <Button variant="primary" onClick={handleBuyShow}>
                                            Buy {s.name}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="primary" onClick={handleSellShow}>
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

            <Modal show={buyShow} onHide={handleBuyClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered
                className='shadow-lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Modal.Title>Select a Stock</Modal.Title>
                    <br/>
                    <Form.Select aria-label="Default select example" id="buySelect" name="buySelect" value={stockIndex} onChange={(e) => setStockIndex(e.target.value)}>
                        {stock.map((s, index) => (
                            <option value={index}>{s.name}</option>
                        ))}    
                    </Form.Select>
                    <br/><br/>
                    <Form.Group className="mb-3" controlId="sellForm.ControlInput1">
                        <Modal.Title>How much would you like to invest?</Modal.Title>
                        <br/>
                        <Form.Control type="text" placeholder="00.00" autoFocus/>
                    </Form.Group>
                    <Button variant="secondary" onClick={handleBuyClose}>Cancel</Button>
                    <Button variant="outline-primary" onClick={buyStock}>Confirm Purchase</Button>    
                </Form>                     
                </Modal.Body>

            </Modal>

            <Modal show={sellShow} onHide={handleSellClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered
                className="shadow-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Sell Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Select aria-label="Default select example">
                        <option>Stocks Available to Sell</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <br/><br/>
                    <Form.Group className="mb-3" controlId="sellForm.ControlInput1">
                        <Modal.Title>How much would you like to sell?</Modal.Title>
                        <br/>
                        <Form.Control type="text" placeholder="00.00" autoFocus/>
                    </Form.Group>
                </Form> 
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleSellClose}>Cancel</Button>
                        <Button variant="outline-primary" onClick={handleSellClose}>Confirm Sale</Button>
                </Modal.Footer>
            </Modal>
        </Container>

        
    )
}