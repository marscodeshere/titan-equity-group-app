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

    const [market, setMarket] = useState<Array<Schema["Markethours"]["type"]>>([]);
    const [days, setDays] = useState<Array<Schema["Marketdays"]["type"]>>([]);
    const [open, setOpen] = useState(new Date());
    const [close, setClose] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([new Date()]);
    var [currentTime, setCurrentTime] = useState(new Date());
    var stringDates = "";
    var mon = "";

    useEffect(() => {
        client.models.Markethours.observeQuery().subscribe({
            next: (data) => setMarket([...data.items]),
        });

    }, []);

    useEffect(() => {
        client.models.Marketdays.observeQuery().subscribe({
            next: (data) => setDays([...data.items]),
        });

    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);    

    function editHours() {

        window.alert("Are the times of: Open: " + open.toLocaleTimeString() + " and Close: " + close.toLocaleTimeString() + " Correct?");

        client.models.Markethours.create({
            open: open.toLocaleTimeString(),
            close: close.toLocaleTimeString(),

        })        
    }

    function selectDays() {
        for(let i=0; i<selectedDates.length; i++) {
            mon = selectedDates[i].toString().substring(4,15).replace(/\s/g,"/") + ",";
            stringDates += mon;
        }
        window.alert(stringDates);  
        console.log(market,days);
        
        client.models.Marketdays.create({
            closedays: stringDates,
        }) 
    }

    return (
        <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
            <div className="text-center mb-8">
                <h1>Ready to change the hours of the market?</h1>
                <h2 className="text-muted">Current Time: {currentTime.toLocaleTimeString()}</h2>
                <br/><br/>


                <h2>Change Hours</h2>
                <Form onSubmit={editHours}>
                    <Form.Group className="mb-3" controlId="hoursForm.ControlInput1">
                        <Form.Label className="text-muted">Opening Time:  </Form.Label>
                        <DatePicker selected={open} onChange={(time) => time && setOpen(time)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption='Time' dateFormat="h:mm aa"/>       
                        <br/>
                        <Form.Label className="text-muted">Closing Time:</Form.Label>
                        <DatePicker selected={close} onChange={(time) => time && setClose(time)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption='Time' dateFormat="h:mm aa"/>
                    </Form.Group>
                    <Button variant="outline-primary" id="hoursSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>

                <h2>Select Days the Market is Closed</h2>
                <Form onSubmit={selectDays}>
                    <Form.Group className="mb-3" controlId="daysForm.ControlInput1">
                        <Form.Label className="text-muted">Select Dates:  </Form.Label>
                        <DatePicker showIcon toggleCalendarOnIconClick selectedDates={selectedDates} selectsMultiple onChange={(time) => time && setSelectedDates(time)} shouldCloseOnSelect={false} disabledKeyboardNavigation/>
                    </Form.Group>
                    <Button variant="outline-primary" id="daysSubmit" as="input" type="submit"/>
                </Form>
                <br/><br/>
            </div>
        </Container>    
        
    );
}