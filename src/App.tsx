import { useAuthenticator } from '@aws-amplify/ui-react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
{/*import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";*/}
import Home from './Home.tsx';
import Portfolio from "./Portfolio.tsx";


function App() {

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
              <Button onClick={signOut}>Sign out</Button>
            </Nav.Item>
          {/*  <Nav.Item>
              <NavLink eventKey="market" to="/market" className="nav-link">Market</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink eventKey="userTransaction" to="/userTransaction" className="nav-link">Transactions</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink eventKey="admin" to="/admin" className="nav-link">Admin</NavLink>
            </Nav.Item> */}
          </Nav>
          <Navbar.Text className="justify-content-end">Signed In as: {user?.signInDetails?.loginId}</Navbar.Text>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />}/>
            {/*<Route path="/market" element={<Market />}/>
            <Route path="/userTransaction" element={<UserTransaction />}/>
            <Route path="/admin" element={<Admin />}/> */}
          </Routes>

        </Router>
    </main>
  );
}

export default App;
