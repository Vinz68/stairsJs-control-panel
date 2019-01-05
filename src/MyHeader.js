import React from 'react'                     // native react components
import './App.css';                           // used style sheet

// Used Media files
import logo from './media/logo-yellow.svg';

const MyHeader = function (props) {
    return (
        <header className="App-header">
            <div className="container">
                <div className="row no-gutters">
                    <div class="col-2">
                        <img src={logo} className="App-logo" align="right" alt="logo" />
                    </div>
                    <div className="col">
                        <div className="row no-gutters">
                            <div className="col">
                                <p className="App-title">StairsJS Control Panel</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col">
                                <a
                                    className="App-link"
                                    href="https://github.com/Vinz68/stairsJs-control-panel"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <p className="App-github">Code on github</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </header>
    );
}

/*  thin black border for the div, used for testing: 
div class="col-2" style="border: thin solid black" align="right">
*/

export default MyHeader;