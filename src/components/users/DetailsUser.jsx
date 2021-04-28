import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class DetailsUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      erro: null,
      redirect: false
    };
  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
         Server Error
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

  componentDidMount() {
    const { login } = this.props.match.params;

    fetch(`http://localhost:3001/users/${login}/details`)
      .then(data => {
        data.json().then(data => {
          if (data.error) {
            this.setState({ erro: data.error });
          } else {
            this.setState({ user: data });
          }
        });
      })
      .catch(erro => this.setState({ erro: erro }));
  }

  render() {
    const { redirect } = this.state;
    console.log(this.state.user)
    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container-fluid">

          <div className="row">
        <div className="card-align">
            <div className="col-md-4 mb-md-0 mb-5">
                <div className="card profile-card">
                    <div className="avatar z-depth-1-half mb-4">
                        <img src={this.state.user.avatar_url} className="rounded-circle" alt="GitHubWarrior"/>
                    </div>
                    <div className="card-body pt-0 mt-0">
                        <div className="text-center">
                          <h3 className="mb-3 font-weight-bold"><strong>{this.state.user.name}</strong></h3>
                          <h6 className="font-weight-bold blue-text mb-4">GitHub Warrior</h6>
                        </div>
                        <ul className="striped list-unstyled">
                          <li><strong>ID: </strong><span className="blue-text">{this.state.user.id}</span></li>
                          <li><strong>Company: </strong><span className="blue-text">{this.state.user.company}</span></li>
                          <li><strong>Location: </strong><span className="blue-text">{this.state.user.location}</span></li>
                          <li><strong>Public Repos: </strong><span className="blue-text">{this.state.user.public_repos}</span> </li>
                          <li><strong>Public Gists: </strong><span className="blue-text">{this.state.user.public_gists}</span> </li> 
                          <li><strong>Followers: </strong><span className="blue-text">{this.state.user.followers}</span></li>
                          <li><strong>Following: </strong><span className="blue-text">{this.state.user.following}</span> </li>
                          <li><strong>Blog:</strong> <span className="blue-text">{this.state.user.blog}</span></li>
                          <li><strong>E-mail: </strong><span className="blue-text">{this.state.user.email}</span></li>
                          <li><strong>Created: </strong><span className="blue-text">{this.formatDate(this.state.user.created_at)}</span></li>  
                        </ul>
                    </div>
                </div>
            </div>
        </div>    
        </div> 
        </div>  
      );
    }
  }
}

export default DetailsUser;
