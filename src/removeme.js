

import React  from 'react';
import Clock from 'react-live-clock';
 
exports default class MyComponent extends React.Component {
    render() {
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Europe/Amsterdam'} />
    }
}


