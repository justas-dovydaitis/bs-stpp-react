import React from 'react';
import Speaker from './Speaker';

import './style.css';

class Speakers extends React.Component {
    constructor(props) {
        super(props);
        this.mapSpeakers = this.mapSpeakers.bind(this);
    }

    mapSpeakers() {
        return this.props.speakers.map((speaker, key = 0) => {
            return <Speaker key={key++} {...speaker} />
        })
    }
    render() {
        return (
            <div class='container'>
                {this.mapSpeakers()}
            </div>
        )
    }
}

export default Speakers;

export { Speaker };