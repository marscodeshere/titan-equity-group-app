import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Accordion from "react-bootstrap/Accordion";
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

//const balance = 200.01
const client = generateClient<Schema>();

export default function UserTransaction() {
    const [transaction, setTransaction] = useState<Array<Schema["Transaction"]["type"]>>([]);
    const [portfolio, setPortfolio] =  useState<Array<Schema["Portfolio"]["type"]>>([]);

    console.log(portfolio.length);
    console.log(portfolio);
    
    let oldBal;
    
    

    useEffect(() => {
        client.models.Transaction.observeQuery().subscribe({
          next: (data) => setTransaction([...data.items]),
        });

        client.models.Portfolio.observeQuery().subscribe({
            next: (data) => setPortfolio([...data.items]),
          });
    }, []);   
    
    function createDeposits() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let transAmount = window.prompt("Transaction amount:");

        client.models.Transaction.create({
            type: "deposit",
            amount: transAmount, 
            date: `${year}-${month}-${date}`
        });

        if(portfolio.length === 0) {
            client.models.Portfolio.create({                
            });
            client.models.Portfolio.create({
                balance: transAmount,
            })
        } else {

            oldBal = Number(portfolio?.slice(-1)[0].balance);

            if(oldBal < Number(transAmount)) {
                window.alert("Unable to withdraw. Balance too low for that amount.");
            }
            else {
                oldBal = oldBal + Number(transAmount);
                client.models.Portfolio.create({  
                    balance: oldBal.toString(),              
                });
            }
            
            
            console.log("balance: " + portfolio.at(-1)?.balance);
        }
        
      }

      function createWithdraw() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let transAmount = window.prompt("Transaction amount:");

        client.models.Transaction.create({
            type: "withdraw",
            amount: transAmount, 
            date: `${year}-${month}-${date}`
        });
        
        if(portfolio.length === 0) {
            client.models.Portfolio.create({                
            });
            window.alert("Unable to withdraw. Balance too low for that amount.");    
            
        } else {

            oldBal = Number(portfolio?.slice(-1)[0].balance);

            if(oldBal < Number(transAmount)) {
                window.alert("Unable to withdraw. Balance too low for that amount.");
            }
            else {
                oldBal = oldBal - Number(transAmount);
                client.models.Portfolio.create({  
                    balance: oldBal.toString(),              
                });
            }
            
            
            console.log("balance: " + portfolio.at(-1)?.balance);
        }
      }


    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Ready to make a transaction?</h1>
                <h2 className="text-muted">Account Balance: ${oldBal}</h2>
                <br/><br/>


                <h2>Add Funds</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="depositForm.ControlInput1">
                        <Form.Label className="text-muted">Deposit Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" />
                    </Form.Group>
                    <Button variant="outline-primary" id="depositSubmit" as="input" type="button" value="Submit" onClick={createDeposits}/>
                </Form>
                <br/><br/>

                <h2>Withdraw Funds</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="withdrawForm.ControlInput1">
                        <Form.Label className="text-muted">Withdraw Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" />
                    </Form.Group>
                    <Button variant="outline-primary" id="withdrawSubmit" as="input" type="button" value="Submit" onClick={createWithdraw}/>
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