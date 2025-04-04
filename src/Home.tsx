import Marquee from "react-fast-marquee";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
{/*import { useEffect, useState } from "react";
import { type Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";*/}

type MarketDataType = {
  time: string;
  value: number;
};

type StockDataType = {
  symbol: string;
  price: number;
  change: string;
};

const marketData: MarketDataType[] = [
  { time: "9AM", value: 4500 },
  { time: "10AM", value: 4550 },
  { time: "11AM", value: 4525 },
  { time: "12PM", value: 4600 },
  { time: "1PM", value: 4625 },
  { time: "2PM", value: 4590 },
];

const stockTickerData: StockDataType[] = [
  { symbol: "AAPL", price: 150.25, change: "+1.5%" },
  { symbol: "GOOGL", price: 2803.55, change: "-0.8%" },
  { symbol: "TSLA", price: 720.22, change: "+2.1%" },
  { symbol: "AMZN", price: 3500.99, change: "-1.2%" },
  { symbol: "MSFT", price: 305.15, change: "+0.6%" },
];

const features: { title: string; desc: string }[] = [
  { title: "Real-Time Trading", desc: "Instant market access." },
  { title: "Portfolio Tracking", desc: "Manage your investments." },
  { title: "Market Insights", desc: "AI-driven analytics." },
];

export default function Home(): JSX.Element {
  return (
    <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-5">
      {/* Stock Ticker */}
      <div className="w-100 bg-dark text-white text-center py-2">
        <Marquee>
          {stockTickerData.map((stock, index) => (
            <span key={index} className="mx-3">
              {stock.symbol}: ${stock.price}{" "}
              <span className={stock.change.includes("-") ? "text-danger" : "text-success"}>
                ({stock.change})
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
            <LineChart data={marketData}>
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
