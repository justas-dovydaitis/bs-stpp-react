import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, Modifier } from 'draft-js';
import draftToHTML from 'draftjs-to-html';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import Select from 'react-select';
import { connect } from 'react-redux';
// Actions
import fetchApi from '../../../Actions/get';
import postApi from '../../../Actions/post';
import { actionTypes as AC } from '../../../Actions'
import './style.css';
//Styles
import './style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const mapStateToProps = state => ({
    speakers: state.speakers.speakers,
    places: state.agenda.agendaPlaces,
});
const mapDispatchToProps = dispatch => ({
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
    postApi: (slug, headers, body) => dispatch(postApi(slug, headers, body)),
});
const EditorComponent = (props) =>
    <Editor {...props}
        editorClassName="wysiwyg"
    />

class CreateLectureForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSpeakers: [],
            selectedPlace: {},
            name: '',
            shortDesc: '',
            fullDesc: '',
            dateRange: [new Date(), new Date()],
        }
        this.props.fetchApi(`/speakers/`, {}, AC.SET_SPEAKERS);
        this.props.fetchApi(`/places/`, {}, AC.SET_AGENDA_PLACES);
        this.makeSpeakers = this.makeSpeakers.bind(this);
    }
    makeSpeakers = () => {
        return this.props.speakers.map((speaker) => {
            return {
                value: speaker._id,
                label: speaker.name
            }
        })
    }
    makePlaces = () => {
        return this.props.places.map((place) => {
            return {
                value: place._id,
                label: place.name
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            name: this.state.name,
            description: draftToHTML(this.state.fullDesc),
            shortDescription: this.state.shortDesc,
            starts: this.state.dateRange[0],
            ends: this.state.dateRange[1],
        }
        console.log(JSON.stringify(body));
        this.props.postApi(`/lectures`, {}, JSON.stringify(body))
            .then((lecture) => {
                console.log("WOW", lecture)
                this.props.postApi(`/places/${this.state.selectedPlace.value}/lectures/${lecture.data._id}/`, {});
                return lecture;
            })
            .then((lecture) => {
                this.state.selectedSpeakers.forEach(speaker => {
                    this.props.postApi(`/lectures/${lecture._id}/speakers/${speaker.value}/`, {});
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
    handleSpeakersChange = async (newValue) => {
        await this.setState({ selectedSpeakers: newValue })
    };
    handlePlaceChange = async (newValue) => {
        await this.setState({ selectedPlace: newValue })
    };
    render = () => {
        console.log(this.state.starts)
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" id="title" name="title" type="text"
                        onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="shortDesc">Short description</label>
                    <textarea className="form-control" id="shortDesc" name="shortDesc"
                        onChange={(e) => this.setState({ shortDesc: e.target.value })}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="fullDesc">Full description</label>
                    <EditorComponent className="form-control" id='fullDesc' name='fullDesc'
                        onContentStateChange={(newState) => { this.setState({ fullDesc: newState }) }} />
                </div>
                <div className="form-group">
                    <label htmlFor='timeRange'>Duration</label>
                    <DateTimeRangePicker className="form-control" id='timeRange' name='timeRange'
                        value={this.state.dateRange}
                        onChange={date => this.setState({ dateRange: date })} />
                </div>
                <div className='form-group'>
                    <label htmlFor='speakers'>Speakers</label>
                    <Select
                        isMulti
                        onChange={this.handleSpeakersChange}
                        options={this.makeSpeakers()}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='place'>Place</label>
                    <Select
                        onChange={(this.handlePlaceChange)}
                        options={this.makePlaces()}
                    />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Submit</button>
            </form>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateLectureForm);