import React, { Component } from 'react';     // native react components
import axios from 'axios';                    // REST-API support, see https://github.com/axios/axios
import './App.css';                           // used style sheet

// Used Media files
import logo from './media/logo-yellow.svg';
import dateTimeLogo from './media/datetime128.png';
import sunrise from './media/sunrise128.png';
import sunset from './media/sunset128.png';

// REST API endpoint - to get the used sunrise and sunset times
const API = 'http://stairsledlight:9000/suncalc';

const Header = function (props) {
  return (
    <header className="App-header">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-2">
            <img src={logo} className="App-logo" align="right" alt="logo" />
          </div>
          <div class="col">
            <div class="row no-gutters">
              <div class="col">
                <p className="App-title">StairsJS Control Panel</p>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col">
                <a
                  className="App-link"
                  href="https://github.com/Vinz68/stairsJs"
                  target="_blank"
                  rel="noopener noreferrer">
                  <p className="App-github">Code on github</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


const ImageWithInfo = function (props) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-2">
          <img src={props.image} alt="imageWithInfo" height='40' width='40' vertical-align='text-bottom' class='scale_img'></img>
        </div>
        <div class="col">
          <h2 className="App-Text">{props.value}</h2>
        </div>
      </div>
    </div>
  );
}


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  };

  render() {
    return (
      <button className="App-MyButton" onClick={this.handleClick}>
        {this.state.counter}
      </button>
    );
  }
}


function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getCurrentTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  var currentTime = h + ":" + m + ":" + s;
  return currentTime;
}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: getCurrentTime()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      500
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: getCurrentTime()
    });
  }
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-2">
            <img src={dateTimeLogo} alt="date time icon" height='40' width='40' vertical-align='text-bottom' class='scale_img'></img>
          </div>
          <div class="col">
            <h2 className="App-Text">{this.state.time}</h2>
          </div>
        </div>
      </div>
    );
  }
}


class Introspection extends React.Component {
  render() {
    return <div align="center">
      Currently using React {React.version}
    </div>
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suncalc: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(API)
      .then(result => this.setState({
        suncalc: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    const { suncalc, isLoading, error } = this.state;

    var displayState = "";
    var sunriseValue ="";
    var sunsetValue ="";

    if (error) {
      displayState = "<p>{error.message}</p>";
    }

    else if (isLoading) {
      displayState = "<p>Loading ...</p>";
    }

    if (suncalc.sunrise) {
      // format sunrise time from the Date object
      sunriseValue = suncalc.sunrise;
    }
    else {
      sunriseValue = displayState;
    }

    if (suncalc.sunset) {
      sunsetValue = suncalc.sunset;     
    }
    else {
      sunsetValue = displayState;
    }

    return (
        <div className="App">
        <Header />
        <Clock />
        <ImageWithInfo
          image={sunrise}
          value={sunriseValue}
        />
        <ImageWithInfo
          image={sunset}
          value={sunsetValue}
        />
        <Introspection />
        <Button />
      </div>
    );
  }
}


export default App;
