import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const client = generateClient<Schema>();

export default function ChangeHours() {

    const [market, setMarket] = useState<Array<Schema["Market"]["type"]>>([]);
    const [open, setOpen] = useState(new Date());
    const [close, setClose] = useState("");

    //const [startDate, setStartDate] = useState(new Date());
    useEffect(() => {
        client.models.Market.observeQuery().subscribe({
            next: (data) => setMarket([...data.items]),
        });

    }, []);

    function editHours() {
        console.log(market);
        client.models.Market.create({
            open: open.toISOString(),
            close: close,

        })        
    }

    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Ready to change the hours of the market?</h1>
                <h2 className="text-muted">Current Time: </h2>
                <br/><br/>


                <h2>Change Hours</h2>
                <Form onSubmit={editHours}>
                    <Form.Group className="mb-3" controlId="hoursForm.ControlInput1">
                        <Form.Label className="text-muted">Opening Time:</Form.Label>
                        <DatePicker selected={open} onChange={(time) => setOpen(time)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption='Time' dateFormat="h:mm aa"/>       
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hoursForm.ControlInput2">
                        <Form.Label className="text-muted">Closing Time:</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="#" value={close} onChange={(e) => setClose(e.target.value)}/>    
                    </Form.Group>
                    <Button variant="outline-primary" id="hoursSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>
            </div>
        </Container>    
        
        //<DatePicker showIcon toggleCalendarOnIconClick isClearable selected={startDate} onChange={(date) => setStartDate(date)} />
    );
}