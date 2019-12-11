import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// Actions
import fetchApi from '../../../Actions/get';
import postApi from '../../../Actions/post';
import updateApi from '../../../Actions/update';
import deleteApi from '../../../Actions/delete';

import { actionTypes as AC } from '../../../Actions'
import './style.css';
//Styles
import './style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const mapStateToProps = state => ({
    lecture: state.agenda.currentLecture,
    speakers: state.speakers.speakers,
    places: state.agenda.agendaPlaces,
    defaultPlace: state.agenda.agendaActivePlace,
    defaultSpeakers: state.agenda.currentLectureSpeakers,
});
const mapDispatchToProps = dispatch => ({
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
    postApi: (slug, headers, body) => dispatch(postApi(slug, headers, body)),
    updateApi: (slug, headers, body) => dispatch(updateApi(slug, headers, body)),
    deleteApi: (slug, headers) => dispatch(deleteApi(slug, headers)),


});
const EditorComponent = (props) => {
    return <Editor {...props}
        editorClassName="wysiwyg"
    />
}


class EditLectureForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSpeakers: [],
            selectedPlace: {},
            name: '',
            shortDesc: '',
            fullDesc: '',
            fullDescPrefill: '',
            dateRange: [new Date(), new Date()],

        }
        let { id } = this.props.match.params;
        this.id = id;

        this.makeSpeakers = this.makeSpeakers.bind(this);
    }

    componentDidMount() {
        if (!this.props.lecture || this.props.lecture._id !== this.id) {
            this.props.fetchApi(`/lectures/${this.id}`, {}, AC.SET_CURRENT_LECTURE)
                .then(async (lecture) => {
                    const blocksFromHTML = convertFromHTML(lecture.description);
                    const state = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap
                    );
                    await this.setState({
                        name: lecture.name,
                        shortDesc: lecture.shortDescription,
                        fullDesc: EditorState.createWithContent(state),
                        dateRange: [new Date(lecture.starts), new Date(lecture.ends)],
                    })
                });
            this.props.fetchApi(`/lectures/${this.id}/speakers/`, {}, AC.SET_CURRENT_LECTURE_SPEAKERS)
                .then((speakers) => {
                    this.setState({
                        selectedSpeakers:
                            speakers.map((speaker) => {
                                return {
                                    value: speaker._id,
                                    label: speaker.name
                                }
                            })
                    })
                });
            this.props.fetchApi(`/lectures/${this.id}/place/`, {}, AC.CHANGE_ACTIVE_PLACE)
                .then((place) => {
                    this.setState({ selectedPlace: { value: this.props.defaultPlace._id, label: this.props.defaultPlace.name } })
                });
            this.props.fetchApi(`/speakers/`, {}, AC.SET_SPEAKERS)
                .then((speakers) => { });
            this.props.fetchApi(`/places/`, {}, AC.SET_AGENDA_PLACES)
                .then((places) => {

                })
            // this.setState({ selectedPlace: { value: await place._id, label: await place.name } });



        }
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
            description: stateToHTML(this.state.fullDesc.getCurrentContent()),
            shortDescription: this.state.shortDesc,
            starts: this.state.dateRange[0],
            ends: this.state.dateRange[1],
        }
        // console.log(JSON.stringify(body));
        this.props.updateApi(`/lectures/${this.id}`, {}, JSON.stringify(body))
            .then((lecture) => {
                // console.log("WOW", lecture)
                console.log(this.state.selectedPlace, this.props.defaultPlace, this.state.selectedPlace.value !== this.props.defaultPlace._id)

                this.props.postApi(`/lectures/${this.props.lecture._id}/place/${this.state.selectedPlace.value}`, {});
                // this.props.deleteApi(`/places/${this.props.defaultPlace._id}/lectures/${this.props.lecture._id}/`);

                return lecture;
            })
            .then((lecture) => {
                console.log(this.props.defaultSpeakers, this.state.selectedSpeakers);
                if (this.props.defaultSpeakers !== 0) {
                    this.props.defaultSpeakers.forEach((def) => {
                        this.props.deleteApi(`/speakers/${def._id}/lectures/${this.props.lecture._id}/`)
                    })
                }
                return lecture
            })
            .then((res) => {
                if (this.state.selectedSpeakers.length !== 0) {
                    this.state.selectedSpeakers.forEach((sel) => {
                        this.props.postApi(`/speakers/${sel.value}/lectures/${this.props.lecture._id}/`);
                    });
                }
            });

    }
    handleSpeakersChange = async (newValue) => {
        await this.setState({ selectedSpeakers: newValue })
    };
    handlePlaceChange = async (newValue) => {
        await this.setState({ selectedPlace: newValue })
    };
    editorChange = (newState) => {
        this.setState({ fullDesc: newState })

    }
    render = () => {
        return (
            <div className='container'>
                <Helmet>
                    <title>Create Lecture</title>
                    <meta name="description" content="Create lecture" />
                </Helmet>
                <div className='row'>
                    <h1 className='text-uppercase my-5'>Create Lecture</h1>
                </div>
                <div className='row '>
                    <form onSubmit={this.handleSubmit} className='w-100'>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input className="form-control" id="title" name="title" type="text"
                                onChange={(e) => this.setState({ name: e.target.value })}
                                value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shortDesc">Short description</label>
                            <textarea className="form-control" id="shortDesc" name="shortDesc"
                                onChange={(e) => this.setState({ shortDesc: e.target.value })}
                                value={this.state.shortDesc}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullDesc">Full description</label>
                            <EditorComponent className="form-control" id='fullDesc' name='fullDesc'
                                // contentState={this.state.fullDesc}
                                editorState={this.state.fullDesc}
                                onEditorStateChange={this.editorChange.bind(this)} />
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
                                value={this.state.selectedSpeakers}
                                options={this.makeSpeakers()}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='place'>Place</label>
                            <Select
                                value={this.state.selectedPlace}
                                onChange={(this.handlePlaceChange)}
                                options={this.makePlaces()}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary w-100'>Submit</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditLectureForm);