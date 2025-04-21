import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function AddStocks() {

    const [stock, setStock] = useState<Array<Schema["Stock"]["type"]>>([]);
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [price, setPrice] = useState("");
    

    useEffect(() => {
        client.models.Stock.observeQuery().subscribe({
            next: (data) => setStock([...data.items]),
        });

    }, []); 
    
    function createStock() {
        console.log(stock);

        client.models.Stock.create({
            name: name,
            symbol: symbol,
            price: price,

        })
    }
    
    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Here you can add or remove stocks.</h1>
                <h2 className="text-muted">Current Total Number of Stocks:  </h2>
                <br/><br/>


                <h2>Add Stock</h2>
                <Form onSubmit={createStock}>
                    <Form.Group className="mb-3" controlId="stockForm.ControlInput1">
                        <Form.Label className="text-muted">Stock Name:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="ABCDEF Stock" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stockForm.ControlInput2">
                        <Form.Label className="text-muted">Stock Symbol:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Required, must 5 characters or less." value={symbol} 
                            onChange={(e) => setSymbol(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stockForm.ControlInput3">
                        <Form.Label className="text-muted">Stock Price:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Required, format: 00.00" value={price} 
                            onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Button variant="outline-primary" id="stockSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>

            </div>
        </Container>        
    );
}