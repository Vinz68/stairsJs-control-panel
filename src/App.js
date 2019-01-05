import React, { Component } from 'react';       // native react components
import MyHeader from './MyHeader';              // Header of the page
import MyStatusPanel from './MyStatusPanel';    // Status of the stairsJS server program
import MyControlPanel from './MyControlPanel';  // Controls , to control the stairsJS server program
import './App.css';                             // used style sheet



class App extends Component {

    render() {
        return (
            <div className="App">
                <MyHeader />
                <MyStatusPanel />
                <MyControlPanel />
            </div>
        );
    }
}


export default App;
