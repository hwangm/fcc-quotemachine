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
    let styles = {
      fontSize: '25px'
    };

    return (
      <div className='container'>
        <Jumbotron id="quote-box" className="mx-auto">
          <h3>Welcome to the Random Quote Generator!</h3>
          <p>Click the button below to generate a random quote.</p>
          <QuoteContent quote={this.state.quote} author={this.state.author} />
          <div className="d-flex justify-content-between align-items-stretch">
            <Button id="new-quote" color="primary" onClick={() => this.generateQuote()}>Randomize!</Button>
            <Badge 
            id="tweet-quote" 
            color="primary"
            target="_blank"
            style={styles}
            className="d-flex flex-column justify-content-center" 
            href={'https://twitter.com/intent/tweet?text='+encodeURI(this.state.quote+' - '+this.state.author)}>
              <i className="fa fa-twitter-square"></i></Badge>
          </div>
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