import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import Dashboard from "./Components/Dashboard";
import CustomerList from "./Components/CustomerList";
import ShoppingCart from "./Components/ShoppingCart";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoMatchPage from "./Components/NoMatchPage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }
  render() {
    return (
      <BrowserRouter>
        <NavBar isLoggedIn={this.state.isLoggedIn} />
        <div className="container-fluids">
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route
              path="/"
              exact
              render={(props) => (
                <Login
                  {...props}
                  updateIsLoggedInStatus={this.updateIsLoggedInStatus}
                />
              )}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<CustomerList />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  //this method can be called by child component to update isLoggedIn status
  updateIsLoggedInStatus = (status) => {
    this.setState({ isLoggedIn: status });
  };
}
