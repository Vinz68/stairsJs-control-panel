import React from 'react'                     // native react components
import ImageWithText from './ImageWithText'  // Image with text on one line/row
import './App.css';                           // used style sheet

// Used Media files
import dateTimeLogo from './media/datetime128.png';


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


class MyClock extends React.Component {
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
            <div className="MyClock">
                <ImageWithText
                    image={dateTimeLogo}
                    value={this.state.time}
                />
            </div>            
        );
    }
}


export default MyClock;