import React from 'react';                      // native react components
import axios from 'axios';                      // REST-API support, see https://github.com/axios/axios
import MyCaption from './MyCaption';            // Caption on one line/row
import ImageWithText from './ImageWithText';    // Image with text on one line/row
import MyClock from './MyClock';                // Current time, displayed aS A 'ImageWithText'
import './App.css';                             // used style sheet

// Used Media files
import sunrise from './media/sunrise128.png';
import sunset from './media/sunset128.png';

// REST API endpoint - to get the used sunrise and sunset times
const suncalcAPI = 'http://stairsledlight:9000/suncalc';


class MyStatusPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suncalc: [],
            isLoadingSuncalc: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.get(suncalcAPI)
            .then(result => this.setState({
                suncalc: result.data,
                isLoadingSuncalc: false
            }))
            .catch(error => this.setState({
                error,
                isLoadingSuncalc: false
            }));
    }


    render() {
        const { suncalc, isLoadingSuncalc, error } = this.state;

        var displayState = "";
        var sunriseValue = "";
        var sunsetValue = "";

        if (error) {
            displayState = "<p>{error.message}</p>";
        }

        else if (isLoadingSuncalc) {
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
            <div className="App-status-panel">

                <MyCaption
                    value="Status Panel"
                />
                <MyClock />
                <ImageWithText
                    image={sunrise}
                    value={sunriseValue}
                />
                <ImageWithText
                    image={sunset}
                    value={sunsetValue}
                />
            </div>
        );
    }
}


export default MyStatusPanel;