import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Random Quote Generator</NavbarBrand>
        </Navbar>
      </div>
    )
  }
}

class Content extends Component {

  constructor(props){
    super(props);
    this.state = {
      quote: '',
      author: ''
    }
    this.generateQuote();
  }

  generateQuote(){
    console.log('generating quote');
    const proxyurl="https://cors-anywhere.herokuapp.com/";
    return fetch(proxyurl+'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', 
      { 
        mode: 'cors',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        var quote = res.quoteText;
        var author = res.quoteAuthor;
        this.setState({
          quote: quote,
          author: author
        });
      })
      .catch((err) => {
        console.error(err);
      });

  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h3>Welcome to the Random Quote Generator!</h3>
          <p>Click the button below to generate a random quote.</p>
          <QuoteContent quote={this.state.quote} author={this.state.author} />
          <Button color="primary" onClick={() => this.generateQuote()}>Randomize!</Button>
        </Jumbotron>
      </div>
    )
  }
}

class QuoteContent extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.quote} -{this.props.author}</h2>
        <br />
      </div>
    )
  }
}


export { App, Header, Content, QuoteContent };