import React from 'react';
import { connect } from 'react-redux';
import AgendaItem from './AgendaItem';
import AgendaNav from './AgendaNav';
import changeActivePlace from '../../Actions/agendaActivePlace';
import fetchApi from '../../Actions/get';
import { actionTypes as AC } from '../../Actions';
// import { API_ROOT } from '../../config';

const mapStateToProps = state => ({
    agendaNavItems: state.agenda.agendaPlaces,
    agendaActivePlace: state.agenda.agendaActivePlace,
    lectures: state.agenda.lectures
})
const mapDispatchToProps = dispatch => ({
    changeActivePlace: (newActive) => dispatch(changeActivePlace(newActive)),
    fetchApi: (slug, headers, type) => dispatch(fetchApi(slug, headers, type)),
})

class Agenda extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Menu entry index.
            selectedPlace: 0,
        }
        // Gets places
        this.props.fetchApi(`/places/`, {}, AC.SET_AGENDA_PLACES)
            .then(() => {
                if (this.props.agendaNavItems.length > 0) {
                    this.props.changeActivePlace(this.props.agendaNavItems[0]._id);
                }
            })
            .then(() => {
                this.props.fetchApi(`/lectures/`, {}, AC.SET_LECTURES)
            })
        this.makeAgenda = this.makeAgenda.bind(this);
        // this.filterAgendaByPlace = this.filterAgendaByPlace.bind(this);
    }
    makeAgenda(place) {
        return this.props.lectures.filter(
            (item) => {
                // debugger;
                return item.place === this.props.agendaActivePlace
            })
            .map((item, key = 0) => {
                return <AgendaItem {...item} key={key++} />
            });
    }
    render() {
        return (
            <div className="container agenda">
                <h1 className='display-1 font-weight-bold mt-5'> AGENDA </h1>
                <AgendaNav
                    navItems={this.props.agendaNavItems}
                    active={this.props.agendaActivePlace}
                    changeActive={this.props.changeActivePlace} />
                <div className='lectures'>
                    {this.makeAgenda(this.props.agendaActivePlace)}
                </div>
            </div>
        );
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Agenda);