// Modules
import React from 'react';
import { connect } from 'react-redux';
// Components
import Speaker from './SpeakerMedium';
// Actions
import fetchApi from '../../Actions/get';
import { actionTypes as AC } from '../../Actions';
//Styles
import './style.css';

const mapStateToProps = state => ({
    speakers: state.speakers.speakers
});
const mapDispatchToProps = dispatch => ({
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
});
class Speakers extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchApi(`/speakers/`, {}, AC.SET_SPEAKERS)

        this.mapSpeakers = this.mapSpeakers.bind(this);
    }


    mapSpeakers() {
        return this.props.speakers.map((speaker, key = 0) => {
            return <Speaker key={key++} {...speaker} />
        })
    }
    render() {
        return (
            <div className="container">
                <h1 className='display-1 font-weight-bold mt-5'> Speakers </h1>
                <div className='container'>
                    {this.mapSpeakers()}
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);

export { Speaker };