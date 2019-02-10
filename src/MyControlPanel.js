import React from 'react'                       // native react components
import axios from 'axios'                       // REST-API support, see https://github.com/axios/axios
import MyCaption from './MyCaption'             // Caption on one line/row
import ImageWithText from './ImageWithText'     // Image with text on one line/row
import Toggle from 'react-toggle'               // Toggle button, see http://aaronshaf.github.io/react-toggle/
import Select from 'react-select'               // Select, dropdown, see https://www.npmjs.com/package/react-select

import "react-toggle/style.css"
import './App.css'                              // used style sheet

// Used Media files
import currentStateOffIcon from './media/currentStateOff128.png';
import currentStateOnIcon from './media/currentStateOn128.png';
import currentStateOnDarkIcon from './media/currentStateOnDark128.png';
import currentStateAutoIcon from './media/currentStateAuto128.png';

// REST API endpoints 
const stairsStatusAPI = 'http://stairsledlight:9000/status';    // status of StairsJS program (like its mode/state)
const stairsControlAPI = 'http://stairsledlight:9000/control';  // remote for the StairsJS program (like swith mode/state)


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
            onOffState: false,
            disableDuringDaylight: false,

            selectedOption: null,
        };
    }

    componentDidMount() {
        this.getStatus();
    }


    handleStatusChange = () => {
        this.setState(prevState => {
            return {
                onOffState: !prevState.onOffState
            };
        });
    };

    handleDaylightChange = () => {
        this.setState(prevState => {
            return {
                disableDuringDaylight: !prevState.disableDuringDaylight
            };
        });
    };

    handleOptionChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    handleClick = event => {
        event.preventDefault();
    
        if (this.state.selectedOption.value) {
    
            axios.post(stairsControlAPI, {
                requestedState: this.state.selectedOption.value ,
                version: '0.1'
              })
              .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({
                    selectedOption: null
                });

                // refresh status panel (get new program mode/state)
                this.getStatus();
            })
            .catch(error => {
                console.log(error);
            });            
        }
    }
 


    getStatus() {
        this.setState({ isLoadingStatus: true });
        axios.get(stairsStatusAPI)
            .then(result => {
                this.setState({
                    stairsStatus: result.data,
                    isLoadingStatus: false
                });
                if (result.data.disableDuringDaylight) {
                    this.setState({
                        disableDuringDaylight: result.data.disableDuringDaylight
                    });
                }
                if ((result.data.currentState) && (result.data.currentState > 1)) {
                    this.setState({
                        onOffState: true
                    });
                }
            })
            .catch(error => this.setState({
                error,
                isLoadingStatus: false
            }));
    }

    render() {

        var { stairsStatus, isLoadingStatus, error, onOffState, disableDuringDaylight, selectedOption } = this.state;

        var displayState = "";
        var currentStateTextValue = "";
        var currentStateIcon = currentStateOffIcon;

        var options = [
            { value: 'Loading', label: '...loading from server, plz wait..' }
        ];
        var selectedValue = -1;
        var btnDisabled = true;

        if (error) {
            displayState = this.state.error.message;
        }
        else if (isLoadingStatus) {
            displayState = "Loading ...";
        }
        else if (stairsStatus.currentStateText) {
            displayState = stairsStatus.currentStateText;

            // Automatic Mode ?
            if (stairsStatus.currentState === '11' )   {
                currentStateIcon = currentStateAutoIcon;
            } 
            else if (stairsStatus.currentState === '12') {
                currentStateIcon = currentStateAutoIcon;
            }
            // Always On mode ?
            else if (stairsStatus.currentState === '31') {
                currentStateIcon = currentStateOnIcon;
            }
            // On when dark mode ?
            else if (stairsStatus.currentState === '32') {
                currentStateIcon = currentStateOnDarkIcon;
            }
            else {
                // Default Off (also used for testing)
                currentStateIcon = currentStateOffIcon;
            }

            options = stairsStatus.currentStateOptions;
        }
        currentStateTextValue = displayState;

        if (selectedOption) {
            selectedValue = selectedOption.value;

            if (selectedValue > 0)
                btnDisabled = false;
        }


        return (
            <div className="App-control-panel">
                <MyCaption
                    value="Control panel" />
                <ImageWithText
                    image={currentStateIcon}
                    value={currentStateTextValue} />

                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-2">
                        </div>
                        <div className="col">
                            <div className="row no-glutters">
                                <div className="col-2">
                                    <Toggle
                                        onChange={this.handleStatusChange}
                                        checked={onOffState}
                                        name='onOffState' />
                                </div>
                                <div className="col">
                                    <p className="App-text">Enabled.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-2" >
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-2">
                        </div>
                        <div className="col">
                            <div className="row no-glutters">
                                <div className="col-2">
                                    <Toggle
                                        onChange={this.handleDaylightChange}
                                        checked={disableDuringDaylight}
                                        name='disableDuringDaylight'
                                    />
                                </div>
                                <div className="col">
                                    <p className="App-text">Disable during daylight.</p>
                                </div>                                
                             </div>
                        </div>
                        <div className="col-2" >
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-2">
                        </div>
                        <div className="col">

                        <div className="row no-glutters">
                                <div className="col">
                                    <p></p>
                                </div> 
                            </div>

                            <div className="row no-glutters">
                                <div className="col">
                                    <p className="App-text">Select program mode:</p>
                                </div> 
                            </div>

                            <div className="row no-glutters">
                                <div className="col">
                                    <Select
                                        value={selectedOption}
                                        onChange={this.handleOptionChange}
                                        options={options}
                                    />
                                </div> 
                            </div>


                            <div className="row no-glutters">
                                <div className="col">
                                    <button className="App-submit-button" 
                                        type="button" 
                                        disabled={btnDisabled}
                                        onClick={this.handleClick} 
                                        >Submit mode.</button>   

                                </div> 
                            </div>


                            <div className="row no-glutters">
                                <div className="col">
                                    <p></p>                                
                                </div> 
                            </div>

                        

                            <div className="row no-glutters">
                                <div className="col">
                                    <p></p>                                
                                </div> 
                            </div>


                            <div className="row no-glutters">
                                <div className="col">
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