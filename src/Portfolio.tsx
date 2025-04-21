import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useAuthenticator} from "@aws-amplify/ui-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

export default function Portfolio() {
  const {user} = useAuthenticator();
  const fallbackName = user?.signInDetails?.loginId?.split("@")[0];
  const displayName = fallbackName || "Guest";
  const totalPortfolioValue = "$125,782.35";
  const portfolioHistory = [120000, 121500, 123000, 124200, 125000, 126500, 125782];

  // Generate mock dates for X-axis
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString();
  });

  // Top 3 Watch Stocks
  const watchStocks = [
    { symbol: "GOOGL", lastPrice: "$2,785.15", change: "+1.75%" },
    { symbol: "AMZN", lastPrice: "$3,290.05", change: "-0.58%" },
    { symbol: "MSFT", lastPrice: "$305.22", change: "+0.91%" }
  ];

  // Purchased Stocks
  const purchasedStocks = [
    { symbol: "AAPL", quantity: 10, price: "$175.32" },
    { symbol: "TSLA", quantity: 5, price: "$720.12" },
    { symbol: "NVDA", quantity: 8, price: "$498.80" }
  ];

  // Graph Data
  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: portfolioHistory,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center mt-4">
      {/* Portfolio Card */}
      <Card className="m-3 p-3 bg-dark text-light w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center">
          <h2 className="fw-bold">{displayName}'s Portfolio</h2>
          <h4>
            Total Value: <span className="text-success">{totalPortfolioValue}</span>
          </h4>
        </div>
      </Card>

      {/* Portfolio Graph */}
      <Card className="m-3 p-3 bg-secondary text-light w-100" style={{ maxWidth: "700px" }}>
        <h5 className="text-center">Portfolio Value Over Time</h5>
        <Line data={data} />
      </Card>

      {/* Watch Stocks */}
      <Card className="m-3 p-3 bg-secondary text-light w-100" style={{ maxWidth: "800px" }}>
        <h5 className="text-center">Top 3 Watch Stocks</h5>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Last Price</th>
              <th>% Change</th>
            </tr>
          </thead>
          <tbody>
            {watchStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.lastPrice}</td>
                <td style={{ color: stock.change.includes("-") ? "red" : "limegreen" }}>{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Purchased Stocks */}
      <Card className="m-3 p-3 bg-secondary text-light w-100" style={{ maxWidth: "800px" }}>
        <h5 className="text-center">Your Purchased Stocks</h5>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {purchasedStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>

  );
};
