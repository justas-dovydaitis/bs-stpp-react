import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'

import Image from '../Image';

import fetchApi from '../../Actions/get';
import { actionTypes as AC } from '../../Actions';

import './style.css';

const mapStateToProps = state => ({
    lectures: state.speakers.currentSpeakerLectures,
    speaker: state.speakers.currentSpeaker
});
const mapDispatchToProps = dispatch => ({
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
});
class Speaker extends React.Component {
    constructor(props) {
        super(props);
        let { id } = this.props.match.params;

        if (!this.props.speaker || this.props.speaker._id !== id)
            this.props.fetchApi(`/speakers/${id}`, {}, AC.SET_CURRENT_SPEAKER)
                .then(() => {
                    this.props.fetchApi(`/speakers/${id}/lectures/`, {}, AC.SET_CURRENT_SPEAKER_LECTURES)
                });
    }
    mapLectures = () => {
        return this.props.lectures.map((lecture, key = 0) => {
            return (
                <div key={key++} className='container-fluid my-3'>
                    <Link className='row' to={`/lectures/${lecture._id}`}>
                        <h2>{lecture.name}</h2>
                    </Link>
                    <div className='row font-weight-bolder'>
                        {new Intl.DateTimeFormat('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            hour12: true,
                            hour: 'numeric',
                            minute: 'numeric'
                        }).format(new Date(lecture.starts))} - {new Intl.DateTimeFormat('en-US', {
                            hour12: true,
                            hour: 'numeric',
                            minute: 'numeric'
                        }).format(new Date(lecture.ends))}
                    </div>
                    <div className='row font-weight-bolder'>
                        Alpha
                    </div>
                    <div className='row mt-4'>
                        <div>{lecture.shortDescription}</div>
                    </div>
                    <div className='row'>
                        <hr></hr>
                    </div>

                </div>
            )
        })
    }
    render = () => {
        return (
            <div className='container mt-5'>
                <Helmet>
                    <title>{`Speaker|${this.props.speaker && this.props.speaker.name}`}</title>
                    <meta name='description' content='Create a place' />
                </Helmet>
                <div className='row'>
                    <div className='mx-auto image-fluid col-lg-3 col-md-4 col-6'>
                        <Image className='img-fluid' src={this.props.speaker && (this.props.speaker.image || 'https://acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png')} alt='placeholder' />
                    </div>
                    <div className='col pl-lg-5 pl-md-5'>
                        <div className='row'>
                            <h1 className='speaker-name-page mx-auto mx-md-0' >{this.props.speaker && this.props.speaker.name}</h1>
                        </div>
                        <div className='row'>
                            <div className='font-weight-bolder my-3 mx-auto mx-md-0'>{this.props.speaker && this.props.speaker.job}</div>
                        </div>
                    </div>
                </div>
                <div className='row mt-5' dangerouslySetInnerHTML={{ __html: this.props.speaker && this.props.speaker.description }}>
                </div>
                <div className='row my-5'>
                    <h3 className='font-weight-bold'>Lectures:</h3>
                    {this.props.lectures && this.mapLectures()}
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Speaker);