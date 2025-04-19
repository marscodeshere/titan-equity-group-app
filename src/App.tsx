import { useAuthenticator } from '@aws-amplify/ui-react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './App.css';
import Home from './Home.tsx';
import Portfolio from "./Portfolio.tsx";
import Market from './Market.tsx';
import UserTransaction from './UserTransaction.tsx';
import Admin from './Admin.tsx';

export default function App() {

  const {user, signOut} = useAuthenticator();
  return (
    <main>
        <Router>
          <Nav variant="tabs" className="bg-body-tertiary">
            <Nav.Item>
              <NavLink to="/" className="nav-link">Titan Equity Group</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/portfolio" className="nav-link">Your Portfolio</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/market" className="nav-link">Market</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/userTransaction" className="nav-link">Transactions</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admin" className="nav-link">Admin</NavLink>
            </Nav.Item> 
            <Nav.Item>
              <Button onClick={signOut} id="signOutButton">Sign out</Button>
            </Nav.Item>
          </Nav>
          <Navbar.Text className="justify-content-end">Signed In as: {user?.signInDetails?.loginId}</Navbar.Text>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />}/>
            <Route path="/market" element={<Market />}/>
            <Route path="/userTransaction" element={<UserTransaction />}/>
            <Route path="/admin" element={user?.signInDetails?.loginId === "momens@asu.edu" ? <Admin /> : <Home />}/> 
          </Routes>

        </Router>

      {/* Footer */}
      <footer className="mt-4 text-muted">
        <p>&copy; {new Date().getFullYear()} Titan Equity Group. All rights reserved.</p>
      </footer>
    </main>
  );
}
