import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class RepositoryUser extends Component {
  constructor(props){
    
    super(props);

    this.state = {
      repositories: [],
      erro: null,
      redirect: false
    };
  }

  componentDidMount() {

    const { login } = this.props.match.params;

    fetch(`http://localhost:3001/users/${login}/repos`)
    .then(data => {
      data.json().then(data => {
        if (data.error) {
          this.setState({ erro: data.error });
        } else {
          this.setState({ repositories: data });
        }
      });
    })
    .catch(erro => this.setState({ erro: erro }));
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

  formatDate(date){
    let dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear()
    return year + "/" + month + "/" + day;
  }


  screenRepositories(){

    const { repositories } = this.state;

    if (repositories && repositories.length) {
      return repositories.map((item, index) => (     
            <a href={item.html_url} class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-2 h5">{item.full_name}</h5>
              </div>
              <p class="mb-2">{item.description}</p>
              <small>Language: {item.language} Date: {this.formatDate(item.created_at)} Id: {item.id}</small>
            </a>
          ));
        } else {
          return (
            <div className="alert alert-light" role="alert">
              No Respositories :)
            </div>
          );
        }
  }



  render() {

    const { redirect } = this.state;

    if (redirect) {

      return <Redirect to="/" />;

    } else {
      
      return (

    <div className="container">
        <div className="row justify-content-md-center">
          <main className="col-xl-4" role="main">
              <div class="list-group">
                <div>{this.screenRepositories() || this.screenError()}</div>
              </div>
        </main>
      </div>
    </div>
      );
    }
  }
}

export default RepositoryUser;
