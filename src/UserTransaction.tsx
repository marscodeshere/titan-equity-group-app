import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Accordion from "react-bootstrap/Accordion";
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const balance = 200.01
const client = generateClient<Schema>();

/*const transactionHistData = [
    {date: "03/17/2025", type: "Deposit", amount: 100.00},
    {date: "03/17/2025", type: "Purchased Stock", amount: 50.00, stock: "GOOGL"},
    {date: "03/16/2025", type: "Deposit", amount: 100.00},
    {date: "03/17/2025", type: "Sold Stock", amount: 50.00, stock: "MSFT"},
    {date: "03/15/2025", type: "Withdraw", amount: 100.00},
    {date: "03/14/2025", type: "Purchased Stock", amount: 100.00, stock: "AAPL"}
]*/

export default function UserTransaction() {
    const [transaction, setTransaction] = useState<Array<Schema["Transaction"]["type"]>>([]);

    useEffect(() => {
        client.models.Stock.observeQuery().subscribe({
          next: (data) => setTransaction([...data.items]),
        });
    }, []);   
    
    function createTransactions() {
        client.models.Transaction.create({ amount: window.prompt("Transaction amount:") });
      }
      
    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Ready to make a transaction?</h1>
                <h2 className="text-muted">Account Balance: ${balance}</h2>
                <br/><br/>


                <h2>Add Funds</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="depositForm.ControlInput1">
                        <Form.Label className="text-muted">Deposit Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" />
                    </Form.Group>
                    <Button variant="outline-primary" id="depositSubmit" as="input" type="button" value="Submit" onClick={createTransactions}/>
                </Form>
                <br/><br/>

                <h2>Withdraw Funds</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="withdrawForm.ControlInput1">
                        <Form.Label className="text-muted">Withdraw Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" />
                    </Form.Group>
                    <Button variant="outline-primary" id="withdrawSubmit" as="input" type="button" value="Submit"/>
                </Form>
                <br/><br/>
            </div>

            
            <h1>Transaction History</h1>
            <Accordion>
                {transaction.map((trans) => (
                    <Accordion.Item eventKey={trans.id}>
                        <Accordion.Header>
                            <Col>{trans.date}</Col> 
                            <Col>{trans.type}</Col>
                        </Accordion.Header>
                        <Accordion.Body>
                        <Col>Amount: {trans.amount}</Col> 
                        <Col>{trans.stock}</Col>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
  }