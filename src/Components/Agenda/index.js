import React from 'react';
import AgendaItem from './AgendaItem';

class Agenda extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Menu entry index.
            selectedPlace: 0,
        }
        this.makePlaces = this.makePlaces.bind(this);
        this.makeAgenda = this.makeAgenda.bind(this);
        this.filterAgendaByPlace = this.filterAgendaByPlace.bind(this);
    }
    makePlaces() {
        return (
            <div>

            </div>
        );
    }
    filterAgendaByPlace(place) {
        return this.props.agenda.filter(lecture => lecture.place === place);
    }
    makeAgenda(place) {
        return [{}, {}, {}, {}, {}].map((item, key = 0) => {
            return <AgendaItem {...item} key={key++} />
        });
    }
    render() {
        return (
            <div className="container agenda">
                <h1 className='display-1 font-weight-bold mt-5'> AGENDA </h1>
                <div className='nav'>
                    {/* {this.makePlaces()} */}
                    <h4 className='mr-5'>Alpha</h4>
                    <h4 className='mr-5'>Beta</h4>
                    <h4 className='mr-5'>Gama</h4>
                    <h4 className='mr-5'>Zeta</h4>
                    <h4 className='mr-5'>Thetha</h4>
                </div>
                <div className='lectures'>
                    {this.makeAgenda()}
                </div>
            </div>
        );
    }
};
export default Agenda;