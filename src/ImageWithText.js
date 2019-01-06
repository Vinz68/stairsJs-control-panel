import React from 'react'                     // native react components
import './App.css';                           // used style sheet


const ImageWithText = function (props) {
    return (
        <div className="container">
            <div className="row no-gutters">
                <div className="col-2">
                </div>
                <div className="col">
                    <div className="row no-glutters">
                        <div className="col-2">
                            <img src={props.image} alt="imageWithInfo" height='40' width='40' align="left" ></img>
                        </div>
                        <div className="col">
                            <p className="App-text">{props.value}</p>
                        </div>
                    </div>
                </div>
                <div className="col-2" >
                </div>
            </div>
        </div>
    );
}


export default ImageWithText;