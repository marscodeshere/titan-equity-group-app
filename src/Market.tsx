{/*import { useState } from "react";*/}
import { Container, Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
var indices;

const marketMovers = [
  { symbol: "AAPL", last: "$175.32", change: "+3.45%", volume: "78M" },
  { symbol: "TSLA", last: "$720.12", change: "-5.20%", volume: "105M" },
  { symbol: "NVDA", last: "$498.80", change: "+2.12%", volume: "92M" },
];

const globalMarkets = [
  { name: "Nikkei 225", value: "32,100.50", change: "+1.50%" },
  { name: "DAX (Germany)", value: "15,780.20", change: "-0.80%" },
  { name: "Crude Oil", value: "$85.12", change: "+2.30%" },
];

const trendingStocks = [
  { symbol: "AMC", last: "$14.50", mentions: "45K" },
  { symbol: "GME", last: "$22.80", mentions: "55K" },
  { symbol: "TSLA", last: "$720.12", mentions: "60K" },
];

const economicEvents = [
  { date: "Oct 15", event: "CPI Inflation Report", forecast: "+3.8%", previous: "+4.0%" },
  { date: "Oct 20", event: "Fed Interest Rate Decision", forecast: "5.50%", previous: "5.25%" },
];

export default function MarketOverview() {
  const [stock, setStock] = useState<Array<Schema["Stock"]["type"]>>([]);

  useEffect(() => {
      client.models.Stock.observeQuery().subscribe({
        next: (data) => setStock([...data.items]),
      });

  }, []);
  
  function findIndices() {
    indices = stock;
    indices.sort((a, b) => Number(b.value) - Number(a.value));
    console.log(indices);
  }

  findIndices()
  return (
    <Container fluid className="py-5 text-white text-center">
      <h2 className="text-light mb-4">Market Overview</h2>

      {/* Centered Layout for Widgets */}
      <div className="d-flex flex-column align-items-center">
        {/* First Row: Market Indices, Market Movers, Global Markets */}
        <div className="d-flex justify-content-center flex-wrap w-100">
          {/*{visibleWidgets["market-indices"] && (*/}
            <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "30%" }}>
              <h5>Market Indices</h5>
              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Price</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((s) => (
                    <tr key={s.name}>
                      <td>{s.name}</td>
                      <td>{s.price}</td>
                      <td style={{ color: s.change?.includes("-") ? "red" : "green" }}>{s.change}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          {/*)}*/}

          {/*{visibleWidgets["market-movers"] && (*/}
            <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "30%" }}>
              <h5>Market Movers</h5>
              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Last</th>
                    <th>Change</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {marketMovers.map((mover) => (
                    <tr key={mover.symbol}>
                      <td>{mover.symbol}</td>
                      <td>{mover.last}</td>
                      <td style={{ color: mover.change.includes("-") ? "red" : "green" }}>{mover.change}</td>
                      <td>{mover.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          {/*)}*/}

          {/*{visibleWidgets["global-markets"] && (*/}
            <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "30%" }}>
              <h5>Global Markets</h5>
              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Value</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {globalMarkets.map((market) => (
                    <tr key={market.name}>
                      <td>{market.name}</td>
                      <td>{market.value}</td>
                      <td style={{ color: market.change.includes("-") ? "red" : "green" }}>{market.change}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          {/*)}*/}
        </div>

        {/* Second Row: Trending Stocks, Economic Events */}
        <div className="d-flex justify-content-center flex-wrap w-100">
          {/*{visibleWidgets["trending-stocks"] && (*/}
            <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "45%" }}>
              <h5>Trending Stocks</h5>
              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Last Price</th>
                    <th>Mentions</th>
                  </tr>
                </thead>
                <tbody>
                  {trendingStocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.last}</td>
                      <td>{stock.mentions}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          {/*)}*/}

          {/*{visibleWidgets["economic-events"] && (*/}
            <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "45%" }}>
              <h5>Economic Events</h5>
              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Forecast</th>
                    <th>Previous</th>
                  </tr>
                </thead>
                <tbody>
                  {economicEvents.map((event) => (
                    <tr key={event.date}>
                      <td>{event.date}</td>
                      <td>{event.event}</td>
                      <td>{event.forecast}</td>
                      <td>{event.previous}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          {/*)}*/}
        </div>
      </div>
    </Container>
  );
}