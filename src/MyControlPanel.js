import React from 'react'                       // native react components
import axios from 'axios'                       // REST-API support, see https://github.com/axios/axios
import MyCaption from './MyCaption'             // Caption on one line/row
import ImageWithText from './ImageWithText'     // Image with text on one line/row
import Toggle from 'react-toggle'               // Toggle button, see http://aaronshaf.github.io/react-toggle/
import "react-toggle/style.css"
import './App.css'                              // used style sheet

// Used Media files
import currentStateIcon from './media/current-state128.png';

// REST API endpoint - to get the used sunrise and sunset times
const stairsStatusAPI = 'http://stairsledlight:9000/status';
//const stairsControlAPI = 'http://stairsledlight:9000/control';


class Introspection extends React.Component {
    render() {
        return (
            <div>
                Currently using React {React.version}
            </div>
        );
    }
}


class MyControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stairsStatus: [],
            isLoadingStatus: false,
            error: null,
            status: false,
            disableDaylight: false,

            //            stairsControl: [],
            //            isLoadingControl: false,
            //            errorControl: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoadingStatus: true });

        axios.get(stairsStatusAPI)
            .then(result => this.setState({
                stairsStatus: result.data,
                isLoadingStatus: false
            }))
            .catch(error => this.setState({
                error,
                isLoadingStatus: false
            }));
    }


    handleStatusChange = () => {
        this.setState(prevState => {
            return {
                status: !prevState.status
            };
        });
    };

    handleDaylightChange = () => {
        this.setState(prevState => {
            return {
                disableDaylight: !prevState.disableDaylight
            };
        });
    };



    render() {

        const { stairsStatus, isLoadingStatus, error, status, disableDaylight } = this.state;

        var displayState = "";
        var currentStateValue = "";

        if (error) {
            displayState = this.state.error.message;
        }
        else if (isLoadingStatus) {
            displayState = "<p>Loading ...</p>";
        }
        else if (stairsStatus.currentState) {
            displayState = stairsStatus.currentState;
        }

        currentStateValue = displayState;


        return (
            <div className="App-control-panel">
                <MyCaption
                    value="Control panel" />
                <ImageWithText
                    image={currentStateIcon}
                    value={currentStateValue} />

                <div class="container">
                    <div class="row no-gutters">
                        <div class="col-2">
                        </div>
                        <div class="col">
                            <div class="row no-glutters">
                                <div class="col-2">
                                    <Toggle
                                        defaultChecked={status}
                                        onChange={this.handleStatusChange} />
                                </div>
                                <div class="col">
                                    <p className="App-text">Activate stairs program.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-2" >
                        </div>
                    </div>
                </div>


                <div class="container">
                    <div class="row no-gutters">
                        <div class="col-2">
                        </div>
                        <div class="col">
                            <div class="row no-glutters">
                                <div class="col-2">
                                    <Toggle
                                        defaultChecked={disableDaylight}
                                        onChange={this.handleDaylightChange} />
                                </div>
                                <div class="col">
                                    <p className="App-text">Disable light during daylight.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-2" >
                        </div>
                    </div>
                </div> 

                <div class="container">
                    <div class="row no-gutters">
                    </div>
                    <div class="row no-gutters">
                        <div class="col-2">
                        </div>
                        <div class="col">
                            <div class="row no-glutters">
                                <div class="col-2">
                                </div>
                                <div class="col">
                                    <Introspection />
                                </div>
                            </div>
                        </div>
                        <div className="col-2" >
                        </div>
                    </div>
                </div>                                

            </div>
        );
    }
}


export default MyControlPanel;