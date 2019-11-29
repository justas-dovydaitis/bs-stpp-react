import React from 'react';
import './style.css';

// const Circle = (props) => {
//     return <span className={`dot ${props.full ? 'full' : ''}`}></span>
// };
// const Stick = () => {
//     return <span className='stick'></span>
// }
const Lolipop = (props) => {
    return (
        <div>
            <span className={`dot ${props.full ? 'full' : ''}`}></span>
            <span className='stick'></span>
        </div>
    );
}
const AgendaItem = (props) => {

    return (
        <div className='row agenda-item'>
            <div className='col-1 col-md-2 col-lg-1 text-right' >
                <div className='time'>
                    10:00am
                </div>
            </div>
            <div className='col-1 text-center'>
                <Lolipop />
            </div>
            <div className='col text-left'>
                <h3>Lorem ipsum dolor sit amet</h3>
                <div className='pb-3'>
                    Intrinsicly underwhelm adaptive action items for granular "outside the box" thinking. Rapidiously supply functionalized scenarios for fully researched information. Uniquely recaptiualize cross-media networks without sticky innovation. Rapidiously conceptualize diverse infrastructures after timely methodologies. Objectively create open-source services with dynamic intellectual capital.
                </div>
            </div>
        </div>
    );
}
export default AgendaItem;

