import React, { Component } from 'react';
import './App.css';
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Button,
  Badge } from 'reactstrap';

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
    let twitterHref = 'https://twitter.com/intent/tweet?text='+encodeURI(this.state.quote+' - '+this.state.author);
    console.log(twitterHref);
    return (
      <div>
        <Jumbotron id="quote-box">
          <h3>Welcome to the Random Quote Generator!</h3>
          <p>Click the button below to generate a random quote.</p>
          <QuoteContent quote={this.state.quote} author={this.state.author} />
          <Button id="new-quote" color="primary" onClick={() => this.generateQuote()}>Randomize!</Button>
          <Badge id="tweet-quote" target="_blank" href={'https://twitter.com/intent/tweet?text='+encodeURI(this.state.quote+' - '+this.state.author)}>Tweet</Badge>
        </Jumbotron>
      </div>
    )
  }
}

class QuoteContent extends Component {
  render() {
    return (
      <div>
        <h2 id="text">{this.props.quote}</h2>
        <p id="author">-{this.props.author}</p>
        <br />
      </div>
    )
  }
}


export { App, Header, Content, QuoteContent };