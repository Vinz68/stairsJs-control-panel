import React from 'react'                     // native react components
import './App.css';                           // used style sheet



const MyCaption = function (props) {
    return (
        <div className="container">
            <div className="row no-gutters">
                <div className="col-2" >
                </div>
                <div className="col" >
                    <p></p>
                    <p className="App-caption">{props.value}</p>
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
    );
}


export default MyCaption;




