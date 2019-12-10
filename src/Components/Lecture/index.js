import React from 'react';
import Speaker from '../Speakers/SpeakerSmall';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { actionTypes as AC } from '../../Actions';
import fetchApi from '../../Actions/get';
import NotFound from '../NotFound';
const mapStateToProps = state => ({
    lecture: state.agenda.currentLecture,
    speakers: state.agenda.currentLectureSpeakers
});
const mapDispatchToProps = dispatch => ({
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
});

class Lecture extends React.Component {
    constructor(props) {
        super(props);
        let { id } = this.props.match.params;
        if (!this.props.lecture || this.props.lecture._id !== id)
            this.props.fetchApi(`/lectures/${id}`, {}, AC.SET_CURRENT_LECTURE)
                .then((lecture) => {
                    this.props.fetchApi(`/lectures/${id}/speakers/`, {}, AC.SET_CURRENT_LECTURE_SPEAKERS)
                });

        this.mapSpeakers = this.mapSpeakers.bind(this);
    }
    mapSpeakers() {
        return this.props.speakers.map((speaker, key = 0) => {
            return <div className='col-6 col-md-4 col-lg-3'><Speaker key={key++} {...speaker} /></div>
        })
    }
    render() {
        return (
            <div className='container lecture'>
                {!this.props.lecture ? <NotFound message="Sorry, lecture not found" /> : <div>
                    <Helmet>
                        <title>{this.props.lecture && this.props.lecture.name}</title>
                        <meta name='description' content={this.props.lecture && this.props.lecture.description} />
                    </Helmet>
                    <div className='row'>
                        <h1 className='page-name font-weight-bold mt-md-5 text-upercase'>
                            {this.props.lecture && this.props.lecture.name}
                        </h1>
                    </div>
                    <div className='row my-3'>
                        <div className='col'>
                            {/*time and place*/}
                            <div className='row font-weight-bold'>
                                <FontAwesomeIcon icon={faClock} className='mr-2' />
                                {this.props.lecture && new Intl.DateTimeFormat('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(new Date(this.props.lecture.starts))} - {this.props.lecture && new Intl.DateTimeFormat('en-US', {
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(new Date(this.props.lecture.ends))}

                            </div>
                            <div className='row font-weight-bold'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
                                Alpha
                        </div>
                        </div>

                    </div>
                    <div className='row my-3'
                        dangerouslySetInnerHTML={{ __html: this.props.lecture ? this.props.lecture.description : '' }
                        }>
                    </div>
                    <div className='row'>
                        <h3 className='font-weight-bold'>Speakers:</h3>
                    </div>
                    <div className='row'>
                        {this.mapSpeakers()}
                    </div>
                </div>
                }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);