import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      erro: null,
      currentPage: 1,
      todosPerPage: 3
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    fetch(`http://localhost:3001/users`)
      .then(users =>
        users.json().then(users => this.setState({ users }))
      )
      .catch(erro => this.setState({ erro }));
  }

  screenError() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Server Error!
        </div>
      );
    }
  }

  render() {

    const { users, currentPage, todosPerPage } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = users.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((item, indice) => {
      return (
      <div key={indice} className="card mb-4">
        <h5 className="card-header">{item.type}</h5>
        <div className="card-body">
          <div className="media">
            
            <div className="media-body">
              <h5 className="mt-0 mb-1">{item.login}</h5>
              <p>{item.html_url}</p>
            </div>
          </div>
          <div className="text-right">
            <Link
              to={`/details/${item.login}`}
              className="btn btn-success mr-3"
              role="button"
            >
              Details
            </Link>
            <Link
              to={`/repository/${item.login}`}
              className="btn btn-primary"
              role="button"
            >
              Repository
            </Link>
          </div>
        </div>
      </div>
      );
    });

    const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(users.length / todosPerPage); i++) {
       pageNumbers.push(i);
     }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <main className="col-xl-4" role="main">
              <div>{renderTodos}</div>
          </main>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListUsers;
