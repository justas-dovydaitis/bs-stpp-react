import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, Modifier } from 'draft-js';
import draftToHTML from 'draftjs-to-html';
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
    lectures: state.agenda.lectures,
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

class CreateSpeakerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLectures: [],
            name: '',
            description: '',
            image: '',
            job: ''
        }
        this.props.fetchApi(`/lectures/`, {}, AC.SET_LECTURES);
        this.makeLectures = this.makeLectures.bind(this);
    }
    makeLectures = () => {
        return this.props.lectures.map((speaker) => {
            return {
                value: speaker._id,
                label: speaker.name
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            name: this.state.name,
            description: draftToHTML(this.state.description),
            job: this.state.job,
            image: this.state.image,
        }
        console.log(JSON.stringify(body));
        this.props.postApi(`/speakers`, {}, JSON.stringify(body))
            .then((speaker) => {
                this.state.selectedLectures.forEach(lecture => {
                    this.props.postApi(`/speakers/${speaker.data._id}/lectures/${lecture.value}/`, {});
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    handleLecturesChange = async (newValue) => {
        await this.setState({ selectedLectures: newValue })
    };
    render = () => {
        console.log(this.state.starts)
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" name="name" type="text"
                        onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Photo URL</label>
                    <input className="form-control" id="image" name="image" type="text"
                        onChange={(e) => this.setState({ image: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="job">Job title</label>
                    <input className="form-control" id="job" name="job" type="text"
                        onChange={(e) => this.setState({ job: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="descr">Full description</label>
                    <EditorComponent className="form-control" id='descr' name='descr'
                        onContentStateChange={(newState) => { this.setState({ description: newState }) }} />
                </div>

                <div className='form-group'>
                    <label htmlFor='lectures'>Lectures</label>
                    <Select
                        isMulti
                        onChange={this.handleLecturesChange}
                        options={this.makeLectures()}
                    />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Submit</button>
            </form>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateSpeakerForm);