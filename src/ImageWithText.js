import React from 'react'                     // native react components
import './App.css';                           // used style sheet


const ImageWithText = function (props) {
    return (
        <div class="container">
            <div class="row no-gutters">
                <div class="col-2">
                </div>
                <div class="col">
                    <div class="row no-glutters">
                        <div class="col-2">
                            <img src={props.image} alt="imageWithInfo" height='40' width='40' align="left" ></img>
                        </div>
                        <div class="col">
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