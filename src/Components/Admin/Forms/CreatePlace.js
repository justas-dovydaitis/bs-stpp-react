import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
});
const mapDispatchToProps = dispatch => ({
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
    postApi: (slug, headers, body) => dispatch(postApi(slug, headers, body)),
});
class CreatePlaceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLectures: [],
            name: '',
        }
        this.props.fetchApi(`/lectures/`, {}, AC.SET_LECTURES);
        this.makeLectures = this.makeLectures.bind(this);
    }
    makeLectures = () => {
        return this.props.lectures.map((lecture) => {
            return {
                value: lecture._id,
                label: lecture.name
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            name: this.state.name,
        }
        console.log(JSON.stringify(body));
        this.props.postApi(`/places`, {}, JSON.stringify(body))
            .then((place) => {
                this.state.selectedLectures.forEach(lecture => {
                    this.props.postApi(`/places/${place.data._id}/lectures/${lecture.value}/`, {});
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
            <div className="container">
                <Helmet>
                    <title>Create Place</title>
                    <meta name="description" content="Create Place" />
                </Helmet>
                <div className='row'>
                    <h1 className='text-uppercase my-5'>Create Place</h1>
                </div>
                <div className='row'>
                    <form onSubmit={this.handleSubmit} className='w-100'>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" id="name" name="name" type="text"
                                onChange={(e) => this.setState({ name: e.target.value })} />
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
                </div>
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaceForm);