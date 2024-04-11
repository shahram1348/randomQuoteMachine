// Thanks to Arian Jabbari
import React, { Component } from 'react';
import QuoteMachine from './components/QuoteMachine';
import "typeface-roboto";
import Grid  from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: 'center'
  }
}
class App extends Component {
constructor(props) {
  super(props);
  // Initialize state
  this.state = {
    quotes: [],
    selectedQuotesIndex: null,
  }
  this.selectQuotesIndex = this.selectQuotesIndex.bind(this); // it must be done for every method in react. Although there is another way to do this (ES7)
  this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this)
}
// Best life cycle method that react has to fetch data is componentDidMount()
componentDidMount() {
  fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
  .then(datat => datat.json())
  .then(quotes => this.setState( { quotes }, this.assignNewQuoteIndex ))  // set quotes state. Use call back function  syncronous 
}

 selectQuotesIndex() {
  if (!this.state.quotes.length) {
    return undefined;
  }
  return Math.floor(Math.random()* this.state.quotes.length );
 }

assignNewQuoteIndex() {
   this.setState( { selectedQuotesIndex: this.selectQuotesIndex() });
}
 // ES6 get  
 get selectedQuote() {
  if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuotesIndex)) {
    return undefined;
  }
  return this.state.quotes[this.state.selectedQuotesIndex];
 }

render() {
  console.log(this.state.selectedQuotesIndex)
return (
    <Grid className={this.props.classes.container}  container  >
      <Grid xs={11} lg={8}  item   >
        {
          this.selectedQuote ?
          <QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteIndex={this.assignNewQuoteIndex}  /> : 
          null
        }
        
      </Grid>
    </Grid>
  );
}
}



export default withStyles(styles)(App);
