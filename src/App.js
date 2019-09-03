import React from 'react';
import './App.css';
import styled from "styled-components";

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      userName: "AdanRodriguez",
      user: {},
      followers: []
    };
  }

  changeUserName = (userName) => {
    this.setState({ userName});
  }


fetchUser = () => {
  fetch(`https://api.github.com/users/${this.state.userName}`)
  .then(res => res.json())
  .then(data => this.setState({user: data}));
}

fetchFollowers = () => {
  fetch(`https://api.github.com/users/${this.state.userName}/followers`)
  .then(res => res.json())
  .then(data => this.setState({followers: data}));
}

  componentDidMount() {
    console.log("first render");
    this.fetchUser();
    this.fetchFollowers();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (prevState.userName !== this.state.userName){
      this.fetchUser();
      this.fetchFollowers();
    }
  }

  render() {
    return (
        <div className="App">
        <Search changeUserName={this.changeUserName}/>
        <UserCard user={this.state.user} followers={this.state.followers} />
        </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }


  handleSubmit = event => {
    event.preventDefault();
    this.props.changeUserName(this.state.search);
    this.setState({ search: ""});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text" 
                name="search" 
                placeholder="search" 
                value={this.state.value}
                onChange={this.handleChange}
                />
        <button type="submit">Search for a User</button>
      </form>
    )
  }
}

function UserCard(props) {
  return(
    <div>
      <Blueh1>{props.user.login}</Blueh1>
      <P>{props.user.location}</P>
      <P>{props.user.url}</P>
      <Fdiv>
        {props.followers.map(follower => (
          <Fdiv key={follower.id}>{follower.login}</Fdiv>
        ))}
      </Fdiv>
    </div>
  );
}

export default App;



const Blueh1 = styled.h1`
    color:blue;
`;

const P = styled.p`
    color:pink;
    font-weight:500;
`;

const Fdiv = styled.div`
  color:orange;
  display:flex;
  justify-content:center;
  margin:0 10%;
`;
