import { Container, Card, Accordion, Button, Modal, Form, Table, Col, Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function BuySell() {
    const [stock, setStock] = useState<Array<Schema["Stock"]["type"]>>([]);
    const [account, setAccount] = useState<Array<Schema["Account"]["type"]>>([]);
    const [ownedStock, setOwnedStock] = useState<Array<Schema["Ownedstock"]["type"]>>([]);
    
    const [buyShow, setBuyShow] = useState(false);
    const [sellShow, setSellShow] = useState(false);
    const [stockBuyIndex, setStockBuyIndex] = useState(0);
    const [shareBuyAmount, setShareBuyAmount] = useState(0);
    const [stockSellIndex, setStockSellIndex] = useState(0);
    const [shareSellAmount, setShareSellAmount] = useState(0);
    const [toastMessage, setToastMessage] = useState("");

        useEffect(() => {
            const stockSub = client.models.Stock.observeQuery().subscribe({
              next: (data) => setStock([...data.items]),
            });

            const accountSub = client.models.Account.observeQuery().subscribe({
                next: (data) => setAccount([...data.items]),
            });

            const ownedStockSub = client.models.Ownedstock.observeQuery().subscribe({
                next: (data) => setOwnedStock([...data.items]),
            });

            return () => {
                stockSub.unsubscribe();
                accountSub.unsubscribe();
                ownedStockSub.unsubscribe();
              };
    
        }, []); 

    const handleBuyClose = () => setBuyShow(false);
    const handleBuyShow = (index: number) => {
        setStockBuyIndex(index);
        setShareBuyAmount(0);
        setBuyShow(true);
    }

    const handleSellClose = () => setSellShow(false);
    const handleSellShow = (index: number) => {
        setStockSellIndex(index);
        setShareSellAmount(0);
        setSellShow(true);
      };

    async function buyStock() {

        //selected
        const selected = stock[stockBuyIndex];
        if (!selected || shareBuyAmount <= 0 || isNaN(shareBuyAmount)) return;

        //transaction and account section
        let transAmount = Number(selected.price) * shareBuyAmount;
        let userAccount = account[0];
        if (!userAccount || Number(userAccount.balance) < transAmount) return;

        const existing = ownedStock.find((o) => o.stockId === selected.id);

        if (existing) {
            await client.models.Ownedstock.update({
              id: existing.id,
              shares: (Number(existing.shares) + shareBuyAmount).toFixed(2),
            });
          } else {
            await client.models.Ownedstock.create({
              stockId: selected.id,
              stockName: selected.name,
              currentPrice: selected.price,
              shares: shareBuyAmount.toFixed(2),
              owns: true,
            });
          }

          await client.models.Transaction.create({
            type: "buystock",
            amount: transAmount.toFixed(2),
            date: new Date().toISOString(),
            stock: selected.name,
            owns: true,
            success: true,
            stockId: selected.id,
            shares: shareBuyAmount.toFixed(2),
          });
      
          await client.models.Account.update({
            id: userAccount.id,
            balance: (Number(userAccount.balance) - transAmount).toFixed(2),
            accountvalue: (Number(userAccount.accountvalue) + transAmount).toFixed(2),
          });
      
          setToastMessage(`Bought ${shareBuyAmount} share(s) of ${selected.name}!`);
          setBuyShow(false);
    }

    async function sellStock() {
        const selected = stock[stockSellIndex];
        const holding = ownedStock.find((o) => o.stockId === selected.id);
        if (!holding || shareSellAmount <= 0 || Number(holding.shares) < shareSellAmount) return;
    
        const totalGain = Number(selected.price) * shareSellAmount;
        const newShareCount = Number(holding.shares) - shareSellAmount;
    
        if (newShareCount === 0) {
          await client.models.Ownedstock.delete({ id: holding.id });
        } else {
          await client.models.Ownedstock.update({
            id: holding.id,
            shares: newShareCount.toFixed(2),
          });
        }
    
        await client.models.Transaction.create({
          type: "sellstock",
          amount: totalGain.toFixed(2),
          date: new Date().toISOString(),
          stock: selected.name,
          owns: false,
          success: true,
          stockId: selected.id,
          shares: shareSellAmount.toFixed(2),
        });
    
        const userAccount = account[0];
        await client.models.Account.update({
          id: userAccount.id,
          balance: (Number(userAccount.balance) + totalGain).toFixed(2),
          accountvalue: (Number(userAccount.accountvalue) - totalGain).toFixed(2),
        });
    
        setToastMessage(`Sold ${shareSellAmount} share(s) of ${selected.name}!`);
        setSellShow(false);
      }

      
  const availableShares = (stockId: string) => {
    const owned = ownedStock.find((o) => o.stockId === stockId);
    return owned ? Number(owned.shares) : 0;
  };
   
    return(
        <Container className="py-4">
            <h1 className="text-white text-center mb-4">Time to Engage</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">               
                <br/><br/>
                <h2 className="text-muted">Account Balance: ${account.length===1 ? account[0].balance : "0.00"}</h2>
                    <br/><br/>
            </div>
    
            <Card className="mb-5">
                <Card.Header><h4>Available Stocks</h4></Card.Header>
                <Card.Body>
                    <Accordion>
                    {stock.map((s, index) => (
                    <Accordion.Item eventKey={s.id}>
                        <Accordion.Header>
                            <Col>{s.name}</Col> 
                            <Col>{s.price}</Col>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table responsive>
                                <thead><tr><th>Company Name</th><th>Symbol</th><th>Buy</th><th>Sell</th></tr></thead>
                                <tbody>
                                    <tr>
                                    <td>{s.name}</td>
                                    <td>{s.symbol}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleBuyShow(index)}>
                                            Buy {s.name}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleSellShow(index)}>
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

            {/* Buy Modal */}
            <Modal show={buyShow} onHide={handleBuyClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Modal.Title>How many shares would you like to purchase?</Modal.Title>
                        <br/>
                        <Form.Control type="text" placeholder="#0" autoFocus value={shareBuyAmount} onChange={(e) => setShareBuyAmount(Number(e.target.value))}/>
                    </Form.Group>
                    <br/>
                    <Modal.Title>That many shares will cost: {(shareBuyAmount * Number(stock[stockBuyIndex]?.price)).toFixed(2) || "0.00"}</Modal.Title>
                    <br/>
                    <Modal.Title className='text-muted'>Your account balance is: ${account.length===1 ? account[0].balance : "0.00"}</Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBuyClose}>Cancel</Button>
                    <Button variant="outline-primary" onClick={buyStock}>Confirm Purchase</Button> 
                </Modal.Footer>
            </Modal>

            {/* Sell Modal */}
            <Modal show={sellShow} onHide={handleSellClose} centered>
                <Modal.Header closeButton><Modal.Title>Sell Stock</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>You currently own {availableShares(stock[stockSellIndex]?.id)} shares of {stock[stockSellIndex]?.name}</Form.Label>
                        <Form.Control type="text" placeholder="#0" value={shareSellAmount} onChange={(e) => setShareSellAmount(Number(e.target.value))} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSellClose}>Cancel</Button>
                    <Button variant="outline-primary" onClick={sellStock}>Confirm Sell</Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Message */}
            <ToastContainer position="bottom-center" className="mb-4">
                <Toast show={!!toastMessage} onClose={() => setToastMessage("")} delay={2500} autohide bg="success">
                <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>

        
    )
}