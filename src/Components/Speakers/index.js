// Modules
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// Components
import SpeakerMd from './SpeakerMedium';
import SpeakerSm from './SpeakerSmall';
// Actions
import fetchApi from '../../Actions/get';
import { actionTypes as AC } from '../../Actions';
//Styles
import './style.css';
import { Hidden } from '@material-ui/core';

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
            return <div>
                <Hidden smDown implementation="js" >
                    <SpeakerMd key={key++} {...speaker} />
                </Hidden>
                <Hidden smUp implementation="js" >
                    <SpeakerSm key={key++} {...speaker} />
                </Hidden>
            </div>

        })
    }
    render() {
        return (
            <div className="container-fluid">
                <Helmet>
                    <title>Speakers</title>
                    <meta name='description' content='Buildstuff 2019 speakers' />
                </Helmet>
                <h1 className='page-name font-weight-bold mt-md-5 text-upercase'> SPEAKERS </h1>
                <div className='container'>
                    {this.mapSpeakers()}
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);

export { SpeakerMd, SpeakerSm };