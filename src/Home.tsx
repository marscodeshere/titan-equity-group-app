import Marquee from "react-fast-marquee";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const features: { title: string; desc: string }[] = [
  { title: "Real-Time Trading", desc: "Instant market access." },
  { title: "Portfolio Tracking", desc: "Manage your investments." },
  { title: "Market Insights", desc: "AI-driven analytics." },
];

export default function Home(): JSX.Element {
  const [stock, setStock] = useState<Array<Schema["Stock"]["type"]>>([]);
  const [market, setMarket] = useState<Array<Schema["Market"]["type"]>>([]);

  useEffect(() => {
      client.models.Stock.observeQuery().subscribe({
        next: (data) => setStock([...data.items]),
      });

  }, []); 

  useEffect(() => {
      client.models.Market.observeQuery().subscribe({
        next: (data) => setMarket([...data.items]),
      });

  }, []);

  return (
    <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
      {/* Stock Ticker */}
      <div className="w-100 bg-dark text-white text-center py-2">
        <Marquee>
          {stock.map((s) => (
            <span key={s.id} className="mx-3">
              {s.symbol}: ${s.price}{" "}
              <span className={s.change?.includes("-") ? "text-danger" : "text-success"}>
                ({s.change})
              </span>
            </span>
        
          ))}
        </Marquee>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Your Wealth, Your Future -- Powered by Titan.</h1>
        <p className="text-muted">Rise Above. Invest Like a Titan.</p>
        <Button variant="primary" size="lg">Get Started</Button>
      </div>

      {/* Market Overview */}
      <Card className="w-100 shadow-sm mb-4" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="h5 mb-3">Market Snapshot</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={market}>
              <XAxis dataKey="time" stroke="#888" />
              <YAxis domain={[4400, 4700]} stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Features Section */}
      <Container>
        <Row className="g-3">
          {features.map((feature, index) => (
            <Col key={index} md={4}>
              <Card className="p-3 text-center shadow-sm">
                <Card.Body>
                  <h5>{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
