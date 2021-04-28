import React, { Component } from "react";
import ListUsers from "./components/users/ListUsers";
import RepositoryUser from "./components/users/RepositoryUser";
import DetailsUser from "./components/users/DetailsUser";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container backgroundImage">
              <Link to="/">
                <h1 className="display-4">#BestOfGithub</h1>
              </Link>
              <p className="lead">
                Don't worry, everything here is a joke. Or not :)
              </p>
              <Link to="/" className="btn btn-light">
                Users
              </Link>
            </div>
          </div>
          <Route path="/" exact component={ListUsers} />
          <Route path="/details/:login" component={DetailsUser} />
          <Route path="/repository/:login" component={RepositoryUser} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
