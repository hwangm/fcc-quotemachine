import React, { Component } from 'react';
import './App.css';
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Button,
  Badge } from 'reactstrap';

class App extends Component {

  generateBaseColor(){
    let [x, y, z] = Array.from(new Array(3), () => Math.floor(Math.random() * 255));
    let baseColor = [x, y, z];
    let backgroundColor = Array.from(new Array(3), () => Math.floor(Math.random() * 255));
    let inverse = baseColor.map(e => 255 - e);
  
    let evenNewerColor = baseColor.map(e => e*6);
    
    console.log(baseColor);
    return [
      baseColor,
      inverse,
      backgroundColor
    ]
  }

  render() {
    let colors = this.generateBaseColor();
    let backgroundColor = '#' + colors[2].map(e => e.toString(16)).join('');
    let contentColor = '#' + colors[0].map(e => e.toString(16)).join('');
    let fontColor = '#' + colors[1].map(e => e.toString(16)).join('');

    document.body.style.backgroundColor = backgroundColor;
    let compColors = [
      contentColor,
      fontColor
    ]

    return (
      <div className="App">
        <Header colors={compColors}/>
        <Content colors={compColors}/>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    let styles = {
      backgroundColor: this.props.colors[0],
      color: this.props.colors[1]
    };
    return (
      <div>
        <Navbar style={styles} color="faded" light expand="md">
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

    let jumbotronStyles = {
      backgroundColor: this.props.colors[0],
      color: this.props.colors[1]
    }

    return (
      <div className='container'>
        <br />
        <br />
        <Jumbotron id="quote-box" className="mx-auto" style={jumbotronStyles}>
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
    if(this.props.quote != ''){
      return (
        <div>
          <h2 id="text">{this.props.quote}</h2>
          <p id="author">-{this.props.author}</p>
          <br />
        </div>
      )
    }
    else{
      return (
        <div>
          <h2 id="text">{this.props.quote}</h2>
          <p id="author">{this.props.author}</p>
          <br />
        </div>
      )
    }
    
  }
}


export { App, Header, Content, QuoteContent };