import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
{/*import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";*/}
import Home from './Home.tsx';


function App() {
  return (
    <main>
        <Router>
          <Nav variant="tabs" className="bg-body-tertiary">
            <Nav.Item>
              <NavLink to="/" className="nav-link">Titan Equity Group</NavLink>
            </Nav.Item>
      {/*      <Nav.Item>
              <NavLink eventKey="login" to="/login" className="nav-link">Login/SignUp</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink eventKey="portfolio" to="/portfolio" className="nav-link">Your Portfolio</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink eventKey="market" to="/market" className="nav-link">Market</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink eventKey="userTransaction" to="/userTransaction" className="nav-link">Transactions</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink eventKey="admin" to="/admin" className="nav-link">Admin</NavLink>
            </Nav.Item> */}
          </Nav>

          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />}/>
            <Route path="/portfolio" element={<Portfolio />}/>
            <Route path="/market" element={<Market />}/>
            <Route path="/userTransaction" element={<UserTransaction />}/>
            <Route path="/admin" element={<Admin />}/> */}
          </Routes>

        </Router>
    </main>
  );
}

export default App;
