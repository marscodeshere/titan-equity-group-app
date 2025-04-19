import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Accordion from "react-bootstrap/Accordion";
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function UserTransaction() {
    const [transaction, setTransaction] = useState<Array<Schema["Transaction"]["type"]>>([]);
    const [depo, setDepo] = useState("");
    const [withdraw, setWithdraw] = useState("");
    
    let oldBal;
    let currentBal;
    
    useEffect(() => {
        client.models.Transaction.observeQuery().subscribe({
          next: (data) => setTransaction([...data.items]),
        });

    }, []);   
    
    function createDeposits() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        console.log("depo amount: " + depo);
        console.log("old balance: "+ transaction[transaction.length - 1]?.balance);

        if(transaction.length === 0) {
            client.models.Transaction.create({
                type: "deposit",
                amount: depo, 
                date: `${year}-${month}-${date}`,
                balance: `${depo}`,
                success: true,
            });
            currentBal = transaction[transaction.length - 1]?.balance;
                
        } else {

            oldBal = Number(transaction[transaction.length - 1].balance);
            oldBal = oldBal + Number(depo);
            client.models.Transaction.create({
                type: "deposit",
                amount: depo, 
                date: `${year}-${month}-${date}`,
                balance: `${oldBal.toString()}`,
                success: true,
            });
            currentBal = transaction[transaction.length - 1]?.balance;
            oldBal = "";
        }    
    }

    function createWithdraw() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        oldBal = Number(transaction[transaction.length - 1].balance);

        console.log("withdraw amount: " + depo);
        console.log("old balance: "+ oldBal);
        
        if(transaction.length === 0) {
            client.models.Transaction.create({
                type: "withdraw",
                amount: withdraw, 
                date: `${year}-${month}-${date}`,
                balance: `${oldBal.toString()}`,
                success: false,
            });
            currentBal = transaction[transaction.length - 1]?.balance;
            oldBal = "";
            window.alert("Unable to withdraw. Balance too low for that amount.");    
            
        } else {
            if(oldBal < Number(withdraw)) {
                client.models.Transaction.create({
                    type: "withdraw",
                    amount: withdraw, 
                    date: `${year}-${month}-${date}`,
                    balance: `${oldBal.toString()}`,
                    success: false,
                });
                currentBal = transaction[transaction.length - 1]?.balance;
                oldBal = "";
                window.alert("Unable to withdraw. Balance too low for that amount.");
            }
            else {
                oldBal = oldBal - Number(withdraw);
                client.models.Transaction.create({
                    type: "withdraw",
                    amount: withdraw, 
                    date: `${year}-${month}-${date}`,
                    balance: `${oldBal.toString()}`,
                    success: true,
                });
                currentBal = transaction[transaction.length - 1]?.balance;
                oldBal = "";
            }
                    
        }
    }


    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Ready to make a transaction?</h1>
                <h2 className="text-muted">Account Balance: ${currentBal}</h2>
                <br/><br/>


                <h2>Add Funds</h2>
                <Form onSubmit={createDeposits}>
                    <Form.Group className="mb-3" controlId="depositForm.ControlInput1">
                        <Form.Label className="text-muted">Deposit Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" value={depo} onChange={(e) => setDepo(e.target.value)}/>
                    </Form.Group>
                    <Button variant="outline-primary" id="depositSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>

                <h2>Withdraw Funds</h2>
                <Form onSubmit={createWithdraw}>
                    <Form.Group className="mb-3" controlId="withdrawForm.ControlInput1">
                        <Form.Label className="text-muted">Withdraw Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" value={withdraw} onChange={(e) => setWithdraw(e.target.value)}/>
                    </Form.Group>
                    <Button variant="outline-primary" id="withdrawSubmit" as="input" type="submit"/>
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
                        <Col>Transaction: {trans.success ? "Success" : "Failure"}</Col>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
  }