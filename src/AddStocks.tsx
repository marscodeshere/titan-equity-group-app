import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';

export default function AddStocks() {

    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Here you can add or remove stocks.</h1>
                <h2 className="text-muted">Account Balance: </h2>
                <br/><br/>


                <h2>Add Funds</h2>
                <Form >
                    <Form.Group className="mb-3" controlId="depositForm.ControlInput1">
                        <Form.Label className="text-muted">Deposit Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00" />
                    </Form.Group>
                    <Button variant="outline-primary" id="depositSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>

                <h2>Withdraw Funds</h2>
                <Form >
                    <Form.Group className="mb-3" controlId="withdrawForm.ControlInput1">
                        <Form.Label className="text-muted">Withdraw Amount:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="00.00"  />
                    </Form.Group>
                    <Button variant="outline-primary" id="withdrawSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>
            </div>
        </Container>        
    );
}